import type { CollectionConfig } from "payload";

import { Role, byRole } from "@repo/payload/utils/roles";
import {
  getResumeExportFormatOptions,
  getResumeOptmizedForOptions,
  ResumeExportFormat,
} from "@repo/payload/utils/resumes";
import { ownerField } from "@repo/payload/collections/fields/owner";

export const resumeSetups: CollectionConfig<"resume_setups"> = {
  slug: "resume_setups",
  admin: {
    useAsTitle: "name",
    description:
      "Resumes Setups are used to track the setups of the resumes of the users and are used as input data for the AI agents.",
  },
  labels: {
    singular: "Resume Setup",
    plural: "Resume Setups",
  },
  fields: [
    ownerField,
    {
      type: "text",
      name: "name",
      label: "Name",
    },
    {
      type: "text",
      name: "description",
      label: "Description",
    },
    {
      type: "relationship",
      name: "resumeData",
      label: "Resume Data",
      relationTo: "resume_data",
      hasMany: false,
    },
    {
      type: "relationship",
      relationTo: "resume_prompts",
      label: "Resume Prompt",
      name: "resumePrompt",
    },
    {
      type: "select",
      name: "exportFormat",
      label: "Export Format",
      defaultValue: ResumeExportFormat.MARKDOWN,
      options: getResumeExportFormatOptions(),
    },
    {
      type: "text",
      name: "targetCountry",
      label: "Target Country",
    },
    {
      type: "text",
      name: "targetLanguage",
      label: "Target Language",
    },
    {
      type: "text",
      name: "targetJobTitle",
      label: "Target Job Title",
    },
    {
      type: "textarea",
      name: "targetPosition",
      label: "Target Position",
    },
    {
      type: "group",
      name: "options",
      fields: [
        {
          type: "select",
          name: "optmizedFor",
          label: "Optmized for ATS",
          options: getResumeOptmizedForOptions(),
        },
      ],
    },
    {
      type: "join",
      name: "exports",
      on: "resumeSetup",
      collection: "resume_exports",
      hasMany: true,
    },
  ],

  access: {
    read: byRole([Role.Admin]),
    update: byRole([Role.Admin]),
    create: byRole([Role.Admin]),
    delete: byRole([Role.Admin]),
    admin: byRole([Role.Admin]),
  },
};
