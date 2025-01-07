"use client";

import { useState, useRef, useEffect } from "react";
import Button from "./Button";
import { ButtonProps } from "@/shared/types/components-type/button-type";
import { cn } from "@/lib/utils";
import { Color } from "@/shared/types/common-type/shared-types";

type ButtonWithDropDownProps = ButtonProps & {
  dropdownContent: React.ReactNode;
  dropdownClassName?: string;
};

const ButtonWithDropDown = (props: ButtonWithDropDownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative" ref={buttonRef}>
      <Button
        action={toggleDropdown}
        text={props.text as string}
        iconBefore={props.iconBefore}
        iconAfter={props.iconAfter}
        disabled={props.disabled}
        className={props.className}
        mainColor={props.mainColor as Color}
        contextColor={props.contextColor as Color}
        isTransparent={props.isTransparent}
        border={props.border}
      />
      {isOpen && (
        <div
          ref={dropdownRef}
          className={cn(
            `absolute z-50 mt-2 w-fit min-w-full bg-${props.mainColor} shadow-lg rounded-md animate-slideDown`,
            props.dropdownClassName,
          )}
        >
          {props.dropdownContent}
        </div>
      )}
    </div>
  );
};

export default ButtonWithDropDown;
