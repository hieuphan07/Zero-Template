"use client";

import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import Notification from "../components/Atoms/Notification/Notification";
import {
  NotificationAdditionalTimeoutTriggerType,
  NotificationProps,
} from "@/shared/types/components-type/notification-type";
import { cn } from "@/lib/utils";

type NotificationContextType = {
  notification: NotificationProps[];
  showNotification: (config: NotificationProps[] | NotificationProps) => void;
  hideAllNotification: () => void;
};

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const NotificationProvider = ({ children }: { children: ReactNode }) => {
  const [notification, setNotification] = useState<NotificationProps[]>([]);
  const [additionalTimeoutTrigger, setAdditionalTimeoutTrigger] = useState<NotificationAdditionalTimeoutTriggerType>({
    time: 0,
    check: true,
  });

  const showNotification = (config: NotificationProps[] | NotificationProps) => {
    if (Array.isArray(config)) {
      let delay = 0; // Initial delay
      // Add each notification one by one with a delay
      config.forEach((item) => {
        if (!item.id) {
          item.id = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
        }

        setTimeout(() => {
          setNotification((prev) => [...prev, { ...item, appearAt: new Date().toISOString() }]);
        }, delay);

        // Increment delay for the next notification (e.g., 500ms per notification)
        delay += 500;
      });
      setAdditionalTimeoutTrigger({ time: delay, check: !additionalTimeoutTrigger.check });
    } else {
      if (!config.id) {
        config.id = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
      }
      setNotification([...(notification || []), { ...config, appearAt: new Date().toISOString() }]);
      setAdditionalTimeoutTrigger({ time: 0, check: !additionalTimeoutTrigger.check });
    }
  };

  useEffect(() => {
    const hideTimeout = setTimeout(() => {
      hideAllNotification();
    }, 5500 + additionalTimeoutTrigger.time);

    return () => {
      clearTimeout(hideTimeout);
    };
  }, [additionalTimeoutTrigger]);

  const hideAllNotification = () => {
    setNotification([]);
  };

  const positionStyle = {
    center: cn("flex flex-col items-center justify-center gap-2"),
    "top-right": cn("flex flex-col items-end justify-start pt-2 pr-2 gap-2"),
    "top-left": cn("flex flex-col items-start justify-start pt-2 pl-2 gap-2"),
    "bottom-right": cn("flex flex-col items-end justify-end pb-2 pr-2 gap-2"),
    "bottom-left": cn("flex flex-col items-start justify-end pb-2 pl-2 gap-2"),
  };

  const enableOtherMainDivStyle = {
    center: cn("top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%]"),
    "top-right": cn("top-0 right-0"),
    "top-left": cn("top-0 left-0"),
    "bottom-right": cn("bottom-0 right-0"),
    "bottom-left": cn("bottom-0 left-0"),
  };

  const enableOtherElements = () => {
    return notification?.length > 0 ? notification.filter((e) => e.enableOtherElements).length > 0 : true;
  };

  const mainDivPosition = () => {
    if (notification && notification.length > 0) {
      for (let i = 0; i < notification.length; i++) {
        if (new Date().getTime() - new Date(notification[i].appearAt || "").getTime() <= 5500) {
          return notification[i].position || "center";
        }
      }
    }
    return "center";
  };

  return (
    <NotificationContext.Provider value={{ notification, showNotification, hideAllNotification }}>
      {children}
      <div
        className={`fixed bg-black bg-opacity-50 
          ${
            enableOtherElements()
              ? `h-[0px] w-[0px] border-primary bg-transparent 
            ${enableOtherMainDivStyle[mainDivPosition() || "center"]}`
              : "h-screen w-screen top-0 left-0"
          } 
          ${positionStyle[mainDivPosition() || "center"]} z-[55]`}
      >
        {notification && mainDivPosition().includes("bottom")
          ? notification
              .sort((a, b) => (new Date(a.appearAt || "") > new Date(b.appearAt || "") ? -1 : 1))
              .map((notification) => <Notification key={notification.id} {...notification} />)
          : notification
              .sort((a, b) => (new Date(a.appearAt || "") > new Date(b.appearAt || "") ? 1 : -1))
              .map((notification) => <Notification key={notification.id} {...notification} />)}
      </div>
    </NotificationContext.Provider>
  );
};

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error("useNotification must be used within a NotificationProvider");
  }
  return context;
};
