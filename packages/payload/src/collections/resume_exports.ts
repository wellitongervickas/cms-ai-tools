import type { CollectionConfig } from "payload";

import { Role, byRole } from "@repo/payload/utils/roles";
import {
  ResumeExportStatus,
  getResumeExportTypeOptions,
  getResumeExportStatusOptions,
  ResumeExportType,
} from "@repo/payload/utils/resumes";
import { ownerField } from "@repo/payload/collections/fields/owner";

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
      options: getResumeExportTypeOptions(),
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
          return siblingData?.exportType === ResumeExportType.PLAIN_TEXT;
        },
      },
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
