import type { CollectionConfig } from "payload";

import { Role, byRole } from "@repo/payload/utils/roles";

export const users: CollectionConfig = {
  slug: "users",
  admin: {
    useAsTitle: "email",
  },
  auth: true,
  fields: [
    {
      name: `role`,
      type: `select`,
      hasMany: false,
      defaultValue: Role.Admin,
      options: [
        {
          label: `admin`,
          value: Role.Admin,
        },
      ],
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
