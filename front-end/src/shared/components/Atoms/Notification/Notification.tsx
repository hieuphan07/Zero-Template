"use client";

import { useRef, useEffect } from "react";
import Button from "@/shared/components/Atoms/Button/Button";
import { Check, CircleX, InfoIcon, TriangleAlertIcon, XIcon } from "lucide-react";
import Label from "../../Atoms/Label/Label";
import { NotificationProps } from "@/shared/types/components-type/notification-type";
import { cn } from "@/lib/utils";

const Notification = (props: NotificationProps) => {
  const contextRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!props.closeOnClick) return;
      if (contextRef.current && event.target) {
        const formZIndex = window.getComputedStyle(contextRef.current).zIndex;
        const targetZIndex = window.getComputedStyle(event.target as HTMLElement).zIndex;
        if (formZIndex < targetZIndex) {
          return;
        }
        if (!contextRef.current.contains(event.target as Node)) {
          closeNotification();
        }
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const popup = contextRef.current;

    if (popup) {
      timeoutRef.current = setTimeout(() => {
        closeNotification();
      }, 5000);
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const closeNotification = () => {
    if (contextRef.current) {
      contextRef.current.classList.add(outAnimationStyle[props.position || "center"]);
    }
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setTimeout(() => {
      if (contextRef.current) {
        contextRef.current.classList.add("!hidden");
      }
    }, 500);
  };

  const inAnimationStyle = {
    center: cn("animate-slideDown"),
    "top-right": cn("animate-slideLeft"),
    "top-left": cn("animate-slideRight"),
    "bottom-right": cn("animate-slideLeft"),
    "bottom-left": cn("animate-slideRight"),
  };

  const outAnimationStyle = {
    center: cn("animate-slideUpOut"),
    "top-right": cn("animate-slideRightOut"),
    "top-left": cn("animate-slideLeftOut"),
    "bottom-right": cn("animate-slideRightOut"),
    "bottom-left": cn("animate-slideLeftOut"),
  };

  const iconByColor = {
    primary: <></>,
    secondary: <></>,
    warning: <TriangleAlertIcon className="text-warning" />,
    success: <Check className="text-success" />,
    danger: <CircleX className="text-danger" />,
    info: <InfoIcon className="text-info" />,
    light: <></>,
    dark: <></>,
    default: <></>,
  };

  return (
    <div
      ref={contextRef}
      className={`relative bg-${props.color || "primary"}-500 rounded-lg min-w-[20vw] max-w-[40vw] transition-all duration-500 shadow-sm border-[1px] border-${props.color || "primary"} w-fit ${inAnimationStyle[props.position || "center"]} ${props.className}`}
    >
      <div className="relative p-4 pb-2">
        {props.title && (
          <div
            className={`flex justify-center items-center gap-2 w-full text-2xl font-bold mb-4 underline underline-offset-1 text-${props.color || "primary"}-foreground500`}
          >
            {props.color && iconByColor[props.color]}
            <Label
              text={props.title ? props.title : "common:text.notification"}
              className={""}
              inheritedClass
              translate
            />
            {props.color && iconByColor[props.color]}
          </div>
        )}
        <Button
          text=""
          iconBefore={<XIcon />}
          action={() => {
            closeNotification();
          }}
          mainColor="default"
          contextColor="primary"
          className="!w-auto absolute top-0 right-0"
          isTransparent={true}
        />
        <div
          className={`mt-4 w-full h-full flex justify-center items-center min-h-[50px] text-${props.color || "primary"}-foreground500 ${props.contentClassName}`}
        >
          {props.content}
        </div>
        <div className="flex justify-end mt-6">
          {props.confirmButton && (
            <Button
              text="Confirm"
              action={() => {
                closeNotification();
              }}
              mainColor="primary"
              contextColor="default"
              isTransparent={true}
              border={true}
            />
          )}
        </div>
      </div>
      <div className="w-full bg-gray-200 h-1 absolute bottom-0 rounded-full overflow-hidden">
        <div className={`h-full bg-${props.color || "primary"} progress-5-seconds rounded-full`} />
      </div>
    </div>
  );
};

export default Notification;
