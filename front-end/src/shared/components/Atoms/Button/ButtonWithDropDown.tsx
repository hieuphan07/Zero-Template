"use client";

import { useState, useRef, useEffect } from "react";
import Button from "./Button";
import { cn } from "@/lib/utils";
import { Color } from "@/shared/types/common-type/shared-types";
import { ButtonWithDropDownProps } from "@/shared/types/components-type/button-type";

const ButtonWithDropDown = (props: ButtonWithDropDownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [allowClick, setAllowClick] = useState(true);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!allowClick) return;
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        closeDropdown();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [allowClick]);

  const toggleDropdown = () => {
    if (isOpen) {
      closeDropdown();
    } else {
      openDropdown();
    }
  };

  const openDropdown = () => {
    setAllowClick(false);
    setIsOpen(true);
    setTimeout(() => {
      setAllowClick(true);
    }, 500);
  };

  const closeDropdown = () => {
    setAllowClick(false);
    if (dropdownRef.current) {
      dropdownRef.current.classList.add("animate-slideUpOut");
    }
    setTimeout(() => {
      if (dropdownRef.current) {
        dropdownRef.current.classList.remove("animate-slideUpOut");
      }
      setIsOpen(false);
      setAllowClick(true);
    }, 500);
  };

  return (
    <div className="relative" ref={buttonRef}>
      <Button
        action={() => allowClick && toggleDropdown()}
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
      <div
        ref={dropdownRef}
        className={cn(
          `absolute z-50 mt-2 w-fit min-w-full bg-${props.mainColor} shadow-lg rounded-md ${isOpen ? "block" : "hidden"} animate-slideDown ${props.dropdownAlignment === "right" ? "right-0" : "left-0"}`,
          props.dropdownClassName,
        )}
      >
        {props.dropdownContent}
      </div>
    </div>
  );
};

export default ButtonWithDropDown;
