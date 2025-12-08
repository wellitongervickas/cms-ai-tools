import { User } from "@repo/payload/payload-types";
import type { AccessArgs } from "payload";

export enum Role {
  Admin = "admin",
}

export const checkRole = (allRoles: Role[] = [], user?: User): boolean => {
  return allRoles.includes(user?.role as Role);
};

export const admins = ({ req: { user } }: AccessArgs) => {
  return checkRole([Role.Admin], user ? user : undefined);
};

export const anyone = () => true;

export const noOne = () => false;

export const byRole = (roles: Role[]) => {
  const roleValidatorMap = {
    [Role.Admin]: admins,
  };

  return (args: AccessArgs) => {
    try {
      return roles.some((role) => roleValidatorMap[role](args) === true);
    } catch (error) {
      args.req.payload.logger.error("Error while validating roles: " + error);
      return false;
    }
  };
};
