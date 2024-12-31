"use client";

import { cn } from "@/lib/utils";
import { InputProps } from "@/shared/types/input-type";

const Input = (props: InputProps) => {
  const baseStyles = cn(
    "w-full px-4 py-2 rounded-md",
    props.backgroundColor && props.backgroundColor !== "default" ? `bg-${props.backgroundColor}` : "bg-white",
    props.contextColor && props.contextColor !== "default" ? `text-${props.contextColor}` : "text-gray",
    "border border-gray",
    "focus:outline-none focus:ring-2",
    props.contextColor && props.contextColor !== "default" ? `focus:ring-${props.contextColor}` : "focus:ring-primary",
    "transition duration-300",
  );

  return (
    <input
      type={props.type ? props.type : "text"}
      name={props.name}
      value={props.value}
      placeholder={props.placeholder}
      required={props.required}
      disabled={props.disabled}
      className={`${baseStyles} ${props.className}`}
      onChange={props.onChange}
      onKeyDown={props.onKeyDown}
    />
  );
};

export default Input;
