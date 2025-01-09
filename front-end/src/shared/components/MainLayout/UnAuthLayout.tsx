"use client";

import Footer from "../Organisms/Footer/Footer";
import SectionWrapper from "../Organisms/SectionWrapper/SectionWrapper";
import { MainLayoutProps } from "@/shared/types/components-type/main-layout-type";
import { useEffect } from "react";
import { appWithTranslation } from "next-i18next";
import { useTranslation } from "react-i18next";
import { NotificationProvider } from "@/shared/hooks/useNotification";
import UnAuthHeader from "../Organisms/Header/UnAuthHeader";

const UnAuthLayout = (props: MainLayoutProps) => {
  const { i18n } = useTranslation();

  useEffect(() => {
    const defaultLanguage = i18n?.options?.fallbackLng || i18n?.language || "en";
    if (i18n && typeof i18n.changeLanguage === "function") {
      i18n.changeLanguage(defaultLanguage as string);
    }
  }, [i18n]);

  return (
    <>
      <NotificationProvider>
        <UnAuthHeader />
        <SectionWrapper
          className={`max-w-[100vw] ml-[0vw] transition-all duration-500 mt-5 ${props.className}`}
          maxWidthPercentage={props.maxWidthPercentage}
          title={props.title}
          titleColor={props.titleColor}
          containerClassName={props.containerClassName}
        >
          {props.children}
        </SectionWrapper>
        <Footer />
      </NotificationProvider>
    </>
  );
};

// eslint-disable-next-line
export default appWithTranslation(UnAuthLayout as any);
