import { Plugin } from "payload";

import { payloadCloudPlugin } from "@payloadcms/payload-cloud";

export type PluginsOptions = {
  plugins?: Plugin[];
};

export const plugins = (options?: PluginsOptions): Plugin[] => {
  return [payloadCloudPlugin(), ...(options?.plugins || [])];
};

export default plugins;
