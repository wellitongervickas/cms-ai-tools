import type { CollectionConfig } from "payload";

import { Role, byRole } from "@repo/payload/utils/roles";

export const resumeLanguages: CollectionConfig<"resume_languages"> = {
  slug: "resume_languages",
  admin: {
    useAsTitle: "language",
    description:
      "Resumes Languages are used to track the languages of the resumes of the users and are used as input data for the AI agents.",
  },
  labels: {
    singular: "Resume Language",
    plural: "Resume Languages",
  },
  fields: [
    {
      type: "text",
      name: "language",
      label: "Language",
    },
    {
      type: "text",
      name: "code",
      label: "Code",
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
