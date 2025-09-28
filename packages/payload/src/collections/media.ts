import type { CollectionConfig } from "payload";
import { noOne } from "@repo/payload/utils/roles";

export const media: CollectionConfig = {
  slug: "media",
  admin: {
    hidden: true,
  },
  fields: [
    {
      name: "alt",
      type: "text",
      required: true,
    },
  ],
  access: {
    read: noOne,
    update: noOne,
    create: noOne,
    delete: noOne,
    admin: noOne,
  },
  upload: true,
};
