import { MenuItem } from "@/shared/types/components-type/sidemenu-type";
import { LayoutDashboard, User, Users, Shield, HelpCircle, Info, Settings } from "lucide-react";
import { AllPath } from "./application-path";

// template

export const menuRoutes: MenuItem[] = [
  { icon: <LayoutDashboard size={20} />, ...AllPath.dashboard },
  { icon: <User size={20} />, ...AllPath.profile },
  {
    icon: <Settings size={20} />,
    children: [
      { icon: <Users size={20} />, ...AllPath.adminUser },
      {
        icon: <Shield size={20} />,
        ...AllPath.adminRoles,
        children: [{ icon: <Shield size={20} />, ...AllPath.adminRolesPermissions }],
      },
    ],
    ...AllPath.admin,
  },
  { icon: <HelpCircle size={20} />, ...AllPath.help },
  { icon: <Info size={20} />, ...AllPath.about },
];
