"use client";

import Header from "../Organisms/Header/Header";
import Footer from "../Organisms/Footer/Footer";
import SectionWrapper from "../Organisms/SectionWrapper/SectionWrapper";
import { MainLayoutProps } from "@/shared/types/components-type/main-layout-type";
import SideMenu from "../Organisms/SideMenu/SideMenu";
import { useState } from "react";

const MainLayout = (props: MainLayoutProps) => {
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);

  return (
    <>
      <Header />
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
        title={props.title}
        titleColor={props.titleColor}
      >
        {props.children}
      </SectionWrapper>
      <Footer />
    </>
  );
};

export default MainLayout;
