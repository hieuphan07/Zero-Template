"use client";

import { useState, useEffect, useRef } from "react";
import { DropdownProps } from "@/shared/types/drop-down-type";
import { cn } from "@/lib/utils";

const Dropdown = (props: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  // eslint-disable-next-line
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const baseStyles = cn(
    "w-full px-4 py-2 rounded-md",
    props.backgroundColor && props.backgroundColor !== "default" ? `bg-${props.backgroundColor}` : "bg-white",
    props.contextColor && props.contextColor !== "default" ? `text-${props.contextColor}` : "text-gray",
    "border border-gray",
    "focus:outline-none focus:ring-2",
    props.contextColor && props.contextColor !== "default" ? `focus:ring-${props.contextColor}` : "focus:ring-primary",
    "transition duration-300",
  );

  const fetchData = async (search: string) => {
    try {
      setLoading(true);
      const queryParam = search ? `?search=${encodeURIComponent(search)}` : "";
      const response = await fetch(`${props.apiEndpoint}${queryParam}`);
      const data = await response.json();
      setItems(data);
    } catch (error) {
      console.error("Error fetching data:", error);
      setItems([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (searchTerm) {
      fetchData(searchTerm);
    }
    // eslint-disable-next-line
  }, [searchTerm]);

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
    setSearchTerm(e.target.value);
    setIsOpen(true);
  };

  // eslint-disable-next-line
  const handleItemClick = (item: any) => {
    props.action?.(item);
    setIsOpen(false);
  };

  return (
    <div ref={dropdownRef} className={`relative ${props.className}`}>
      <input
        type="text"
        value={searchTerm}
        onChange={handleInputChange}
        onFocus={() => (props.clickOpen ? setIsOpen(true) : null)}
        placeholder={props.placeholder ? props.placeholder : "Search..."}
        className={baseStyles}
      />

      {isOpen && (
        <div className="absolute w-full max-w-[300px] mt-1 bg-white border rounded-md shadow-lg max-h-60 overflow-y-auto overflow-x-auto z-50">
          {loading ? (
            <div className="p-4 text-center text-gray-500">Loading...</div>
          ) : items.length > 0 ? (
            // eslint-disable-next-line
            items.map((item: any, index: number) => (
              <div
                key={index}
                className="px-4 py-2 cursor-pointer hover:bg-gray-100 whitespace-nowrap"
                onClick={() => handleItemClick(item)}
              >
                {item.name || item.title || JSON.stringify(item)}
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
