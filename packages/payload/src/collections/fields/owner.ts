import type { Field } from "payload";

export const ownerField: Field = {
  name: "owner",
  type: "relationship",
  relationTo: "users",
  hasMany: false,
  required: true,
  admin: {
    readOnly: true,
    position: "sidebar",
    condition: (_, siblingData) => {
      return !!siblingData?.id;
    },
  },
  hooks: {
    beforeValidate: [
      ({ req, operation, siblingData }) => {
        if (operation !== "create") return;

        if (!siblingData?.owner) {
          siblingData.owner = req.user?.id;
        }
      },
    ],
  },
};
export default ownerField;
