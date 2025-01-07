"use client";

import { cn } from "@/lib/utils";
import { ButtonProps } from "../../../types/components-type/button-type";
import Label from "../Label/Label";
import { useTranslation } from "next-i18next";

const Button = (props: ButtonProps) => {
  const { t } = useTranslation();
  const baseStyles =
    "inline-flex items-center justify-center rounded-md font-medium transition-colors transition-all duration-500 focus:outline-none w-full font-bold sm:w-auto text-sm sm:text-base px-2 py-2 sm:px-3 sm:py-3 ";

  const variants = {
    solid: cn(
      `bg-${props.mainColor}`,
      props.manualHover ? "" : !props.disabled ? "hover:bg-transparent" : "",
      props.contextColor
        ? props.contextColor !== "default"
          ? `text-${props.contextColor}-foreground ${props.manualHover ? "" : !props.disabled ? `hover:text-${props.contextColor}` : ""}`
          : `text-white ${props.manualHover ? "" : !props.disabled ? `hover:text-${props.mainColor}` : ""}`
        : props.mainColor
          ? props.mainColor !== "default"
            ? `text-${props.mainColor}-foreground ${props.manualHover ? "" : !props.disabled ? `hover:text-${props.mainColor}` : ""}`
            : `text-white ${props.manualHover ? "" : !props.disabled ? `hover:text-${props.mainColor}` : ""}`
          : `text-white ${props.manualHover ? "" : !props.disabled ? `hover:text-primary` : ""}`,
      props.border && `border border-${props.mainColor}`,
    ),
    transparent: cn(
      "bg-transparent",
      props.manualHover ? "" : !props.disabled ? `hover:bg-${props.mainColor}` : "",
      props.contextColor
        ? props.contextColor !== "default"
          ? `text-${props.contextColor}-foreground ${props.manualHover ? "" : !props.disabled ? `hover:text-${props.contextColor}` : ""}`
          : `text-primary ${props.manualHover ? "" : !props.disabled ? "hover:text-white" : ""}`
        : props.mainColor
          ? props.mainColor !== "default"
            ? `text-${props.mainColor}-foreground ${props.manualHover ? "" : !props.disabled ? `hover:text-${props.mainColor}` : ""}`
            : `text-primary ${props.manualHover ? "" : !props.disabled ? `hover:text-${props.mainColor}` : ""}`
          : `text-primary ${props.manualHover ? "" : !props.disabled ? `hover:text-white` : ""}`,
      props.border && `border border-${props.mainColor}`,
    ),
  };

  const disabledStyles = "opacity-50 cursor-not-allowed";

  const ClickAction = () => {
    if (props.rippleEffect) {
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
      type={props.type ? props.type : "button"}
      onMouseEnter={props.onMouseEnter}
      onMouseLeave={props.onMouseLeave}
      suppressHydrationWarning
    >
      {props.iconBefore && <span className="">{props.iconBefore}</span>}
      {props.text && <Label text={props.text} translate={true} t={t} inheritedClass={true} />}
      {props.iconAfter && <span className="">{props.iconAfter}</span>}
    </button>
  );
};

export default Button;
