import React from "react";
import Checkbox from "@/shared/components/Atoms/Checkbox/Checkbox";
import { UserFormProps } from "@/shared/types/components-type/user-form-type";
import TabNavigation from "./TabNavigation";
import UserInfoTab from "./UserInfoTab";

const UserForm = (props: Partial<UserFormProps>) => {
  const RolesTab = (props: Partial<UserFormProps>) => {
    return (
      <div className="flex gap-10 w-full mt-4">
        <div className="flex items-center gap-2">
          <Checkbox
            name="admin"
            id="admin"
            checked={props.user?.roles?.includes("admin")}
            onChange={(e) => props.handleChange?.(e as React.ChangeEvent<HTMLInputElement>)}
            className="w-4 h-4"
            label="user-management:roles.admin"
          />
        </div>
        <div className="flex items-center gap-2">
          <Checkbox
            name="user"
            id="user"
            checked={props.user?.roles?.includes("user")}
            onChange={(e) => props.handleChange?.(e as React.ChangeEvent<HTMLInputElement>)}
            className="w-4 h-4"
            label="user-management:roles.user"
          />
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col items-center w-full mt-5">
      <div className="flex flex-col items-center justify-center gap-4 w-full px-5">
        <div className="flex flex-col w-full">
          <TabNavigation activeTab={props.activeTab} setActiveTab={props.setActiveTab} />

          {props.activeTab === "userInfo" && (
            <UserInfoTab
              user={props.user}
              errors={props.errors}
              hidePassword={props.hidePassword}
              handleChange={props.handleChange}
            />
          )}

          {props.activeTab === "roles" && <RolesTab user={props.user} handleChange={props.handleChange} />}
        </div>
      </div>
    </div>
  );
};

export default UserForm;
