import { ApplicationPath } from "../types/common-type/shared-types";

export const AllPath: { [key: string]: ApplicationPath } = {
  home: { path: "/", name: "Home" },
  dashboard: { path: "/dashboard", name: "Dashboard" },
  profile: { path: "/profile", name: "Profile" },
  admin: { path: "/admin", name: "Management" },
  adminUser: { path: "/admin/user", name: "User Management" },
  adminRoles: { path: "/admin/roles", name: "Roles Management" },
  adminRolesPermissions: { path: "/admin/roles/permissions", name: "Roles' Permissions" },
  help: { path: "/help", name: "Help" },
  about: { path: "/about", name: "About" },
};
