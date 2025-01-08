"use client";

import { useRef, useEffect } from "react";
import Button from "@/shared/components/Atoms/Button/Button";
import { XIcon } from "lucide-react";
import Label from "../../Atoms/Label/Label";
import { NotificationProps } from "@/shared/types/components-type/notification-type";
import { useNotification } from "@/shared/hooks/useNotification";

const Notification = (props: NotificationProps) => {
  const popupRef = useRef<HTMLDivElement>(null);
  const contextRef = useRef<HTMLDivElement>(null);
  const { hideNotification } = useNotification();
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
        closeNotification();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const popup = popupRef.current;

    if (popup) {
      document.body.appendChild(popup);
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
      contextRef.current.classList.add("animate-slideUp");
    }
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setTimeout(() => {
      hideNotification();
    }, 500);
  };

  return (
    <div
      ref={popupRef}
      className="fixed top-0 left-0 h-screen w-screen bg-black bg-opacity-50 flex items-center justify-center z-50"
    >
      <div
        ref={contextRef}
        className={`relative bg-background overflow-hidden rounded-lg min-w-[30%] max-w-[60vw] w-fit animate-slideDown ${props.className}`}
      >
        <div className="relative p-6 pb-2">
          {props.title && (
            <Label
              text={props.title}
              className="flex justify-center w-full text-2xl font-bold mb-4 underline underline-offset-1"
              inheritedClass
            />
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
          <div className="mt-4 w-full h-full flex justify-center items-center min-h-[100px]">
            <Label text={props.text} className="" inheritedClass />
          </div>
          <div className="flex justify-end mt-6">
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
          </div>
        </div>
        <div className="w-full bg-gray-200 h-1 absolute bottom-0 rounded-full overflow-hidden">
          <div className="h-full bg-primary progress-5-seconds rounded-full" />
        </div>
      </div>
    </div>
  );
};

export default Notification;
