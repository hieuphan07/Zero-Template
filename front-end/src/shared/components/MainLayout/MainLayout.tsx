"use client";

import Header from "../Organisms/Header/Header";
import Footer from "../Organisms/Footer/Footer";
import SectionWrapper from "../Organisms/SectionWrapper/SectionWrapper";
import { MainLayoutProps } from "@/shared/types/components-type/main-layout-type";
import SideMenu from "../Organisms/SideMenu/SideMenu";
import { useEffect, useState } from "react";
import { appWithTranslation } from "next-i18next";
import { useTranslation } from "react-i18next";
import { NotificationProvider } from "@/shared/hooks/useNotification";
import { authProvider } from "@/shared/utils/functions/middleware/auth-provider";
import { LanguageProvider } from "@/shared/hooks/useLanguage";

const MainLayout = (props: MainLayoutProps) => {
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);
  const { i18n } = useTranslation();

  useEffect(() => {
    authProvider.checkAuth();
  }, []);

  return (
    <>
      <LanguageProvider>
        <NotificationProvider>
          <Header breadcrumbs={true} isSideMenuOpen={isSideMenuOpen} />
          <SideMenu isOpen={isSideMenuOpen} onToggle={(open: boolean) => setIsSideMenuOpen(open)} />
          <SectionWrapper
            className={
              isSideMenuOpen
                ? "max-w-[87.5vw] ml-[12.5vw] transition-all duration-500 mt-5"
                : "max-w-[100vw] ml-[0vw] transition-all duration-500 mt-5"
            }
            maxWidthPercentage={
              isSideMenuOpen && props.maxWidthPercentage
                ? (props.maxWidthPercentage * 100) / 87.5
                : props.maxWidthPercentage
            }
            title={i18n.t(props.title || "")}
            titleColor={props.titleColor}
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
export default appWithTranslation(MainLayout as any);
