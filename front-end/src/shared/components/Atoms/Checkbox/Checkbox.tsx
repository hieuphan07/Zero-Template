"use client";

import { cn } from "@/lib/utils";
import { useState } from "react";
import { CheckboxProps } from "@/shared/types/components-type/checkbox-type";

const Checkbox = (props: CheckboxProps) => {
  const [isChecked, setIsChecked] = useState(props.checked || false);

  const handleClick = () => {
    if (!props.disabled) {
      const newChecked = !isChecked;
      setIsChecked(newChecked);
      props.onChange?.(newChecked);
    }
  };

  const checkboxStyles = cn(
    "w-5 h-5 border-2 rounded cursor-pointer flex items-center justify-center transition-all duration-200",
    props.disabled && "opacity-50 cursor-not-allowed",
    isChecked
      ? props.boxColor
        ? props.boxColor !== "default"
          ? `bg-${props.boxColor} border-${props.boxColor}`
          : "bg-primary border-primary"
        : props.mainColor
          ? props.mainColor !== "default"
            ? `bg-${props.mainColor} border-${props.mainColor}`
            : "bg-primary border-primary"
          : "bg-primary border-primary"
      : props.boxColor
        ? props.boxColor !== "default"
          ? `bg-white border-${props.boxColor}`
          : "bg-white border-gray-300 hover:border-gray-400"
        : props.mainColor
          ? props.mainColor !== "default"
            ? `bg-white border-${props.mainColor}`
            : "bg-white border-gray-300 hover:border-gray-400"
          : "bg-white border-gray-300 hover:border-gray-400",
    props.className,
  );

  const labelStyles = cn(
    "ml-2 select-none cursor-pointer",
    props.mainColor ? `text-${props.mainColor}` : "text-gray-700",
    props.disabled && "opacity-50",
    props.textClassName,
  );

  const svgStyles = cn(
    "w-8 h-8 text-c",
    props.boxColor
      ? props.boxColor == "default"
        ? "text-white"
        : `text-${props.boxColor}-foreground`
      : props.mainColor
        ? props.mainColor == "default"
          ? "text-white"
          : `text-${props.mainColor}-foreground`
        : "text-white",
    props.disabled && "opacity-50",
    props.textClassName,
  );

  return (
    <div className="flex items-center">
      <div
        role="checkbox"
        aria-checked={isChecked}
        tabIndex={props.disabled ? -1 : 0}
        className={checkboxStyles}
        onClick={handleClick}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            handleClick();
          }
        }}
      >
        {isChecked && (
          <svg className={svgStyles} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        )}
      </div>
      {props.label && (
        <label onClick={handleClick} className={labelStyles}>
          {props.label}
        </label>
      )}
    </div>
  );
};

export default Checkbox;
