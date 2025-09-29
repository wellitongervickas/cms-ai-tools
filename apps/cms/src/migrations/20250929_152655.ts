import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "resume_exports" ADD COLUMN "plain_text_prompt" varchar;
  ALTER TABLE "resume_exports" ADD COLUMN "plain_text_system_prompt" varchar;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "resume_exports" DROP COLUMN "plain_text_prompt";
  ALTER TABLE "resume_exports" DROP COLUMN "plain_text_system_prompt";`)
}
