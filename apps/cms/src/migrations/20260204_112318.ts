import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum__resume_exports_v_version_status" AS ENUM('pending', 'completed', 'failed');
  CREATE TYPE "public"."enum__resume_exports_v_version_export_type" AS ENUM('plainText', 'file');
  ALTER TYPE "public"."enum_openai_general_model" ADD VALUE 'gpt-5.1' BEFORE 'gpt-4.1';
  ALTER TYPE "public"."enum_openai_general_model" ADD VALUE 'gpt-5.2' BEFORE 'gpt-4.1';
  CREATE TABLE "_resume_exports_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_owner_id" integer,
  	"version_name" varchar,
  	"version_status" "enum__resume_exports_v_version_status" DEFAULT 'pending',
  	"version_resume_setup_id" integer,
  	"version_export_type" "enum__resume_exports_v_version_export_type" DEFAULT 'plainText',
  	"version_prompt" varchar,
  	"version_system_prompt" varchar,
  	"version_plain_text_content" varchar,
  	"version_file_data_id" integer,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  ALTER TABLE "_resume_exports_v" ADD CONSTRAINT "_resume_exports_v_parent_id_resume_exports_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."resume_exports"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_resume_exports_v" ADD CONSTRAINT "_resume_exports_v_version_owner_id_users_id_fk" FOREIGN KEY ("version_owner_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_resume_exports_v" ADD CONSTRAINT "_resume_exports_v_version_resume_setup_id_resume_setups_id_fk" FOREIGN KEY ("version_resume_setup_id") REFERENCES "public"."resume_setups"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_resume_exports_v" ADD CONSTRAINT "_resume_exports_v_version_file_data_id_media_id_fk" FOREIGN KEY ("version_file_data_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "_resume_exports_v_parent_idx" ON "_resume_exports_v" USING btree ("parent_id");
  CREATE INDEX "_resume_exports_v_version_version_owner_idx" ON "_resume_exports_v" USING btree ("version_owner_id");
  CREATE INDEX "_resume_exports_v_version_version_resume_setup_idx" ON "_resume_exports_v" USING btree ("version_resume_setup_id");
  CREATE INDEX "_resume_exports_v_version_file_version_file_data_idx" ON "_resume_exports_v" USING btree ("version_file_data_id");
  CREATE INDEX "_resume_exports_v_version_version_updated_at_idx" ON "_resume_exports_v" USING btree ("version_updated_at");
  CREATE INDEX "_resume_exports_v_version_version_created_at_idx" ON "_resume_exports_v" USING btree ("version_created_at");
  CREATE INDEX "_resume_exports_v_created_at_idx" ON "_resume_exports_v" USING btree ("created_at");
  CREATE INDEX "_resume_exports_v_updated_at_idx" ON "_resume_exports_v" USING btree ("updated_at");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "_resume_exports_v" CASCADE;
  ALTER TABLE "openai" ALTER COLUMN "general_model" SET DATA TYPE text;
  ALTER TABLE "openai" ALTER COLUMN "general_model" SET DEFAULT 'gpt-5'::text;
  DROP TYPE "public"."enum_openai_general_model";
  CREATE TYPE "public"."enum_openai_general_model" AS ENUM('gpt-5', 'gpt-4.1');
  ALTER TABLE "openai" ALTER COLUMN "general_model" SET DEFAULT 'gpt-5'::"public"."enum_openai_general_model";
  ALTER TABLE "openai" ALTER COLUMN "general_model" SET DATA TYPE "public"."enum_openai_general_model" USING "general_model"::"public"."enum_openai_general_model";
  DROP TYPE "public"."enum__resume_exports_v_version_status";
  DROP TYPE "public"."enum__resume_exports_v_version_export_type";`)
}
