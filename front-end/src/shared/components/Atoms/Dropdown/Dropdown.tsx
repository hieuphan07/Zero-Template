"use client";

import { useState, useEffect, useRef } from "react";
import { DropdownOption, DropdownProps } from "@/shared/types/components-type/drop-down-type";
import { cn } from "@/lib/utils";
import Label from "../Label/Label";

const Dropdown = (props: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  // eslint-disable-next-line
  const [items, setItems] = useState<any[]>([]);
  const [allowClick, setAllowClick] = useState(true);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownValuesRef = useRef<HTMLDivElement>(null);

  const baseStyles = cn(
    "w-full px-4 py-2 rounded-md",
    props.backgroundColor && props.backgroundColor !== "default" ? `bg-${props.backgroundColor}` : "bg-white",
    props.contextColor && props.contextColor !== "default" ? `text-${props.contextColor}` : "text-gray",
    "border border-gray",
    "focus:outline-none focus:ring-2",
    props.contextColor && props.contextColor !== "default" ? `focus:ring-${props.contextColor}` : "focus:ring-primary",
    "transition duration-300",
  );

  useEffect(() => {
    setItems(props.options);
  }, [props.options]);

  const fetchData = (search: string): boolean => {
    let items = props.options;
    if (search) {
      items = items.filter((item) => item.label.toLowerCase().includes(search.toLowerCase()));
    }
    setItems(items);
    return items.length > 0;
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        closeDropdown();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const result = fetchData(e.target.value);
    if (result == false) {
      setTimeout(() => {
        fetchData("");
        if (inputRef.current) {
          inputRef.current.value = "";
        }
      }, 2000);
    }
    openDropdown();
  };

  const handleItemClick = (item: DropdownOption) => {
    if (inputRef.current) {
      inputRef.current.value = item.label;
    }
    props.action?.(item);
    closeDropdown();
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
    if (dropdownValuesRef.current) {
      dropdownValuesRef.current.classList.add("animate-slideUpOut");
    }
    setTimeout(() => {
      if (dropdownValuesRef.current) {
        dropdownValuesRef.current.classList.remove("animate-slideUpOut");
      }
      setIsOpen(false);
      setAllowClick(true);
    }, 500);
  };

  const [maxHeight, setMaxHeight] = useState(0);

  useEffect(() => {
    if (dropdownValuesRef.current) {
      const itemsToShow = props.maximumRevealItems || 3; // Number of items visible
      const itemHeights = Array.from(dropdownValuesRef.current.children)
        .slice(0, itemsToShow)
        .map((child) => child.getBoundingClientRect().height);
      const calculatedHeight = itemHeights.reduce((acc, height) => acc + height, 0);
      setMaxHeight(calculatedHeight);
    }
  }, [items, props.maximumRevealItems, allowClick]);

  return (
    <div ref={dropdownRef} className={`relative ${props.className}`}>
      <input
        ref={inputRef}
        type="text"
        onChange={handleInputChange}
        onClick={() => allowClick && (isOpen ? closeDropdown() : openDropdown())}
        placeholder={props.placeholder ? props.placeholder : "Search..."}
        className={cn(baseStyles, props.inputClassName, props.allowSearch ? "" : "cursor-pointer")}
        readOnly={props.allowSearch ? false : true}
        defaultValue={props.defaultValue}
      />

      <div
        ref={dropdownValuesRef}
        className={`absolute w-full max-w-[300px] mt-1 ${isOpen ? "block" : "hidden"} 
        bg-white border rounded-md shadow-lg animate-slideDown overflow-y-auto
        overflow-x-auto z-50`}
        style={{ maxHeight: items.length > (props.maximumRevealItems || 3) ? `${maxHeight}px` : "unset" }}
      >
        {items.length > 0 ? (
          // eslint-disable-next-line
          items.map((item: any, index: number) => (
            <div
              key={index}
              className="px-4 py-2 cursor-pointer hover:bg-gray-100 whitespace-nowrap"
              onClick={() => handleItemClick(item)}
            >
              <Label text={item.label} className="text-black font-bold text-lg text-center" />
            </div>
          ))
        ) : (
          <div className="p-4 text-center text-gray-500">No results found</div>
        )}
      </div>
    </div>
  );
};

export default Dropdown;
