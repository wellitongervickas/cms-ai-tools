import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."_locales" AS ENUM('en');
  CREATE TYPE "public"."enum_users_role" AS ENUM('admin');
  CREATE TYPE "public"."enum_resume_data_profile_contacts_type" AS ENUM('text', 'email', 'phone', 'link');
  CREATE TYPE "public"."enum_resume_data_experiences_type" AS ENUM('fullTime', 'partTime', 'freelance', 'contract', 'internship');
  CREATE TYPE "public"."enum_resume_data_languages_level" AS ENUM('beginner', 'intermediate', 'advanced', 'native');
  CREATE TYPE "public"."enum_resume_skills_category" AS ENUM('programming', 'design', 'marketing', 'sales', 'business', 'finance', 'education', 'other');
  CREATE TYPE "public"."enum_resume_technologies_type" AS ENUM('framework', 'language', 'library', 'protocol', 'platform', 'database', 'cloud', 'devops', 'testing', 'security', 'ai', 'machine_learning', 'data_science', 'big_data', 'blockchain', 'internet_of_things', 'robotics', 'other');
  CREATE TYPE "public"."enum_resume_tools_category" AS ENUM('financial', 'marketing', 'sales', 'business', 'finance', 'education', 'other');
  CREATE TYPE "public"."enum_resume_setups_export_format" AS ENUM('markdown');
  CREATE TYPE "public"."enum_resume_setups_options_optmized_for" AS ENUM('ats', 'hr', 'both');
  CREATE TYPE "public"."enum_resume_imports_import_type" AS ENUM('plainText');
  CREATE TYPE "public"."enum_resume_exports_status" AS ENUM('pending', 'completed', 'failed');
  CREATE TYPE "public"."enum_resume_exports_export_type" AS ENUM('plainText');
  CREATE TYPE "public"."enum_openai_general_model" AS ENUM('gpt-5', 'gpt-4.1');
  CREATE TABLE "users_sessions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"created_at" timestamp(3) with time zone,
  	"expires_at" timestamp(3) with time zone NOT NULL
  );
  
  CREATE TABLE "users" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"role" "enum_users_role" DEFAULT 'admin',
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"email" varchar NOT NULL,
  	"reset_password_token" varchar,
  	"reset_password_expiration" timestamp(3) with time zone,
  	"salt" varchar,
  	"hash" varchar,
  	"login_attempts" numeric DEFAULT 0,
  	"lock_until" timestamp(3) with time zone
  );
  
  CREATE TABLE "media" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"alt" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"url" varchar,
  	"thumbnail_u_r_l" varchar,
  	"filename" varchar,
  	"mime_type" varchar,
  	"filesize" numeric,
  	"width" numeric,
  	"height" numeric,
  	"focal_x" numeric,
  	"focal_y" numeric
  );
  
  CREATE TABLE "resume_data_profile_contacts" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"type" "enum_resume_data_profile_contacts_type",
  	"value" varchar,
  	"label" varchar
  );
  
  CREATE TABLE "resume_data_experiences_custom_blocks_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"item" varchar
  );
  
  CREATE TABLE "resume_data_experiences_custom_blocks" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_title" varchar
  );
  
  CREATE TABLE "resume_data_experiences" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"job_title" varchar,
  	"type" "enum_resume_data_experiences_type",
  	"company" varchar,
  	"location" varchar,
  	"start_date" timestamp(3) with time zone,
  	"end_date" timestamp(3) with time zone,
  	"description" varchar
  );
  
  CREATE TABLE "resume_data_education_custom_blocks_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"item" varchar
  );
  
  CREATE TABLE "resume_data_education_custom_blocks" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_title" varchar
  );
  
  CREATE TABLE "resume_data_education" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"institution" varchar,
  	"degree" varchar,
  	"field_of_study" varchar,
  	"location" varchar,
  	"start_date" timestamp(3) with time zone,
  	"end_date" timestamp(3) with time zone,
  	"description" varchar
  );
  
  CREATE TABLE "resume_data_projects_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link" varchar,
  	"label" varchar
  );
  
  CREATE TABLE "resume_data_projects_custom_blocks_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"item" varchar
  );
  
  CREATE TABLE "resume_data_projects_custom_blocks" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_title" varchar
  );
  
  CREATE TABLE "resume_data_projects" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"project" varchar,
  	"role" varchar,
  	"description" varchar
  );
  
  CREATE TABLE "resume_data_languages" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"language_id" integer,
  	"level" "enum_resume_data_languages_level"
  );
  
  CREATE TABLE "resume_data" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"owner_id" integer,
  	"name" varchar,
  	"profile_avatar_id" integer,
  	"profile_suffix" varchar,
  	"profile_first_name" varchar,
  	"profile_middle_name" varchar,
  	"profile_last_name" varchar,
  	"profile_headline" varchar,
  	"profile_summary" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "resume_data_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"resume_skills_id" integer,
  	"resume_tools_id" integer,
  	"resume_technologies_id" integer
  );
  
  CREATE TABLE "resume_skills" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"skill" varchar,
  	"category" "enum_resume_skills_category",
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "resume_languages" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"language" varchar,
  	"code" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "resume_technologies" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"technology" varchar,
  	"type" "enum_resume_technologies_type",
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "resume_tools" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"tool" varchar,
  	"category" "enum_resume_tools_category",
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "resume_setups" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"owner_id" integer,
  	"name" varchar,
  	"description" varchar,
  	"resume_data_id" integer,
  	"resume_prompt_id" integer,
  	"export_format" "enum_resume_setups_export_format" DEFAULT 'markdown',
  	"target_country" varchar,
  	"target_language" varchar,
  	"target_job_title" varchar,
  	"target_position" varchar,
  	"options_optmized_for" "enum_resume_setups_options_optmized_for",
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "resume_prompts" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"system_prompt" varchar,
  	"prompt" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "resume_imports" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"owner_id" integer,
  	"name" varchar,
  	"import_type" "enum_resume_imports_import_type" DEFAULT 'plainText',
  	"plain_text_content" jsonb,
  	"resume_data_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "resume_exports" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"owner_id" integer,
  	"name" varchar,
  	"status" "enum_resume_exports_status" DEFAULT 'pending',
  	"resume_setup_id" integer,
  	"export_type" "enum_resume_exports_export_type" DEFAULT 'plainText',
  	"plain_text_content" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"global_slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer,
  	"media_id" integer,
  	"resume_data_id" integer,
  	"resume_skills_id" integer,
  	"resume_languages_id" integer,
  	"resume_technologies_id" integer,
  	"resume_tools_id" integer,
  	"resume_setups_id" integer,
  	"resume_prompts_id" integer,
  	"resume_imports_id" integer,
  	"resume_exports_id" integer
  );
  
  CREATE TABLE "payload_preferences" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar,
  	"value" jsonb,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_preferences_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer
  );
  
  CREATE TABLE "payload_migrations" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"batch" numeric,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "openai" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"general_model" "enum_openai_general_model" DEFAULT 'gpt-5' NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  ALTER TABLE "users_sessions" ADD CONSTRAINT "users_sessions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "resume_data_profile_contacts" ADD CONSTRAINT "resume_data_profile_contacts_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."resume_data"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "resume_data_experiences_custom_blocks_items" ADD CONSTRAINT "resume_data_experiences_custom_blocks_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."resume_data_experiences_custom_blocks"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "resume_data_experiences_custom_blocks" ADD CONSTRAINT "resume_data_experiences_custom_blocks_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."resume_data_experiences"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "resume_data_experiences" ADD CONSTRAINT "resume_data_experiences_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."resume_data"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "resume_data_education_custom_blocks_items" ADD CONSTRAINT "resume_data_education_custom_blocks_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."resume_data_education_custom_blocks"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "resume_data_education_custom_blocks" ADD CONSTRAINT "resume_data_education_custom_blocks_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."resume_data_education"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "resume_data_education" ADD CONSTRAINT "resume_data_education_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."resume_data"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "resume_data_projects_links" ADD CONSTRAINT "resume_data_projects_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."resume_data_projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "resume_data_projects_custom_blocks_items" ADD CONSTRAINT "resume_data_projects_custom_blocks_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."resume_data_projects_custom_blocks"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "resume_data_projects_custom_blocks" ADD CONSTRAINT "resume_data_projects_custom_blocks_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."resume_data_projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "resume_data_projects" ADD CONSTRAINT "resume_data_projects_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."resume_data"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "resume_data_languages" ADD CONSTRAINT "resume_data_languages_language_id_resume_languages_id_fk" FOREIGN KEY ("language_id") REFERENCES "public"."resume_languages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "resume_data_languages" ADD CONSTRAINT "resume_data_languages_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."resume_data"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "resume_data" ADD CONSTRAINT "resume_data_owner_id_users_id_fk" FOREIGN KEY ("owner_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "resume_data" ADD CONSTRAINT "resume_data_profile_avatar_id_media_id_fk" FOREIGN KEY ("profile_avatar_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "resume_data_rels" ADD CONSTRAINT "resume_data_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."resume_data"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "resume_data_rels" ADD CONSTRAINT "resume_data_rels_resume_skills_fk" FOREIGN KEY ("resume_skills_id") REFERENCES "public"."resume_skills"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "resume_data_rels" ADD CONSTRAINT "resume_data_rels_resume_tools_fk" FOREIGN KEY ("resume_tools_id") REFERENCES "public"."resume_tools"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "resume_data_rels" ADD CONSTRAINT "resume_data_rels_resume_technologies_fk" FOREIGN KEY ("resume_technologies_id") REFERENCES "public"."resume_technologies"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "resume_setups" ADD CONSTRAINT "resume_setups_owner_id_users_id_fk" FOREIGN KEY ("owner_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "resume_setups" ADD CONSTRAINT "resume_setups_resume_data_id_resume_data_id_fk" FOREIGN KEY ("resume_data_id") REFERENCES "public"."resume_data"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "resume_setups" ADD CONSTRAINT "resume_setups_resume_prompt_id_resume_prompts_id_fk" FOREIGN KEY ("resume_prompt_id") REFERENCES "public"."resume_prompts"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "resume_imports" ADD CONSTRAINT "resume_imports_owner_id_users_id_fk" FOREIGN KEY ("owner_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "resume_imports" ADD CONSTRAINT "resume_imports_resume_data_id_resume_data_id_fk" FOREIGN KEY ("resume_data_id") REFERENCES "public"."resume_data"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "resume_exports" ADD CONSTRAINT "resume_exports_owner_id_users_id_fk" FOREIGN KEY ("owner_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "resume_exports" ADD CONSTRAINT "resume_exports_resume_setup_id_resume_setups_id_fk" FOREIGN KEY ("resume_setup_id") REFERENCES "public"."resume_setups"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_locked_documents"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_resume_data_fk" FOREIGN KEY ("resume_data_id") REFERENCES "public"."resume_data"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_resume_skills_fk" FOREIGN KEY ("resume_skills_id") REFERENCES "public"."resume_skills"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_resume_languages_fk" FOREIGN KEY ("resume_languages_id") REFERENCES "public"."resume_languages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_resume_technologies_fk" FOREIGN KEY ("resume_technologies_id") REFERENCES "public"."resume_technologies"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_resume_tools_fk" FOREIGN KEY ("resume_tools_id") REFERENCES "public"."resume_tools"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_resume_setups_fk" FOREIGN KEY ("resume_setups_id") REFERENCES "public"."resume_setups"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_resume_prompts_fk" FOREIGN KEY ("resume_prompts_id") REFERENCES "public"."resume_prompts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_resume_imports_fk" FOREIGN KEY ("resume_imports_id") REFERENCES "public"."resume_imports"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_resume_exports_fk" FOREIGN KEY ("resume_exports_id") REFERENCES "public"."resume_exports"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_preferences"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "users_sessions_order_idx" ON "users_sessions" USING btree ("_order");
  CREATE INDEX "users_sessions_parent_id_idx" ON "users_sessions" USING btree ("_parent_id");
  CREATE INDEX "users_updated_at_idx" ON "users" USING btree ("updated_at");
  CREATE INDEX "users_created_at_idx" ON "users" USING btree ("created_at");
  CREATE UNIQUE INDEX "users_email_idx" ON "users" USING btree ("email");
  CREATE INDEX "media_updated_at_idx" ON "media" USING btree ("updated_at");
  CREATE INDEX "media_created_at_idx" ON "media" USING btree ("created_at");
  CREATE UNIQUE INDEX "media_filename_idx" ON "media" USING btree ("filename");
  CREATE INDEX "resume_data_profile_contacts_order_idx" ON "resume_data_profile_contacts" USING btree ("_order");
  CREATE INDEX "resume_data_profile_contacts_parent_id_idx" ON "resume_data_profile_contacts" USING btree ("_parent_id");
  CREATE INDEX "resume_data_experiences_custom_blocks_items_order_idx" ON "resume_data_experiences_custom_blocks_items" USING btree ("_order");
  CREATE INDEX "resume_data_experiences_custom_blocks_items_parent_id_idx" ON "resume_data_experiences_custom_blocks_items" USING btree ("_parent_id");
  CREATE INDEX "resume_data_experiences_custom_blocks_order_idx" ON "resume_data_experiences_custom_blocks" USING btree ("_order");
  CREATE INDEX "resume_data_experiences_custom_blocks_parent_id_idx" ON "resume_data_experiences_custom_blocks" USING btree ("_parent_id");
  CREATE INDEX "resume_data_experiences_order_idx" ON "resume_data_experiences" USING btree ("_order");
  CREATE INDEX "resume_data_experiences_parent_id_idx" ON "resume_data_experiences" USING btree ("_parent_id");
  CREATE INDEX "resume_data_education_custom_blocks_items_order_idx" ON "resume_data_education_custom_blocks_items" USING btree ("_order");
  CREATE INDEX "resume_data_education_custom_blocks_items_parent_id_idx" ON "resume_data_education_custom_blocks_items" USING btree ("_parent_id");
  CREATE INDEX "resume_data_education_custom_blocks_order_idx" ON "resume_data_education_custom_blocks" USING btree ("_order");
  CREATE INDEX "resume_data_education_custom_blocks_parent_id_idx" ON "resume_data_education_custom_blocks" USING btree ("_parent_id");
  CREATE INDEX "resume_data_education_order_idx" ON "resume_data_education" USING btree ("_order");
  CREATE INDEX "resume_data_education_parent_id_idx" ON "resume_data_education" USING btree ("_parent_id");
  CREATE INDEX "resume_data_projects_links_order_idx" ON "resume_data_projects_links" USING btree ("_order");
  CREATE INDEX "resume_data_projects_links_parent_id_idx" ON "resume_data_projects_links" USING btree ("_parent_id");
  CREATE INDEX "resume_data_projects_custom_blocks_items_order_idx" ON "resume_data_projects_custom_blocks_items" USING btree ("_order");
  CREATE INDEX "resume_data_projects_custom_blocks_items_parent_id_idx" ON "resume_data_projects_custom_blocks_items" USING btree ("_parent_id");
  CREATE INDEX "resume_data_projects_custom_blocks_order_idx" ON "resume_data_projects_custom_blocks" USING btree ("_order");
  CREATE INDEX "resume_data_projects_custom_blocks_parent_id_idx" ON "resume_data_projects_custom_blocks" USING btree ("_parent_id");
  CREATE INDEX "resume_data_projects_order_idx" ON "resume_data_projects" USING btree ("_order");
  CREATE INDEX "resume_data_projects_parent_id_idx" ON "resume_data_projects" USING btree ("_parent_id");
  CREATE INDEX "resume_data_languages_order_idx" ON "resume_data_languages" USING btree ("_order");
  CREATE INDEX "resume_data_languages_parent_id_idx" ON "resume_data_languages" USING btree ("_parent_id");
  CREATE INDEX "resume_data_languages_language_idx" ON "resume_data_languages" USING btree ("language_id");
  CREATE INDEX "resume_data_owner_idx" ON "resume_data" USING btree ("owner_id");
  CREATE INDEX "resume_data_profile_profile_avatar_idx" ON "resume_data" USING btree ("profile_avatar_id");
  CREATE INDEX "resume_data_updated_at_idx" ON "resume_data" USING btree ("updated_at");
  CREATE INDEX "resume_data_created_at_idx" ON "resume_data" USING btree ("created_at");
  CREATE INDEX "resume_data_rels_order_idx" ON "resume_data_rels" USING btree ("order");
  CREATE INDEX "resume_data_rels_parent_idx" ON "resume_data_rels" USING btree ("parent_id");
  CREATE INDEX "resume_data_rels_path_idx" ON "resume_data_rels" USING btree ("path");
  CREATE INDEX "resume_data_rels_resume_skills_id_idx" ON "resume_data_rels" USING btree ("resume_skills_id");
  CREATE INDEX "resume_data_rels_resume_tools_id_idx" ON "resume_data_rels" USING btree ("resume_tools_id");
  CREATE INDEX "resume_data_rels_resume_technologies_id_idx" ON "resume_data_rels" USING btree ("resume_technologies_id");
  CREATE INDEX "resume_skills_updated_at_idx" ON "resume_skills" USING btree ("updated_at");
  CREATE INDEX "resume_skills_created_at_idx" ON "resume_skills" USING btree ("created_at");
  CREATE INDEX "resume_languages_updated_at_idx" ON "resume_languages" USING btree ("updated_at");
  CREATE INDEX "resume_languages_created_at_idx" ON "resume_languages" USING btree ("created_at");
  CREATE INDEX "resume_technologies_updated_at_idx" ON "resume_technologies" USING btree ("updated_at");
  CREATE INDEX "resume_technologies_created_at_idx" ON "resume_technologies" USING btree ("created_at");
  CREATE INDEX "resume_tools_updated_at_idx" ON "resume_tools" USING btree ("updated_at");
  CREATE INDEX "resume_tools_created_at_idx" ON "resume_tools" USING btree ("created_at");
  CREATE INDEX "resume_setups_owner_idx" ON "resume_setups" USING btree ("owner_id");
  CREATE INDEX "resume_setups_resume_data_idx" ON "resume_setups" USING btree ("resume_data_id");
  CREATE INDEX "resume_setups_resume_prompt_idx" ON "resume_setups" USING btree ("resume_prompt_id");
  CREATE INDEX "resume_setups_updated_at_idx" ON "resume_setups" USING btree ("updated_at");
  CREATE INDEX "resume_setups_created_at_idx" ON "resume_setups" USING btree ("created_at");
  CREATE INDEX "resume_prompts_updated_at_idx" ON "resume_prompts" USING btree ("updated_at");
  CREATE INDEX "resume_prompts_created_at_idx" ON "resume_prompts" USING btree ("created_at");
  CREATE INDEX "resume_imports_owner_idx" ON "resume_imports" USING btree ("owner_id");
  CREATE INDEX "resume_imports_resume_data_idx" ON "resume_imports" USING btree ("resume_data_id");
  CREATE INDEX "resume_imports_updated_at_idx" ON "resume_imports" USING btree ("updated_at");
  CREATE INDEX "resume_imports_created_at_idx" ON "resume_imports" USING btree ("created_at");
  CREATE INDEX "resume_exports_owner_idx" ON "resume_exports" USING btree ("owner_id");
  CREATE INDEX "resume_exports_resume_setup_idx" ON "resume_exports" USING btree ("resume_setup_id");
  CREATE INDEX "resume_exports_updated_at_idx" ON "resume_exports" USING btree ("updated_at");
  CREATE INDEX "resume_exports_created_at_idx" ON "resume_exports" USING btree ("created_at");
  CREATE INDEX "payload_locked_documents_global_slug_idx" ON "payload_locked_documents" USING btree ("global_slug");
  CREATE INDEX "payload_locked_documents_updated_at_idx" ON "payload_locked_documents" USING btree ("updated_at");
  CREATE INDEX "payload_locked_documents_created_at_idx" ON "payload_locked_documents" USING btree ("created_at");
  CREATE INDEX "payload_locked_documents_rels_order_idx" ON "payload_locked_documents_rels" USING btree ("order");
  CREATE INDEX "payload_locked_documents_rels_parent_idx" ON "payload_locked_documents_rels" USING btree ("parent_id");
  CREATE INDEX "payload_locked_documents_rels_path_idx" ON "payload_locked_documents_rels" USING btree ("path");
  CREATE INDEX "payload_locked_documents_rels_users_id_idx" ON "payload_locked_documents_rels" USING btree ("users_id");
  CREATE INDEX "payload_locked_documents_rels_media_id_idx" ON "payload_locked_documents_rels" USING btree ("media_id");
  CREATE INDEX "payload_locked_documents_rels_resume_data_id_idx" ON "payload_locked_documents_rels" USING btree ("resume_data_id");
  CREATE INDEX "payload_locked_documents_rels_resume_skills_id_idx" ON "payload_locked_documents_rels" USING btree ("resume_skills_id");
  CREATE INDEX "payload_locked_documents_rels_resume_languages_id_idx" ON "payload_locked_documents_rels" USING btree ("resume_languages_id");
  CREATE INDEX "payload_locked_documents_rels_resume_technologies_id_idx" ON "payload_locked_documents_rels" USING btree ("resume_technologies_id");
  CREATE INDEX "payload_locked_documents_rels_resume_tools_id_idx" ON "payload_locked_documents_rels" USING btree ("resume_tools_id");
  CREATE INDEX "payload_locked_documents_rels_resume_setups_id_idx" ON "payload_locked_documents_rels" USING btree ("resume_setups_id");
  CREATE INDEX "payload_locked_documents_rels_resume_prompts_id_idx" ON "payload_locked_documents_rels" USING btree ("resume_prompts_id");
  CREATE INDEX "payload_locked_documents_rels_resume_imports_id_idx" ON "payload_locked_documents_rels" USING btree ("resume_imports_id");
  CREATE INDEX "payload_locked_documents_rels_resume_exports_id_idx" ON "payload_locked_documents_rels" USING btree ("resume_exports_id");
  CREATE INDEX "payload_preferences_key_idx" ON "payload_preferences" USING btree ("key");
  CREATE INDEX "payload_preferences_updated_at_idx" ON "payload_preferences" USING btree ("updated_at");
  CREATE INDEX "payload_preferences_created_at_idx" ON "payload_preferences" USING btree ("created_at");
  CREATE INDEX "payload_preferences_rels_order_idx" ON "payload_preferences_rels" USING btree ("order");
  CREATE INDEX "payload_preferences_rels_parent_idx" ON "payload_preferences_rels" USING btree ("parent_id");
  CREATE INDEX "payload_preferences_rels_path_idx" ON "payload_preferences_rels" USING btree ("path");
  CREATE INDEX "payload_preferences_rels_users_id_idx" ON "payload_preferences_rels" USING btree ("users_id");
  CREATE INDEX "payload_migrations_updated_at_idx" ON "payload_migrations" USING btree ("updated_at");
  CREATE INDEX "payload_migrations_created_at_idx" ON "payload_migrations" USING btree ("created_at");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "users_sessions" CASCADE;
  DROP TABLE "users" CASCADE;
  DROP TABLE "media" CASCADE;
  DROP TABLE "resume_data_profile_contacts" CASCADE;
  DROP TABLE "resume_data_experiences_custom_blocks_items" CASCADE;
  DROP TABLE "resume_data_experiences_custom_blocks" CASCADE;
  DROP TABLE "resume_data_experiences" CASCADE;
  DROP TABLE "resume_data_education_custom_blocks_items" CASCADE;
  DROP TABLE "resume_data_education_custom_blocks" CASCADE;
  DROP TABLE "resume_data_education" CASCADE;
  DROP TABLE "resume_data_projects_links" CASCADE;
  DROP TABLE "resume_data_projects_custom_blocks_items" CASCADE;
  DROP TABLE "resume_data_projects_custom_blocks" CASCADE;
  DROP TABLE "resume_data_projects" CASCADE;
  DROP TABLE "resume_data_languages" CASCADE;
  DROP TABLE "resume_data" CASCADE;
  DROP TABLE "resume_data_rels" CASCADE;
  DROP TABLE "resume_skills" CASCADE;
  DROP TABLE "resume_languages" CASCADE;
  DROP TABLE "resume_technologies" CASCADE;
  DROP TABLE "resume_tools" CASCADE;
  DROP TABLE "resume_setups" CASCADE;
  DROP TABLE "resume_prompts" CASCADE;
  DROP TABLE "resume_imports" CASCADE;
  DROP TABLE "resume_exports" CASCADE;
  DROP TABLE "payload_locked_documents" CASCADE;
  DROP TABLE "payload_locked_documents_rels" CASCADE;
  DROP TABLE "payload_preferences" CASCADE;
  DROP TABLE "payload_preferences_rels" CASCADE;
  DROP TABLE "payload_migrations" CASCADE;
  DROP TABLE "openai" CASCADE;
  DROP TYPE "public"."_locales";
  DROP TYPE "public"."enum_users_role";
  DROP TYPE "public"."enum_resume_data_profile_contacts_type";
  DROP TYPE "public"."enum_resume_data_experiences_type";
  DROP TYPE "public"."enum_resume_data_languages_level";
  DROP TYPE "public"."enum_resume_skills_category";
  DROP TYPE "public"."enum_resume_technologies_type";
  DROP TYPE "public"."enum_resume_tools_category";
  DROP TYPE "public"."enum_resume_setups_export_format";
  DROP TYPE "public"."enum_resume_setups_options_optmized_for";
  DROP TYPE "public"."enum_resume_imports_import_type";
  DROP TYPE "public"."enum_resume_exports_status";
  DROP TYPE "public"."enum_resume_exports_export_type";
  DROP TYPE "public"."enum_openai_general_model";`)
}
