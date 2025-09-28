import { Config } from "payload";
import { AVAILABLE_LANGUAGES } from "./i18n.js";

export type LocalizationOptions = {
  locales: Array<keyof typeof AVAILABLE_LANGUAGES>;
  defaultLocale: keyof typeof AVAILABLE_LANGUAGES;
};

export const localization = (
  options: LocalizationOptions,
): Config["localization"] => {
  return {
    ...options,
    fallback: true,
  };
};

export default localization;
