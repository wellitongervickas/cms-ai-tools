import { Config } from "payload";

import { users } from "./collections/users.js";

export type AdminOptions = {
  importMap: {
    baseDir: string;
  };
};

export const admin = (options: AdminOptions): Config["admin"] => {
  return {
    user: users.slug,
    importMap: {
      baseDir: options.importMap.baseDir,
    },
  };
};

export default admin;
