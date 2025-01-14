"use client";

import { Bell, Languages, MessageCircle, Moon, Settings } from "lucide-react";
import { UserIcon } from "lucide-react";
import Button from "../../Atoms/Button/Button";
import i18n from "@/shared/utils/functions/multilingual/i18n";
import ButtonWithDropDown from "../../Atoms/Button/ButtonWithDropDown";
import Label from "../../Atoms/Label/Label";
import { useState, useEffect } from "react";
import { useNotification } from "@/shared/hooks/useNotification";
import Breadcrumbs from "../../Molecules/Breadcrumbs/Breadcrumbs";
import { HeaderProps } from "@/shared/types/components-type/header-type";
import { useLanguage } from "@/shared/hooks/useLanguage";
import { authProvider } from "@/shared/utils/functions/middleware/auth-provider";
import { useRouter } from "next/navigation";

const Header = (props: HeaderProps) => {
  const { changeLanguage } = useLanguage();
  const router = useRouter();
  const [currentLanguage, setCurrentLanguage] = useState(i18n.language);

  useEffect(() => {
    setCurrentLanguage(i18n.language);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [i18n.language]);

  const { showNotification } = useNotification();

  const onNotiClick = () => {
    showNotification({
      title: "Notification",
      content: "This is a notification",
      position: "bottom-right",
      enableOtherElements: true,
      color: "warning",
    });
  };

  const LanguageChange = () => {
    return (
      <div className="flex flex-col gap-0 rounded-lg">
        <Label
          text="common:language.en"
          inheritedClass={true}
          translate
          className={`${currentLanguage === "en" ? "bg-primary" : "hover:bg-primary"} p-2 transition-all duration-300 rounded-t-md rounded-none whitespace-nowrap`}
          onClick={() => changeLanguage("en")}
        />
        <Label
          text="common:language.vi"
          inheritedClass={true}
          translate
          className={`${currentLanguage === "vi" ? "bg-primary" : "hover:bg-primary"} p-2 transition-all duration-300 rounded-b-md whitespace-nowrap`}
          onClick={() => changeLanguage("vi")}
        />
      </div>
    );
  };

  const UserDropdown = () => {
    return (
      <div className="flex flex-col gap-0 rounded-lg">
        <Label
          text="common:text.logout"
          inheritedClass={true}
          translate
          className={`p-2 transition-all duration-300 rounded-t-md rounded-none whitespace-nowrap`}
          onClick={() => {
            authProvider.setToken("");
            showNotification({
              title: "common:text.logout",
              content: <Label text="common:message.logout-success" translate />,
              position: "top-right",
              color: "success",
              enableOtherElements: true,
            });
            setTimeout(() => {
              router.push("/auth");
            }, 2000);
          }}
        />
      </div>
    );
  };
  return (
    <header className="flex sticky right-0 top-0 justify-between w-full z-10 h-[5vh]">
      <div
        className={`flex justify-start items-center transition-all duration-500 ${!props.isSideMenuOpen ? "ml-[10vw]" : "ml-[16.5vw]"}`}
      >
        {props.breadcrumbs && <Breadcrumbs />}
      </div>
      <div className="flex justify-evenly w-fit h-fit mt-2 mr-5 gap-2">
        <Button
          action={() => {}}
          text=""
          mainColor="secondary"
          contextColor="primary"
          iconBefore={<Settings size={20} />}
          isTransparent={true}
          border={false}
        />
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
          action={() => {
            onNotiClick();
          }}
          text=""
          mainColor="secondary"
          contextColor="primary"
          iconBefore={<Bell size={20} />}
          isTransparent={true}
          border={false}
        />
        <Button
          action={() => {}}
          text=""
          mainColor="secondary"
          contextColor="primary"
          iconBefore={<MessageCircle size={20} />}
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
        <ButtonWithDropDown
          action={() => {}}
          text=""
          mainColor="secondary"
          contextColor="primary"
          iconBefore={<UserIcon size={20} />}
          dropdownContent={<UserDropdown />}
          isTransparent={true}
          border={false}
          dropdownAlignment="right"
        />
      </div>
    </header>
  );
};

export default Header;
