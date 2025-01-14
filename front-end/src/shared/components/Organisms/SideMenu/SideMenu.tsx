"use client";

import { Fragment, useState } from "react";
import Image from "next/image";
import SearchBar from "@/shared/components/Molecules/SearchBar/SearchBar";
import { LockIcon, SearchIcon, UnlockIcon } from "lucide-react";
import Button from "@/shared/components/Atoms/Button/Button";
import MenuTab from "../../Atoms/MenuTab/MenuTab";
import { MenuItem, SideMenuProps } from "@/shared/types/components-type/sidemenu-type";
import { menuRoutes } from "@/shared/constants/side-menu-routes";
import { useRouter } from "next/navigation";

const SideMenu = (props: SideMenuProps) => {
  const [filteredItems, setFilteredItems] = useState<MenuItem[]>(menuRoutes);
  const [locked, setLocked] = useState(false);
  const router = useRouter();
  const handleSearch = (searchTerm: string) => {
    const filtered = menuRoutes.filter((item) => item.name.toLowerCase().includes(searchTerm.toLowerCase()));
    setFilteredItems(filtered);
  };

  const lockCollapse = () => {
    if (!locked) {
      setLocked(true);
    } else {
      setLocked(false);
    }
  };

  return (
    <div className={`${!props.isOpen ? "w-[4vw]" : "w-[12.5vw]"} relative transition-all duration-300`}>
      <div
        className={`${!props.isOpen ? "w-[4vw]" : "w-[12.5vw]"} gap-4 fixed h-screen top-0 bg-black flex flex-col shadow-lg p-4 transition-all duration-300 z-30`}
        onMouseEnter={() => {
          if (!locked) {
            props.onToggle(true);
          }
        }}
        onMouseLeave={() => {
          if (!locked) {
            props.onToggle(false);
          }
        }}
      >
        {props.isOpen ? (
          <div className="flex flex-col gap-4">
            <div className="flex justify-center items-center bg-white rounded-lg px-1 overflow-hidden">
              <Image
                src="/logo.webp"
                alt="logo"
                className="w-full min-h-[2vw] h-[2vw] object-cover object-left"
                width={100000}
                height={100000}
                onClick={() => router.push("/")}
              />
            </div>
            <SearchBar
              onSearch={handleSearch}
              placeholder="Search menu..."
              inputMainColor="primary"
              buttonMainColor="primary"
              buttonContextColor="default"
              attachToEachOther={true}
              className="!h-[2vw]"
              focusBorder={true}
              focusBorderColor="primary"
            />
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            <div className="flex justify-center items-center bg-white rounded-lg w-[2vw] aspect-square p-[0.5px]">
              <Image
                src="/icon-pasona.png"
                alt="logo"
                className="w-full aspect-square object-contain"
                width={1000000}
                height={100000}
                onClick={() => router.push("/")}
              />
            </div>
            <Button
              action={lockCollapse}
              text={""}
              mainColor={"primary"}
              contextColor={"default"}
              iconBefore={<SearchIcon size={20} />}
              className={`hover:bg-blue opacity-100 hover:opacity-80 !transition-all !duration-300 !w-[2vw] !aspect-square !p-0`}
              manualHover={true}
            />
          </div>
        )}

        <nav className={`transition-all duration-300 ml-0 ${!props.isOpen ? "flex items-center h-full" : ""}`}>
          <div
            className={`flex flex-col justify-start transition-all duration-300 ${!props.isOpen ? "gap-6 h-full" : "gap-6"}`}
          >
            {filteredItems.map((item, index) => (
              <Fragment key={index}>
                <MenuTab
                  name={item.name}
                  path={item.path}
                  color={"primary"}
                  isCollapsed={!props.isOpen}
                  className={`ml-0 ${!props.isOpen ? "ml-2" : ""}`}
                  icon={item.icon}
                >
                  {item.children}
                </MenuTab>
              </Fragment>
            ))}
          </div>
        </nav>
      </div>
      <Button
        action={lockCollapse}
        text={""}
        mainColor={"primary"}
        contextColor={"default"}
        iconBefore={locked ? <LockIcon size={20} /> : <UnlockIcon size={20} />}
        className={`-right-5 opacity-100 hover:bg-primary !absolute -top-9 !rounded-full !p-2 hover:opacity-80 !z-[31] !transition-all !duration-300 pointer-events-none}`}
        manualHover={true}
        onMouseEnter={() => {
          if (!locked && props.isOpen) {
            props.onToggle(true);
          }
        }}
        onMouseLeave={() => {
          if (!locked) {
            props.onToggle(false);
          }
        }}
      />
    </div>
  );
};

export default SideMenu;
