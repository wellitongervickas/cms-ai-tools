import type { CollectionConfig } from "payload";

import { Role, byRole } from "@repo/payload/utils/roles";
import { ownerField } from "@repo/payload/collections/fields/owner";
import { getResumeImportTypeOptions } from "@repo/payload/utils/resumes";
import { ResumeImportType } from "@repo/payload/utils/resumes";

export const resumeImports: CollectionConfig<"resume_imports"> = {
  slug: "resume_imports",
  admin: {
    useAsTitle: "name",
    description:
      "Resumes Imports are used to track the imports of the resumes of the users and are used as input data for the AI agents.",
  },
  labels: {
    singular: "Resume Import",
    plural: "Resume Imports",
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
      name: "importType",
      label: "Import Type",
      defaultValue: ResumeImportType.PLAIN_TEXT,
      options: getResumeImportTypeOptions(),
    },
    {
      type: "group",
      name: "plainText",
      fields: [
        {
          type: "richText",
          name: "content",
          label: "Content",
        },
      ],
      admin: {
        condition: (_, siblingData) => {
          return siblingData?.importType === ResumeImportType.PLAIN_TEXT;
        },
      },
    },

    {
      type: "relationship",
      name: "resumeData",
      relationTo: "resume_data",
      hasMany: false,
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
