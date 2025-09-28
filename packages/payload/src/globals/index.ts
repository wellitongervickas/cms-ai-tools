import { Config } from "payload";
import { openAI } from "@repo/payload/globals/openai";

export const globals = (): Config["globals"] => {
  return [openAI];
};

export default globals;
