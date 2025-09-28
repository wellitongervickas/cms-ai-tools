import { Config } from "payload";

export type CorsOptions = {
  domains?: Config["cors"];
};
export const cors = (cors?: CorsOptions): Config["cors"] => {
  return cors?.domains || "*";
};

export default cors;
