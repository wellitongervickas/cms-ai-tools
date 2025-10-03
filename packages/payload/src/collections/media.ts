import type { CollectionConfig } from "payload";
import { byRole, Role } from "@repo/payload/utils/roles";
import { mimeTypes, formatOptions, imageSizes } from "../utils/upload.js";

export const media: CollectionConfig = {
  slug: "media",

  upload: {
    formatOptions: formatOptions(),
    mimeTypes: mimeTypes(),
    imageSizes: imageSizes(),
  },
  fields: [
    {
      name: "alt",
      type: "text",
      required: true,
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
