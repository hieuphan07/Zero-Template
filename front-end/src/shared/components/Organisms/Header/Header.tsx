"use client";

import { Bell, Languages, MessageCircle, Moon, Settings } from "lucide-react";
import { UserIcon } from "lucide-react";
import Button from "../../Atoms/Button/Button";

const Header = () => {
  return (
    <header className="flex sticky right-0 top-0 justify-between w-full">
      <div />
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
        <Button
          action={() => {}}
          text=""
          mainColor="secondary"
          contextColor="primary"
          iconBefore={<Languages size={20} />}
          isTransparent={true}
          border={false}
        />
        <Button
          action={() => {}}
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
        <Button
          action={() => {}}
          text=""
          mainColor="secondary"
          contextColor="primary"
          iconBefore={<UserIcon size={20} />}
          isTransparent={true}
          border={false}
        />
      </div>
    </header>
  );
};

export default Header;
