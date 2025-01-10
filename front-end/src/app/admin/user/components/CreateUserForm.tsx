"use client";

import React, { Fragment, useState } from "react";
import Input from "@/shared/components/Atoms/Input/Input";
import Label from "@/shared/components/Atoms/Label/Label";
import Button from "@/shared/components/Atoms/Button/Button";
import Checkbox from "@/shared/components/Atoms/Checkbox/Checkbox";
import { useTranslation } from "react-i18next";
import { CreateUserFormProps } from "@/shared/types/components-type/create-user-type";
import { useEffect } from "react";
import { useNotification } from "@/shared/hooks/useNotification";

const CreateUserForm = (props: CreateUserFormProps) => {
  const { t } = useTranslation(["common", "user-management"]);
  const [activeTab, setActiveTab] = useState("userInfo");
  const { showNotification } = useNotification();

  useEffect(() => {
    if (Object.keys(props.errors).length > 0) {
      showNotification({
        title: "user-management:notification.error",
        content: (
          <Fragment>
            <Label text="common:notification.validationError" translate t={t} />
            <ul>
              {Object.entries(props.errors).map(([key, value]) => (
                <Label key={key} text={value} translate t={t} />
              ))}
            </ul>
          </Fragment>
        ),
        position: "top-right",
        color: "danger",
        enableOtherElements: true,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.errors]);

  return (
    <div className="flex flex-col items-center w-full mt-5">
      <div className="flex flex-col items-center justify-center gap-4 w-full px-5">
        <div className="flex flex-col w-full">
          <div className="flex border-b border-gray-200">
            <Button
              action={() => setActiveTab("userInfo")}
              type="button"
              text="user-management:tabs.userInfo"
              mainColor="primary"
              contextColor="primary"
              className={`px-4 py-2 rounded-none ${activeTab === "userInfo" ? "border-b-2 border-primary text-primary" : "text-gray-500"}`}
              isTransparent
            />
            <Button
              action={() => {
                setActiveTab("roles");
              }}
              type="button"
              text="user-management:tabs.roles"
              mainColor="primary"
              contextColor="primary"
              className={`px-4 py-2 rounded-none ${activeTab === "roles" ? "border-b-2 border-primary text-primary" : "text-gray-500"}`}
              isTransparent
            />
          </div>

          {activeTab === "userInfo" && (
            <div className="flex flex-col gap-4 w-full mt-4">
              <div className="w-full">
                <Label
                  htmlFor="username"
                  translate={true}
                  t={t}
                  text="user-management:fields.username"
                  required
                  className="text-base mb-1"
                />
                <Input
                  required
                  type="text"
                  id="username"
                  name="username"
                  placeholder="JohnDoe"
                  value={props.user.username}
                  onChange={props.handleChange}
                  onBlur={props.handleBlur}
                  isError={!!props.errors.username}
                />
              </div>
              <div className="w-full">
                <Label
                  htmlFor="email"
                  translate={true}
                  t={t}
                  text="user-management:fields.email"
                  required
                  className="text-base mb-1"
                />
                <Input
                  required
                  type="email"
                  id="email"
                  name="email"
                  placeholder="john.doe@gmail.com"
                  value={props.user.email}
                  onChange={props.handleChange}
                  onBlur={props.handleBlur}
                  isError={!!props.errors.email}
                />
              </div>
              <div className="w-full">
                <Label
                  htmlFor="password"
                  translate={true}
                  t={t}
                  text="user-management:fields.password"
                  required
                  className="text-base mb-1"
                />
                <Input
                  required
                  type="password"
                  id="password"
                  name="password"
                  placeholder="********"
                  value={props.user.password}
                  onChange={props.handleChange}
                  onBlur={props.handleBlur}
                  isError={!!props.errors.password}
                />
              </div>
              <div className="w-full">
                <Label
                  htmlFor="phoneNumber"
                  translate={true}
                  t={t}
                  text="user-management:fields.phoneNumber"
                  className="text-base mb-1"
                />
                <Input
                  type="tel"
                  id="phoneNumber"
                  name="phoneNumber"
                  placeholder="+6281234567890"
                  value={props.user.phoneNumber}
                  onChange={props.handleChange}
                  onBlur={props.handleBlur}
                  isError={!!props.errors.phoneNumber}
                />
              </div>
            </div>
          )}

          {activeTab === "roles" && (
            <div className="flex gap-10 w-full mt-4">
              <div className="flex items-center gap-2">
                <Checkbox
                  name="admin"
                  id="admin"
                  checked={props.user.roles?.includes("admin")}
                  onChange={(e) => props.handleChange?.(e as React.ChangeEvent<HTMLInputElement>)}
                  className="w-4 h-4"
                  label="user-management:roles.admin"
                />
              </div>
              <div className="flex items-center gap-2">
                <Checkbox
                  name="user"
                  id="user"
                  checked={props.user.roles?.includes("user")}
                  onChange={(e) => props.handleChange?.(e as React.ChangeEvent<HTMLInputElement>)}
                  className="w-4 h-4"
                  label="user-management:roles.user"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CreateUserForm;
