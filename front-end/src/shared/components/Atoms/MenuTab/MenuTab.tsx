"use client";

import { useState } from "react";
import { ChevronDownIcon, ChevronRightIcon } from "lucide-react";
import ZeroLink from "../Link/ZeroLink";
import { Color } from "@/shared/types/shared-types";

type MenuTabProps = {
  name: string;
  path: string;
  isCollapsed?: boolean;
  children?: MenuTabProps[];
  color?: Color;
  className?: string;
};

const MenuTab = (props: MenuTabProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = (e: React.MouseEvent) => {
    if (props.children?.length) {
      e.preventDefault();
      setIsExpanded(!isExpanded);
    }
  };

  return (
    <div className={`w-full ${props.className}`}>
      <div className="flex items-center gap-2">
        <ZeroLink
          href={props.path}
          className="flex-1 flex items-center gap-2"
          color={props.color}
          action={toggleExpand}
        >
          <span>{props.isCollapsed ? props.name.charAt(0) : props.name}</span>
          {props.children && props.children.length > 0 && (
            <span className="transition-transform duration-300">
              {isExpanded ? <ChevronDownIcon size={16} /> : <ChevronRightIcon size={16} />}
            </span>
          )}
        </ZeroLink>
      </div>

      {props.children && props.children.length > 0 && isExpanded && (
        <div className={`${props.isCollapsed ? "ml-2" : "ml-4"} transition-all duration-300 mt-2 flex flex-col gap-2`}>
          {props.children.map((child, index) => (
            <MenuTab
              key={index}
              name={child.name}
              path={child.path}
              color={props.color}
              isCollapsed={props.isCollapsed}
              className="text-sm"
            >
              {child.children}
            </MenuTab>
          ))}
        </div>
      )}
    </div>
  );
};

export default MenuTab;
