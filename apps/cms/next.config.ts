import { withPayload } from '@payloadcms/next/withPayload'
import type { NextConfig } from 'next'

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
    // webpackConfig.resolve.alias.md_to_pdf = 'md-to-pdf/dist/index.js'
    webpackConfig.module.exprContextCritical = false

    return webpackConfig
  },
}

export default withPayload(nextConfig, { devBundleServerPackages: false })
