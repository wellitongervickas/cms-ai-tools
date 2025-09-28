import type { CollectionConfig } from "payload";

import { Role, byRole } from "@repo/payload/utils/roles";
import {
  getResumeContactTypeOptions,
  getResumeExperienceTypeOptions,
  getResumeLanguageLevelOptions,
} from "@repo/payload/utils/resumes";
import { ownerField } from "@repo/payload/collections/fields/owner";

export const resumeData: CollectionConfig<"resume_data"> = {
  slug: "resume_data",
  admin: {
    useAsTitle: "name",
  },
  typescript: {
    interface: "ResumeData",
  },
  labels: {
    singular: "Resume Data",
    plural: "Resume Data",
  },
  fields: [
    ownerField,
    {
      type: "text",
      name: "name",
      label: "Name",
    },
    {
      type: "group",
      name: "profile",
      label: "Profile",
      fields: [
        {
          type: "relationship",
          name: "avatar",
          relationTo: "media",
          hasMany: false,
          admin: {
            width: "100%",
          },
        },
        {
          type: "row",
          fields: [
            {
              type: "text",
              name: "suffix",
              label: "Suffix",
              admin: {
                width: "25%",
              },
            },
            {
              name: "firstName",
              type: "text",
              label: "First Name",
              admin: {
                width: "25%",
              },
            },
            {
              name: "middleName",
              type: "text",
              label: "Middle Name",
              admin: {
                width: "25%",
              },
            },
            {
              name: "lastName",
              type: "text",
              label: "Last Name",
              admin: {
                width: "25%",
              },
            },
          ],
        },
        {
          type: "array",
          name: "contacts",
          fields: [
            {
              type: "row",
              fields: [
                {
                  type: "select",
                  name: "type",
                  label: "Type",
                  admin: {
                    width: "20%",
                  },
                  options: getResumeContactTypeOptions(),
                },
                {
                  name: "value",
                  type: "text",
                  label: "Value",
                  admin: {
                    width: "40%",
                  },
                },
                {
                  type: "text",
                  name: "label",
                  label: "Label",
                  admin: {
                    width: "40%",
                  },
                },
              ],
            },
          ],
        },
        {
          type: "row",
          fields: [
            {
              name: "headline",
              type: "text",
              label: "Headline",
              admin: {
                width: "100%",
              },
            },
            {
              name: "summary",
              type: "textarea",
              label: "Summary",
              admin: {
                width: "100%",
              },
            },
          ],
        },
      ],
    },
    {
      type: "array",
      name: "experiences",
      label: "Experiences",
      fields: [
        {
          type: "row",
          fields: [
            {
              type: "text",
              name: "jobTitle",
              label: "Job Title",
              admin: {
                width: "60%",
              },
            },
            {
              type: "select",
              name: "type",
              label: "Type",
              admin: {
                width: "40%",
              },
              options: getResumeExperienceTypeOptions(),
            },
          ],
        },
        {
          type: "text",
          name: "company",
          label: "Company",
        },
        {
          type: "text",
          name: "location",
          label: "Location",
        },
        {
          type: "row",
          fields: [
            {
              type: "date",
              name: "startDate",
              label: "Start Date",
              admin: {
                width: "50%",
              },
            },
            {
              type: "date",
              name: "endDate",
              label: "End Date",
              admin: {
                width: "50%",
              },
            },
          ],
        },
        {
          type: "textarea",
          name: "description",
          label: "Description",
        },
        {
          type: "relationship",
          name: "skills",
          relationTo: "resume_skills",
          hasMany: true,
        },
        {
          type: "relationship",
          name: "tools",
          label: "Tools",
          relationTo: "resume_tools",
          hasMany: true,
        },
        {
          type: "relationship",
          name: "technologies",
          relationTo: "resume_technologies",
          hasMany: true,
        },
        {
          type: "array",
          name: "customBlocks",
          fields: [
            {
              type: "text",
              name: "blockTitle",
              label: "Block Title",
            },
            {
              type: "array",
              name: "items",
              fields: [
                {
                  type: "text",
                  name: "item",
                  label: "Item",
                },
              ],
            },
          ],
        },
      ],
    },
    {
      type: "array",
      name: "education",
      label: "Education",
      fields: [
        {
          type: "row",
          fields: [
            {
              type: "text",
              name: "institution",
              label: "Institution",
              admin: {
                width: "50%",
              },
            },
            {
              type: "text",
              name: "degree",
              label: "Degree",
              admin: {
                width: "50%",
              },
            },
            {
              type: "text",
              name: "fieldOfStudy",
              label: "Field of Study",
              admin: {
                width: "50%",
              },
            },
            {
              type: "text",
              name: "location",
              label: "Location",
              admin: {
                width: "50%",
              },
            },
          ],
        },
        {
          type: "row",
          fields: [
            {
              type: "date",
              name: "startDate",
              label: "Start Date",
            },
            {
              type: "date",
              name: "endDate",
              label: "End Date",
            },
          ],
        },
        {
          type: "textarea",
          name: "description",
          label: "Description",
        },
        {
          type: "array",
          name: "customBlocks",
          fields: [
            {
              type: "text",
              name: "blockTitle",
              label: "Block Title",
            },
            {
              type: "array",
              name: "items",
              fields: [
                {
                  type: "text",
                  name: "item",
                  label: "Item",
                },
              ],
            },
          ],
        },
      ],
    },
    {
      type: "group",
      label: "Skills",
      fields: [
        {
          type: "relationship",
          name: "skills",
          label: false,
          relationTo: "resume_skills",
          hasMany: true,
        },
      ],
    },
    {
      type: "array",
      name: "projects",
      label: "Projects",
      fields: [
        {
          type: "row",
          fields: [
            {
              type: "text",
              name: "project",
              label: "Project",
            },
            {
              type: "text",
              name: "role",
              label: "Role",
            },
          ],
        },
        {
          type: "text",
          name: "description",
          label: "Description",
        },

        {
          type: "relationship",
          name: "technologies",
          relationTo: "resume_technologies",
          hasMany: true,
        },
        {
          type: "array",
          name: "links",
          fields: [
            {
              type: "text",
              name: "link",
              label: "Link",
            },
            {
              type: "text",
              name: "label",
              label: "Label",
            },
          ],
        },
        {
          type: "array",
          name: "customBlocks",
          fields: [
            {
              type: "text",
              name: "blockTitle",
              label: "Block Title",
            },
            {
              type: "array",
              name: "items",
              fields: [
                {
                  type: "text",
                  name: "item",
                  label: "Item",
                },
              ],
            },
          ],
        },
      ],
    },
    {
      type: "array",
      name: "languages",
      label: "Languages",
      fields: [
        {
          type: "relationship",
          name: "language",
          label: "Language",
          relationTo: "resume_languages",
          hasMany: false,
        },
        {
          type: "select",
          name: "level",
          label: "Level",
          options: getResumeLanguageLevelOptions(),
        },
      ],
    },
  ],
  access: {
    read: byRole([Role.Admin]),
    update: byRole([Role.Admin]),
    create: byRole([Role.Admin]),
    delete: byRole([Role.Admin]),
    admin: byRole([Role.Admin]),
  },
};
