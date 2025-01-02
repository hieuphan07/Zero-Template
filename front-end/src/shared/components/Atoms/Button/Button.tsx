"use client";

import { cn } from "@/lib/utils";
import { ButtonProps } from "../../../types/components-type/button-type";

const Button = (props: ButtonProps) => {
  const baseStyles =
    "inline-flex items-center justify-center rounded-md font-medium transition-colors transition-all duration-500 focus:outline-none w-full font-bold sm:w-auto text-sm sm:text-base px-2 py-2 sm:px-3 sm:py-3 ";

  const variants = {
    solid: cn(
      `bg-${props.mainColor}`,
      props.manualHover ? "" : "hover:bg-transparent",
      props.contextColor
        ? props.contextColor !== "default"
          ? `text-${props.contextColor}-foreground ${props.manualHover ? "" : "hover:text-primary"}`
          : `text-white ${props.manualHover ? "" : "hover:text-primary"}`
        : props.mainColor
          ? props.mainColor !== "default"
            ? `text-${props.mainColor}-foreground ${props.manualHover ? "" : `hover:text-${props.mainColor}`}`
            : `text-white ${props.manualHover ? "" : "hover:text-primary"}`
          : `text-white ${props.manualHover ? "" : "hover:text-primary"}`,
      props.border && `border border-${props.mainColor}`,
    ),
    transparent: cn(
      "bg-transparent",
      props.manualHover ? "" : `hover:bg-${props.mainColor}`,
      props.contextColor
        ? props.contextColor !== "default"
          ? `text-${props.contextColor}-foreground ${props.manualHover ? "" : "hover:text-primary"}`
          : `text-primary ${props.manualHover ? "" : "hover:text-white"}`
        : props.mainColor
          ? props.mainColor !== "default"
            ? `text-${props.mainColor}-foreground ${props.manualHover ? "" : "hover:text-primary"}`
            : `text-primary ${props.manualHover ? "" : "hover:text-white"}`
          : `text-primary ${props.manualHover ? "" : "hover:text-white"}`,
      props.border && `border border-${props.mainColor}`,
    ),
  };

  const disabledStyles = "opacity-50 cursor-not-allowed";

  const ClickAction = () => {
    const button = document.activeElement as HTMLButtonElement;
    if (button) {
      const rect = button.getBoundingClientRect();
      const x = (event as MouseEvent).clientX - rect.left;
      const y = (event as MouseEvent).clientY - rect.top;

      const ripple = document.createElement("span");
      ripple.style.position = "absolute";
      ripple.style.left = `${x}px`;
      ripple.style.top = `${y}px`;
      ripple.style.transform = "translate(-50%, -50%)";
      ripple.style.width = "0";
      ripple.style.height = "0";
      ripple.style.borderRadius = "50%";
      ripple.style.backgroundColor = "rgba(128, 128, 128, 0.3)";
      ripple.style.animation = "ripple 0.6s linear";
      ripple.style.transition = "width 0.3s, height 0.3s";
      ripple.style.animationDuration = "0.3s";

      button.style.position = "relative";
      button.style.overflow = "hidden";
      button.appendChild(ripple);
      setTimeout(() => {
        ripple.style.width = "100px";
        ripple.style.height = "100px";
      }, 300);
      setTimeout(() => {
        ripple.remove();
      }, 600);
    }
    props.action();
  };

  return (
    <button
      onClick={props.disabled ? () => {} : ClickAction}
      disabled={props.disabled}
      className={`
        ${baseStyles}
        ${props.isTransparent ? variants.transparent : variants.solid}
        ${props.disabled ? disabledStyles : ""}
        ${props.className || ""}
      `}
      onMouseEnter={props.onMouseEnter}
      onMouseLeave={props.onMouseLeave}
    >
      {props.iconBefore && <span className="">{props.iconBefore}</span>}
      {props.text && <span className="">{props.text}</span>}
      {props.iconAfter && <span className="">{props.iconAfter}</span>}
    </button>
  );
};

export default Button;
