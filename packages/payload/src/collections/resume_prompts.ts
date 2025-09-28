import type { CollectionConfig } from "payload";

import { Role, byRole } from "@repo/payload/utils/roles";
import {
  convertLexicalToMarkdown,
  // convertMarkdownToLexical,
  editorConfigFactory,
} from "@payloadcms/richtext-lexical";

export const resumePrompts: CollectionConfig<"resume_prompts"> = {
  slug: "resume_prompts",
  admin: {
    useAsTitle: "name",
    description:
      "Resumes Prompts are used to track the prompts of the resumes of the users and are used as input data for the AI agents.",
  },
  labels: {
    singular: "Resume Prompt",
    plural: "Resume Prompts",
  },
  fields: [
    {
      type: "text",
      name: "name",
      label: "Name",
    },
    {
      name: "systemPrompt",
      type: "textarea",
      label: "System Prompt",
    },
    {
      type: "textarea",
      name: "prompt",
      label: "Prompt",
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
