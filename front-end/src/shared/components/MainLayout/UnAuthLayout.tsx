"use client";

import Footer from "../Organisms/Footer/Footer";
import SectionWrapper from "../Organisms/SectionWrapper/SectionWrapper";
import { MainLayoutProps } from "@/shared/types/components-type/main-layout-type";
import { appWithTranslation } from "next-i18next";
import { NotificationProvider } from "@/shared/hooks/useNotification";
import UnAuthHeader from "../Organisms/Header/UnAuthHeader";
import { LanguageProvider } from "@/shared/hooks/useLanguage";

const UnAuthLayout = (props: MainLayoutProps) => {
  return (
    <>
      <LanguageProvider>
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
      </LanguageProvider>
    </>
  );
};

// eslint-disable-next-line
export default appWithTranslation(UnAuthLayout as any);
