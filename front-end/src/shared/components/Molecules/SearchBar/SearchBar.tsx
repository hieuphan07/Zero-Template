"use client";

import { useCallback, useRef, useState } from "react";
import Input from "@/shared/components/Atoms/Input/Input";
import Button from "@/shared/components/Atoms/Button/Button";
import { SearchIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { SearchBarProps } from "@/shared/types/components-type/searchbar-type";

const SearchBar = (props: SearchBarProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = setTimeout(() => {
        setSearchTerm(e.target.value);
        handleSearch(e.target.value);
      }, props.delayOnChangeAutoSearch);
    },
    // eslint-disable-next-line
    [],
  );

  const handleSearch = (searchValue?: string) => {
    props.onSearch(searchValue || searchTerm);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      handleSearch();
    }
  };

  const baseClasses = cn(
    "w-fit flex",
    props.attachToEachOther ? "" : "gap-2",
    props.focusBorder
      ? `border-transparent border-2 border-solid focus-within:border-${props.focusBorderColor} focus-within:rounded-lg`
      : "",
  );

  return (
    <div className={`${baseClasses} ${props.className}`}>
      <Input
        name="search"
        type="text"
        onChange={(e) => (props.delayOnChangeAutoSearch ? handleChange(e) : setSearchTerm(e.target.value))}
        onKeyDown={handleKeyPress}
        placeholder={props.placeholder}
        className={`flex-1 !focus:outline-none !ring-0 !focus:ring-0 ${props.attachToEachOther ? "rounded-none rounded-l-md" : ""}`}
        contextColor={props.inputContextColor}
        border
      />
      <Button
        action={handleSearch}
        text={props.buttonText ? "Search" : ""}
        mainColor={props.buttonMainColor}
        contextColor={props.buttonContextColor}
        iconBefore={<SearchIcon size={20} />}
        border
        manualHover
        className={`hover:bg-${props.buttonMainColor} opacity-100 hover:opacity-75 !transition-all !duration-300 hover:text-${props.buttonContextColor} ${props.attachToEachOther ? "rounded-none rounded-r-md" : ""}`}
      />
    </div>
  );
};

export default SearchBar;
