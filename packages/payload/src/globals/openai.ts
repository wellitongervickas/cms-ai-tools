import { GlobalConfig } from "payload";
import { Role, byRole } from "@repo/payload/utils/roles";
import { OpenAIModel, getOpenAIModelOptions } from "@repo/payload/utils/openai";

export const openAI: GlobalConfig = {
  slug: "openai",
  fields: [
    {
      type: "tabs",
      label: "Settings",
      tabs: [
        {
          name: "general",
          label: "General",
          fields: [
            {
              type: "select",
              name: "model",
              label: "Model",
              required: true,
              defaultValue: OpenAIModel.GPT_5,
              options: getOpenAIModelOptions(),
            },
          ],
        },
      ],
    },
  ],
  access: {
    read: byRole([Role.Admin]),
    update: byRole([Role.Admin]),
  },
};
