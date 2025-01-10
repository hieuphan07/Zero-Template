"use client";

import { useState, useEffect, useRef } from "react";
import { DropdownOption, DropdownProps } from "@/shared/types/components-type/drop-down-type";
import { cn } from "@/lib/utils";
import Label from "../Label/Label";

const Dropdown = (props: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  // eslint-disable-next-line
  const [items, setItems] = useState<any[]>([]);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

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
        setIsOpen(false);
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
    setIsOpen(true);
  };

  const handleItemClick = (item: DropdownOption) => {
    if (inputRef.current) {
      inputRef.current.value = item.label;
    }
    props.action?.(item);
    setIsOpen(false);
  };

  return (
    <div ref={dropdownRef} className={`relative ${props.className}`}>
      <input
        ref={inputRef}
        type="text"
        onChange={handleInputChange}
        onFocus={() => (props.clickOpen ? setIsOpen(true) : null)}
        placeholder={props.placeholder ? props.placeholder : "Search..."}
        className={cn(baseStyles, props.inputClassName)}
        readOnly={props.allowSearch ? false : true}
        defaultValue={props.defaultValue}
      />

      {isOpen && (
        <div className="absolute w-full max-w-[300px] mt-1 bg-white border rounded-md shadow-lg max-h-60 overflow-y-auto overflow-x-auto z-50">
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
      )}
    </div>
  );
};

export default Dropdown;
