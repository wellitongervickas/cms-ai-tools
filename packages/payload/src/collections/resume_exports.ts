/* eslint-disable @typescript-eslint/no-explicit-any */
import type { CollectionConfig } from "payload";
import { mdToPdf } from "md-to-pdf";
import path from "path";

import { Role, byRole } from "@repo/payload/utils/roles";

import {
  ResumeExportStatus,
  getResumeExportTypeOptions,
  getResumeExportStatusOptions,
  ResumeExportType,
  ResumeExportFormat,
} from "@repo/payload/utils/resumes";

import { ownerField } from "@repo/payload/collections/fields/owner";

import { generateText } from "ai";
import { openai } from "@ai-sdk/openai";
import Handlebars from "handlebars";
import kebabCase from "lodash/kebabCase.js";

// import path from "path";
// import { fileURLToPath } from "url";

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);
/// the file is in the current folder and called resume_exports.css
// const cssPath = path.join(__dirname, "resume_exports.css");

export const resumeExports: CollectionConfig<"resume_exports"> = {
  slug: "resume_exports",
  admin: {
    useAsTitle: "name",
    description:
      "Resumes Exports are used to track the exports of the resumes of the users and are used as input data for the AI agents.",
  },
  labels: {
    singular: "Resume Export",
    plural: "Resume Exports",
  },
  fields: [
    ownerField,
    {
      type: "text",
      name: "name",
      label: "Name",
    },
    {
      type: "select",
      name: "status",
      label: "Status",
      defaultValue: ResumeExportStatus.PENDING,
      options: getResumeExportStatusOptions(),
      admin: {
        readOnly: true,
      },
    },
    {
      type: "relationship",
      name: "resumeSetup",
      label: "Resume Setup",
      relationTo: "resume_setups",
      hasMany: false,
    },
    {
      type: "select",
      name: "exportType",
      label: "Export Type",
      defaultValue: ResumeExportType.PLAIN_TEXT,
      options: getResumeExportTypeOptions(),
    },
    {
      type: "textarea",
      name: "prompt",
      label: "Prompt",
      admin: {
        readOnly: true,
      },
    },
    {
      type: "textarea",
      name: "systemPrompt",
      label: "System Prompt",
      admin: {
        readOnly: true,
      },
    },
    {
      type: "group",
      name: "plainText",
      fields: [
        {
          type: "textarea",
          name: "content",
          label: "Content",
          admin: {
            readOnly: true,
          },
        },
      ],
      admin: {
        condition: (_, siblingData) => {
          return siblingData?.exportType === ResumeExportType.PLAIN_TEXT;
        },
      },
    },
    {
      type: "group",
      name: "file",
      label: "File",
      fields: [
        {
          type: "relationship",
          name: "data",
          relationTo: "media",
          hasMany: false,
        },
      ],
      admin: {
        condition: (_, siblingData) => {
          return siblingData?.exportType === ResumeExportType.FILE;
        },
      },
    },
  ],
  hooks: {
    beforeChange: [
      async ({ req, context, data }) => {
        if (context.skipGeneration === true) {
          return data;
        }
        if (data?.status === ResumeExportStatus.COMPLETED) {
          return data;
        }
        if (data?.status === ResumeExportStatus.FAILED) {
          return data;
        }

        try {
          const resumeSetup = await req.payload.findByID({
            collection: "resume_setups",
            id:
              typeof data.resumeSetup === "number"
                ? data.resumeSetup
                : data.resumeSetup.id,
          });

          if (!resumeSetup?.resumeData) {
            throw new Error("Resume data not found");
          }

          const resumeData = await req.payload.findByID({
            collection: "resume_data",
            id:
              typeof resumeSetup.resumeData === "number"
                ? resumeSetup.resumeData
                : resumeSetup.resumeData.id,
          });

          if (!resumeSetup.resumePrompt) {
            throw new Error("Resume prompt not found");
          }

          const prompt = await req.payload.findByID({
            collection: "resume_prompts",
            id:
              typeof resumeSetup.resumePrompt === "number"
                ? resumeSetup.resumePrompt
                : resumeSetup.resumePrompt.id,
          });

          if (!prompt.prompt) {
            throw new Error("Prompt not found");
          }

          const globalOpenAI = await req.payload.findGlobal({
            slug: "openai",
          });

          Handlebars.registerHelper(
            "ifEquals",
            function (
              this: any,
              a: unknown,
              b: unknown,
              options: Handlebars.HelperOptions
            ) {
              if (!options || typeof options.fn !== "function") {
                throw new Error(
                  "ifEquals helper must be used as a block helper: {{#ifEquals a b}} ... {{/ifEquals}}"
                );
              }
              return a === b ? options.fn(this) : options.inverse(this);
            }
          );

          const renderedPrompt = Handlebars.compile(prompt.prompt)({
            resume: resumeData,
            setup: resumeSetup,
          });

          const renderedSystemPrompt = Handlebars.compile(
            prompt.systemPrompt ?? ""
          )({
            resume: resumeData,
            setup: resumeSetup,
          });

          if (data.exportType === ResumeExportType.PLAIN_TEXT) {
            if (resumeSetup.exportFormat === ResumeExportFormat.MARKDOWN) {
              const { text: generatedMarkdown } = await generateText({
                model: openai(globalOpenAI.general.model),
                prompt: renderedPrompt,
                system: renderedSystemPrompt,
              });

              return {
                ...data,
                status: ResumeExportStatus.COMPLETED,
                prompt: renderedPrompt,
                systemPrompt: renderedSystemPrompt,
                plainText: {
                  content: generatedMarkdown,
                },
              };
            } else {
              throw new Error("Export format not supported");
            }
          } else if (data.exportType === ResumeExportType.FILE) {
            if (resumeSetup.exportFormat === ResumeExportFormat.PDF) {
              const { content: generatedPdfBuffer } = await mdToPdf(
                {
                  content: renderedPrompt,
                },
                {
                  stylesheet: [
                    path.resolve("node_modules/highlight.js/styles/github.css"),
                  ],
                  body_class: ["markdown-body"],
                  document_title: resumeData.name || "resume",
                  css: `
                    @page {
                      size: A4;
                      margin: 20mm;
                    }

                    .page-break { page-break-after: always; }
                    .markdown-body { font-size: 11px; }
                    .markdown-body pre > code { white-space: pre-wrap; }
                  `,
                  pdf_options: {
                    format: "A4",
                  },
                }
              );

              // const imageBuffer = Buffer.from(generatedPdfBuffer);

              const uploadedFile = await req.payload.create({
                file: {
                  data: generatedPdfBuffer,
                  mimetype: "application/pdf",
                  size: generatedPdfBuffer.BYTES_PER_ELEMENT,
                  name: kebabCase(resumeData.name || "image"),
                },
                data: {
                  alt: resumeData.name || "image",
                },
                collection: "media",
              });

              return {
                ...data,
                status: ResumeExportStatus.COMPLETED,
                prompt: renderedPrompt,
                systemPrompt: renderedSystemPrompt,
                file: {
                  data: uploadedFile.id,
                },
              };
            } else {
              throw new Error("Export format not supported");
            }
          } else {
            throw new Error("Export type not supported");
          }
        } catch (error) {
          req.payload.logger.error(error);
          data.status = ResumeExportStatus.FAILED;
        }

        return data;
      },
    ],
  },
  access: {
    read: byRole([Role.Admin]),
    update: byRole([Role.Admin]),
    create: byRole([Role.Admin]),
    delete: byRole([Role.Admin]),
    admin: byRole([Role.Admin]),
  },
};
