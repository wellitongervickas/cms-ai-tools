import { Config } from "payload";

export type CSRFOptions = {
  domains?: Config["csrf"];
};

export const csrf = (options?: CSRFOptions): Config["csrf"] => {
  return options?.domains || [];
};

export default csrf;
