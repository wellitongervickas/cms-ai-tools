import { Config } from "payload";
import { postgresAdapter } from "@payloadcms/db-postgres";

export type DBConfig = {
  pool: {
    connectionString: string;
  };
};

export const db = (options: DBConfig): Config["db"] => {
  return postgresAdapter({
    /// @dev: allow when you need to sync database schemas if migrations are not working
    push: true,
    pool: {
      connectionString: options.pool.connectionString,
    },
  });
};

export default db;
