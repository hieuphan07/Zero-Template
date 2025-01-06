import { MenuItem } from "@/shared/types/components-type/sidemenu-type";

// template

export const menuRoutes: MenuItem[] = [
  { name: "Dashboard", path: "/dashboard" },
  { name: "Profile", path: "/profile" },
  {
    name: "Management",
    path: "/admin",
    children: [
      { name: "Users", path: "admin/user" },
      {
        name: "Roles",
        path: "/management/roles",
        children: [{ name: "Permissions", path: "/management/roles/permissions" }],
      },
    ],
  },
  { name: "Help", path: "/help" },
  { name: "About", path: "/about" },
];
