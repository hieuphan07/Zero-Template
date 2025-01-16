"use client";

import { cn } from "@/lib/utils";
import { InputProps } from "@/shared/types/components-type/input-type";
import { EyeIcon, EyeOffIcon, TriangleAlertIcon } from "lucide-react";
import { useCallback, useRef, useState } from "react";

const Input = (props: InputProps) => {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [isPasswordShown, setIsPasswordShown] = useState(false);
  const hiddenInputRef = useRef<HTMLInputElement>(null);
  const shownInputRef = useRef<HTMLInputElement>(null);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (props.onChangeBeforeDelay) {
        props.onChangeBeforeDelay(e);
      }
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = setTimeout(() => {
        if (hiddenInputRef.current && shownInputRef.current) {
          hiddenInputRef.current.value = shownInputRef.current.value;
        }
        if (props.onChange) {
          props.onChange(e);
        }
      }, props.delayOnChange);
    },
    // eslint-disable-next-line
    [props.onChange],
  );

  const handleNonAutoFillOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (hiddenInputRef.current) {
      hiddenInputRef.current.value = shownInputRef.current?.value || "";
    }
    if (props.delayOnChange) {
      handleChange(e);
    } else {
      props.onChange?.(e);
    }
  };

  const handleKeyDownWhenDelayOnChange = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (hiddenInputRef.current) {
        hiddenInputRef.current.value = shownInputRef.current?.value || "";
      }
      props.onKeyDown?.(e);
    },
    // eslint-disable-next-line
    [props.onKeyDown],
  );

  const baseStyles = cn(
    "w-full rounded-l-md ",
    props.backgroundColor && props.backgroundColor !== "default" ? `bg-${props.backgroundColor}` : "bg-white",
    props.contextColor && props.contextColor !== "default" ? `text-${props.contextColor}` : "text-gray",
    "focus-within:outline-none focus-within:ring-2",
    props.border
      ? props.contextColor && props.contextColor !== "default"
        ? `border-[1px] border-${props.contextColor}`
        : "border-[1px] border-primary"
      : "",
    props.contextColor && props.contextColor !== "default" ? `focus:ring-${props.contextColor}` : "focus:ring-primary",
    "transition duration-300",
  );

  const inputStyles = cn(
    "w-full px-4 py-2 rounded-md bg-transparent",
    "focus:outline-none focus:ring-none",
    props.disabled && "cursor-not-allowed opacity-50 bg-gray-100",
  );

  return (
    <div
      className={`flex justify-center items-center relative rounded-md ${baseStyles} ${props.className} ${props.isError ? "border-2 border-red-500" : ""} `}
    >
      {props.autoFill ? (
        <input
          id={props.id || props.name}
          type={
            props.type ? (props.type === "password" ? (isPasswordShown ? "text" : "password") : props.type) : "text"
          }
          name={props.name}
          defaultValue={props.defaultValue}
          value={props.value}
          placeholder={props.placeholder}
          required={props.required}
          disabled={props.disabled}
          className={`${inputStyles} ${props.inputClassName}`}
          onChange={props.delayOnChange ? handleChange : props.onChange}
          onKeyDown={props.onKeyDown}
          onBlur={props.onBlur}
          onFocus={props.onFocus}
          suppressHydrationWarning
        />
      ) : (
        <>
          <input
            ref={hiddenInputRef}
            id={props.id || props.name + "-" + Math.random().toString(36).substring(2, 15)}
            type={props.type}
            name={props.name}
            defaultValue={props.defaultValue}
            className="w-0 h-0"
            tabIndex={-1}
          />
          <input
            ref={shownInputRef}
            id={"protected-" + (props.id || props.name) + "-" + Math.random().toString(36).substring(2, 15)}
            type={props.type ? (props.type === "password" ? "text" : props.type) : "text"}
            name={"protected-" + props.name}
            defaultValue={props.defaultValue}
            value={props.value}
            placeholder={props.placeholder}
            required={props.required}
            disabled={props.disabled}
            className={`${inputStyles} ${props.inputClassName} ${props.type && props.type === "password" ? (isPasswordShown ? "" : "password-format") : ""}`}
            onChange={props.delayOnChange ? handleNonAutoFillOnChange : props.onChange}
            onKeyDown={props.delayOnChange ? handleKeyDownWhenDelayOnChange : props.onKeyDown}
            onBlur={props.onBlur}
            onFocus={props.onFocus}
            suppressHydrationWarning
          />
        </>
      )}
      {props.type === "password" && (
        <button
          type="button"
          className={`absolute transition-all duration-300 ${props.isError ? "right-10" : "right-2"}`}
          onClick={() => setIsPasswordShown(!isPasswordShown)}
        >
          {isPasswordShown ? <EyeIcon /> : <EyeOffIcon />}
        </button>
      )}
      <span
        className={`text-red-500 text-sm absolute right-2 transition-all duration-500 ${props.isError ? "scale-100" : "scale-0"}`}
      >
        <TriangleAlertIcon />
      </span>
    </div>
  );
};

export default Input;
