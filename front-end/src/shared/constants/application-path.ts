import { ApplicationPath } from "../types/common-type/shared-types";

export const AllPath: { [key: string]: ApplicationPath } = {
  home: { path: "/", name: "common:path.home" },
  dashboard: { path: "/dashboard", name: "common:path.dashboard" },
  profile: { path: "/profile", name: "common:path.profile" },
  admin: { path: "/admin", name: "common:path.admin" },
  adminUser: { path: "/admin/user", name: "common:path.adminUser" },
  adminRoles: { path: "/admin/roles", name: "common:path.adminRoles" },
  adminRolesPermissions: { path: "/admin/roles/permissions", name: "common:path.adminRolesPermissions" },
  help: { path: "/help", name: "common:path.help" },
  about: { path: "/about", name: "common:path.about" },
};
