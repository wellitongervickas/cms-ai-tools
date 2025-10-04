import { withPayload } from '@payloadcms/next/withPayload'
import type { NextConfig } from 'next'
import { config } from 'node:process'

const nextConfig: NextConfig = {
  trailingSlash: true,

  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  webpack: (webpackConfig) => {
    webpackConfig.resolve.extensionAlias = {
      '.cjs': ['.cts', '.cjs'],
      '.js': ['.ts', '.tsx', '.js', '.jsx'],
      '.mjs': ['.mts', '.mjs'],
    }

    webpackConfig.resolve.alias.handlebars = 'handlebars/dist/handlebars.js'

    webpackConfig.ignoreWarnings = [
      {
        module: /import-fresh/,
        message: /Critical dependency: the request of a dependency is an expression/,
      },
    ]

    return webpackConfig
  },
}

export default withPayload(nextConfig, { devBundleServerPackages: false })
