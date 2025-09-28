import type { CollectionConfig } from "payload";

import { Role, byRole } from "@repo/payload/utils/roles";
import { getResumeTechnologyTypeOptions } from "@repo/payload/utils/resumes";
export const resumeTechnologies: CollectionConfig<"resume_technologies"> = {
  slug: "resume_technologies",
  admin: {
    useAsTitle: "technology",
    description:
      "Resumes Technologies are used to track the technologies of the resumes of the users and are used as input data for the AI agents.",
  },
  labels: {
    singular: "Resume Technology",
    plural: "Resume Technologies",
  },
  fields: [
    {
      type: "text",
      name: "technology",
      label: "Technology",
    },
    {
      type: "select",
      name: "type",
      label: "Type",
      options: getResumeTechnologyTypeOptions(),
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
