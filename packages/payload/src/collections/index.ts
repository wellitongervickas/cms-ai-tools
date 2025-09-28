import { Config } from "payload";
import { users } from "@repo/payload/collections/users";
import { media } from "@repo/payload/collections/media";
import { resumeData } from "@repo/payload/collections/resume_data";
import { resumeSkills } from "@repo/payload/collections/resume_skills";
import { resumeLanguages } from "@repo/payload/collections/resume_languages";
import { resumeTechnologies } from "@repo/payload/collections/resume_technologies";
import { resumeTools } from "@repo/payload/collections/resume_tools";
import { resumeSetups } from "@repo/payload/collections/resume_setups";
import { resumePrompts } from "@repo/payload/collections/resume_prompts";
import { resumeImports } from "@repo/payload/collections/resume_imports";
import { resumeExports } from "@repo/payload/collections/resume_exports";

export const collections = (): Config["collections"] => {
  return [
    users,
    media,
    resumeData,
    resumeSkills,
    resumeLanguages,
    resumeTechnologies,
    resumeTools,
    resumeSetups,
    resumePrompts,
    resumeImports,
    resumeExports,
  ];
};

export default collections;
