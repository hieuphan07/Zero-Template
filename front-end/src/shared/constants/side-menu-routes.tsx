import { MenuItem } from "@/shared/types/components-type/sidemenu-type";
import { LayoutDashboard, User, Users, Shield, HelpCircle, Info, Settings } from "lucide-react";

// template

export const menuRoutes: MenuItem[] = [
  { name: "Dashboard", path: "/dashboard", icon: <LayoutDashboard size={20} /> },
  { name: "Profile", path: "/profile", icon: <User size={20} /> },
  {
    name: "Management",
    path: "/admin",
    icon: <Settings size={20} />,
    children: [
      { name: "Users", path: "/admin/user", icon: <Users size={20} /> },
      {
        name: "Roles",
        path: "/management/roles",
        icon: <Shield size={20} />,
        children: [{ name: "Permissions", path: "/management/roles/permissions", icon: <Shield size={20} /> }],
      },
    ],
  },
  { name: "Help", path: "/help", icon: <HelpCircle size={20} /> },
  { name: "About", path: "/about", icon: <Info size={20} /> },
];
