"use client";

import Header from "../Organisms/Header/Header";
import Footer from "../Organisms/Footer/Footer";
import SectionWrapper from "../Organisms/SectionWrapper/SectionWrapper";
import { MainLayoutProps } from "../../types/main-layout-type";
import SideMenu from "../Organisms/SideMenu/SideMenu";
import { useState } from "react";

const MainLayout = ({ children }: MainLayoutProps) => {
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);

  return (
    <>
      <Header />
      <SideMenu isOpen={isSideMenuOpen} onToggle={(open: boolean) => setIsSideMenuOpen(open)} />
      <SectionWrapper
        className={
          isSideMenuOpen
            ? "w-[87.5vw] ml-[12.5vw] transition-all duration-500"
            : "w-[100vw] ml-[0vw] transition-all duration-500"
        }
      >
        {children}
      </SectionWrapper>
      <Footer />
    </>
  );
};

export default MainLayout;
