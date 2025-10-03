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

    /**
     * it fixes:
     * "errno": -4058,
      "code": "ENOENT",
      "syscall": "open",
      "path": "F:\\projects\\bioby\\apps\\node_modules\\.pnpm\\highlight.js@11.11.1\\node_modules\\highlight.js\\styles\\github.css"
      in order to work with monorepo, and fix trying to get from /apps/ we need to override the alias to thatcss
     */

    // --- NEW: alias highlight.js stylesheet specifier to resolved file
    // webpackConfig.resolve.alias = webpackConfig.resolve.alias || {}
    // webpackConfig.resolve.alias['highlight.js/styles/github.min.css'] = 'highlight.js/styles/github.min.css'

    // try {
    //   const cssPath = require.resolve('highlight.js/styles/github.css')
    //   webpackConfig.resolve.alias['highlight.js/styles/github.css'] = cssPath
    //   webpackConfig.resolve.alias['highlight.js/styles/github.min.css'] = cssPath
    // } catch (_) {
    //   try {
    //     const cssPath = require.resolve('highlight.js/styles/github.min.css')
    //     webpackConfig.resolve.alias['highlight.js/styles/github.css'] = cssPath
    //     webpackConfig.resolve.alias['highlight.js/styles/github.min.css'] = cssPath
    //   } catch (_) {
    //     // fallback: nothing to alias — it's ok, we'll handle at runtime
    //   }
    // }

    // webpackConfiwg.module.exprContextCritical = false

    webpackConfig.resolve.alias.handlebars = 'handlebars/dist/handlebars.js'
    // webpackConfig.resolve.alias.md_to_pdf = 'md-to-pdf/dist/index.js'

    return webpackConfig
  },
}

export default withPayload(nextConfig, { devBundleServerPackages: false })
