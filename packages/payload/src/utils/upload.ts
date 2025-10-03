import type { ImageSize, UploadConfig } from "payload";

export const formatOptions = (): UploadConfig["formatOptions"] => {
  return {
    format: "webp",
    options: {
      quality: 85,
    },
  };
};

export const mimeTypes = (): UploadConfig["mimeTypes"] => {
  /**
   * allow all images types
   * allow pdf types
   */
  return ["image/*", "application/pdf"];
};

export const imageSizes = (): UploadConfig["imageSizes"] => {
  const icon: ImageSize = {
    name: `icon`,
    width: 50,
    formatOptions: {
      format: "webp",
      options: {
        quality: 100,
      },
    },
  };

  const thumbnail: ImageSize = {
    name: `thumbnail`,
    width: 100,
    formatOptions: {
      format: "webp",
      options: {
        quality: 100,
      },
    },
  };

  const small: ImageSize = {
    name: `small`,
    width: 185,
    formatOptions: {
      format: "webp",
      options: {
        quality: 100,
      },
    },
  };

  const medium: ImageSize = {
    name: `medium`,
    width: 800,
    formatOptions: {
      format: "webp",
      options: {
        quality: 90,
      },
    },
  };

  const large: ImageSize = {
    name: `large`,
    width: 1920,
    formatOptions: {
      format: "webp",
      options: {
        quality: 85,
      },
    },
  };

  return [icon, thumbnail, small, medium, large];
};

export const image = (): UploadConfig => {
  return {
    formatOptions: formatOptions(),
    mimeTypes: mimeTypes(),
    imageSizes: imageSizes(),
  };
};
