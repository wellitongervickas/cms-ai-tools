import type { CollectionConfig } from "payload";

import { Role, byRole } from "@repo/payload/utils/roles";
import { getResumeSkillCategoryOptions } from "@repo/payload/utils/resumes";
export const resumeSkills: CollectionConfig<"resume_skills"> = {
  slug: "resume_skills",
  admin: {
    useAsTitle: "skill",
    description:
      "Resumes Skills are used to track the skills of the resumes of the users and are used as input data for the AI agents.",
  },
  labels: {
    singular: "Resume Skill",
    plural: "Resume Skills",
  },
  fields: [
    {
      type: "text",
      name: "skill",
      label: "Skill",
    },
    {
      type: "select",
      name: "category",
      label: "Category",
      options: getResumeSkillCategoryOptions(),
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
