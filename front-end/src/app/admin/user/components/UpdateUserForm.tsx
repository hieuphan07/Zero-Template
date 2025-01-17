"use client";

import React, { useState } from "react";
import UserForm from "./shared/UserForm";
import { UserFormProps } from "@/shared/types/components-type/user-form-type";

const UpdateUserForm = (props: Partial<UserFormProps> & { 
  id?: string,
  userData?: UserFormProps["user"] 
}) => {
  const [activeTab, setActiveTab] = useState("userInfo");

  return (
    <UserForm
      activeTab={activeTab}
      setActiveTab={setActiveTab}
      errors={props.errors}
      hidePassword={false}
      user={props.userData}
    />
  );
};

export default UpdateUserForm;
