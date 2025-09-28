import type { CollectionConfig } from "payload";

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
      name: "resume_setup",
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
  ],
  hooks: {
    afterChange: [
      async ({ data, operation, req }) => {
        if (operation !== "create") return;

        try {
          const resumeSetup = await req.payload.findByID({
            collection: "resume_setups",
            id: data.resume_setup,
          });

          if (!resumeSetup.resumeData) {
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
            "if",
            function (
              this: unknown,
              condition: boolean,
              options: Handlebars.HelperOptions
            ) {
              return condition ? options.fn(this) : options.inverse(this);
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

          if (data.exportFormat === ResumeExportType.PLAIN_TEXT) {
            if (resumeSetup.exportFormat === ResumeExportFormat.MARKDOWN) {
              const { text: generatedMarkdown } = await generateText({
                model: openai(globalOpenAI.general.model),
                prompt: renderedPrompt,
                system: renderedSystemPrompt,
              });

              await req.payload.update({
                collection: "resume_exports",
                id: data.id,
                data: {
                  status: ResumeExportStatus.COMPLETED,
                  plainText: {
                    content: generatedMarkdown,
                  },
                },
              });
            } else {
              throw new Error("Export format not supported");
            }
          } else {
            throw new Error("Export format not supported");
          }
        } catch (error) {
          req.payload.logger.error(error);
          await req.payload.update({
            collection: "resume_exports",
            id: data.id,
            data: {
              status: ResumeExportStatus.FAILED,
            },
          });
        }
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
