import type { CollectionConfig } from "payload";

import { Role, byRole } from "@repo/payload/utils/roles";
import { getResumeToolCategoryOptions } from "@repo/payload/utils/resumes";
export const resumeTools: CollectionConfig<"resume_tools"> = {
  slug: "resume_tools",
  admin: {
    description:
      "Resumes Tools are used to track the tools of the resumes of the users and are used as input data for the AI agents.",
  },
  labels: {
    singular: "Resume Tool",
    plural: "Resume Tools",
  },
  fields: [
    {
      type: "text",
      name: "tool",
      label: "Tool",
    },
    {
      type: "select",
      name: "category",
      label: "Category",
      options: getResumeToolCategoryOptions(),
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
