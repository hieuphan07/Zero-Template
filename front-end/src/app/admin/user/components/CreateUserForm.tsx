"use client";

import React, { useState, useEffect } from "react";
import UserForm from "./shared/UserForm";
import { UserFormProps } from "@/shared/types/components-type/user-form-type";

const CreateUserForm = (props: Partial<UserFormProps>) => {
  const [activeTab, setActiveTab] = useState("userInfo");

  useEffect(() => {
    setActiveTab("userInfo");
  }, []);

  return <UserForm activeTab={activeTab} setActiveTab={setActiveTab} errors={props.errors} />;
};

export default CreateUserForm;
