"use client";

import { cn } from "@/lib/utils";
import { RadioButtonProps } from "@/shared/types/radiobutton-type";

const RadioButton = (props: RadioButtonProps) => {
  const baseStyles = cn(
    "form-radio",
    "h-4 w-4",
    "transition duration-200",
    `accent-${props.contextColor}`,
    props.contextColor && props.contextColor !== "default"
      ? `text-${props.contextColor} border-${props.contextColor} checked:bg-${props.contextColor}`
      : "text-primary border-gray-300 checked:bg-primary",
    "focus:ring-2",
    props.contextColor && props.contextColor !== "default" ? `focus:ring-${props.contextColor}` : "focus:ring-primary",
    "focus:ring-offset-2",
    "focus:outline-none",
    props.disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer",
    props.className,
  );

  return (
    <label className="inline-flex items-center">
      <input
        type="radio"
        name={props.name}
        value={props.value}
        checked={props.checked}
        disabled={props.disabled}
        className={baseStyles}
        onChange={props.onChange}
      />
      {props.label && (
        <span
          className={`ml-2 ${props.disabled ? "opacity-50" : "cursor-pointer"} ${props.textColor ? `text-${props.textColor}` : "text-black"} ${props.textClassName}`}
        >
          {props.label}
        </span>
      )}
    </label>
  );
};

export default RadioButton;
