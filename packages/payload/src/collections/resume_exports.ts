import type { CollectionConfig } from "payload";

import { Role, byRole } from "@repo/payload/utils/roles";

import {
  ResumeExportStatus,
  getResumeExportTypeOptions,
  getResumeExportStatusOptions,
  ResumeExportType,
} from "@repo/payload/utils/resumes";

import { ownerField } from "@repo/payload/collections/fields/owner";

import { generateText } from "ai";
import { openai } from "@ai-sdk/openai";
import Handlebars from "handlebars";
import kebabCase from "lodash/kebabCase.js";
import { markdownToPDF } from "@repo/payload/utils/files";

export const resumeExports: CollectionConfig<"resume_exports"> = {
  slug: "resume_exports",
  versions: {
    drafts: false
  },
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
              this: unknown,
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

          const { text: generatedMarkdown } = await generateText({
            model: openai(globalOpenAI.general.model),
            prompt: renderedPrompt,
            system: renderedSystemPrompt,
          });

          if (data.exportType === ResumeExportType.PLAIN_TEXT) {
            return {
              ...data,
              status: ResumeExportStatus.COMPLETED,
              prompt: renderedPrompt,
              systemPrompt: renderedSystemPrompt,
              plainText: {
                content: generatedMarkdown,
              },
            };
          } else if (data.exportType === ResumeExportType.FILE) {
            const generatedPdfBuffer = await markdownToPDF(generatedMarkdown);

            const uploadedFile = await req.payload.create({
              file: {
                data: generatedPdfBuffer,
                mimetype: "application/pdf",
                size: Buffer.byteLength(generatedPdfBuffer), // safe for Node 18+
                name: kebabCase(resumeData.name + crypto.randomUUID()),
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
