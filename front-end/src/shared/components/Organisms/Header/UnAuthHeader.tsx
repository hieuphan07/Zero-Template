"use client";

import { Languages, Moon } from "lucide-react";
import Button from "../../Atoms/Button/Button";
import i18n from "@/shared/utils/functions/multilingual/i18n";
import ButtonWithDropDown from "../../Atoms/Button/ButtonWithDropDown";
import Label from "../../Atoms/Label/Label";
import { useState, useEffect } from "react";
import { useLanguage } from "@/shared/hooks/useLanguage";

const Header = () => {
  const { changeLanguage } = useLanguage();

  const [currentLanguage, setCurrentLanguage] = useState(i18n.language);

  useEffect(() => {
    setCurrentLanguage(i18n.language);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [i18n.language]);

  const LanguageChange = () => {
    return (
      <div className="flex flex-col gap-0 rounded-lg">
        <Label
          text="English"
          inheritedClass={true}
          className={`${currentLanguage === "en" ? "bg-primary" : "hover:bg-primary"} p-2 z-[51] transition-all duration-300 rounded-t-md rounded-none whitespace-nowrap`}
          onClick={() => changeLanguage("en")}
        />
        <Label
          text="Tiếng Việt"
          inheritedClass={true}
          className={`${currentLanguage === "vi" ? "bg-primary" : "hover:bg-primary"} p-2 z-[51] transition-all duration-300 rounded-b-md whitespace-nowrap`}
          onClick={() => changeLanguage("vi")}
        />
      </div>
    );
  };
  return (
    <header className="flex sticky right-0 top-0 justify-between w-full z-10">
      <div />
      <div className="flex justify-evenly w-fit h-fit mt-2 mr-5 gap-2">
        <ButtonWithDropDown
          action={() => {}}
          text=""
          mainColor="secondary"
          contextColor="primary"
          iconBefore={<Languages size={20} />}
          dropdownContent={<LanguageChange />}
          isTransparent={true}
          border={false}
        />
        <Button
          action={() => {}}
          text=""
          mainColor="secondary"
          contextColor="primary"
          iconBefore={<Moon size={20} />}
          isTransparent={true}
          border={false}
        />
      </div>
    </header>
  );
};

export default Header;
