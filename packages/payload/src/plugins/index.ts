import { Plugin } from "payload";
import { media } from "@repo/payload/collections/media";
// import { payloadCloudPlugin } from "@payloadcms/payload-cloud";
import { vercelBlobStorage } from "@payloadcms/storage-vercel-blob";

export type PluginsOptions = {
  plugins?: Plugin[];
};

export const plugins = (options?: PluginsOptions): Plugin[] => {
  return [
    vercelBlobStorage({
      enabled: true, // Optional, defaults to true
      // dev: Specify which collections should use Vercel Blob
      collections: {
        [media.slug]: true,
      },
      // dev:Token provided by Vercel once Blob storage is added to your Vercel project
      token: process.env.BLOB_READ_WRITE_TOKEN!,
      cacheControlMaxAge: 31536000,
    }),
    ...(options?.plugins || []),
  ];
};

export default plugins;
