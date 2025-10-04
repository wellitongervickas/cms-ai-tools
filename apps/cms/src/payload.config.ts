import { fileURLToPath } from 'url'
import path from 'path'
import { getPayloadConfig } from '@repo/payload'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default getPayloadConfig({
  serverURL: process.env.NEXT_PUBLIC_BASE_URL!,
  corsOptions: {
    domains: [''], /// does not accep any other extenal
  },
  csrfOptions: {
    domains: [''], /// does not accep any other extenal
  },
  importMapBaseDir: path.resolve(dirname),
  payloadSecret: process.env.PAYLOAD_SECRET!,
  cronSecret: process.env.CRON_SECRET!,
  databaseURI: process.env.DATABASE_URI!,
})
