"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import Notification from "../components/Atoms/Notification/Notification";
import { NotificationProps } from "@/shared/types/components-type/notification-type";

type NotificationContextType = {
  showNotification: (config: NotificationProps) => void;
  hideNotification: () => void;
};

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const NotificationProvider = ({ children }: { children: ReactNode }) => {
  const [notification, setNotification] = useState<NotificationProps | null>(null);

  const showNotification = (config: NotificationProps) => {
    setNotification(config);
  };

  const hideNotification = () => {
    setNotification(null);
  };

  return (
    <NotificationContext.Provider value={{ showNotification, hideNotification }}>
      {children}
      {notification && (
        <Notification title={notification.title} text={notification.text} className={notification.className} />
      )}
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
