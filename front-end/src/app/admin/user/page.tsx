"use client";

import React, { useState } from "react";
import List from "@/shared/components/Molecules/List/List";
import { User } from "./types/user-type";
import { UserCreate } from "./types/user-type";
import MainLayout from "@/shared/components/MainLayout/MainLayout";
import CreateUserForm from "./components/CreateUserForm";
import userValidators from "./utils/user-validator";
import DeleteUserForm from "./components/DeleteUserForm";

export default function UserPage() {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [user, setUser] = useState<UserCreate>({
    username: "",
    email: "",
    password: "",
    phoneNumber: "",
    roles: [],
  });

  const resetForm = () => {
    setUser({
      username: "",
      email: "",
      password: "",
      phoneNumber: "",
      roles: [],
    });
    setErrors({});
  };

  const validateField = (name: string, value: string): string | null => {
    switch (name) {
      case "username":
        return userValidators.username(value);
      case "email":
        return userValidators.email(value);
      case "password":
        return userValidators.password(value);
      case "phoneNumber":
        return userValidators.phoneNumber(value);
      default:
        return null;
    }
  };

  const handleChangeCreate = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value, type, checked } = e.target;
    setErrors((prev) => ({ ...prev, [name]: "" })); // Clear error when user types

    if (type === "checkbox") {
      const roles = [...(user.roles || [])];
      if (checked) {
        roles.push(name);
      } else {
        const index = roles.indexOf(name);
        if (index > -1) {
          roles.splice(index, 1);
        }
      }
      setUser((prev) => ({ ...prev, roles }));
    } else {
      setUser((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleBlurCreate = (e: React.FocusEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    const error = validateField(name, value);
    if (error) {
      setErrors((prev) => ({
        ...prev,
        [name]: error,
      }));
    }
  };

  const validateFormCreate = (): boolean => {
    const newErrors: Record<string, string> = {};
    let isValid = true;

    // Validate all fields
    Object.entries(user).forEach(([key, value]) => {
      if (key !== "roles") {
        const error = validateField(key, value as string);
        if (error) {
          newErrors[key] = error;
          isValid = false;
        }
      }
    });

    setErrors(newErrors);
    return isValid;
  };

  return (
    <MainLayout title="user-management:title.user-management-title" maxWidthPercentage={80}>
      <List<User>
        typeString="User"
        insertForm={
          <CreateUserForm
            user={user}
            errors={errors}
            handleChange={handleChangeCreate}
            handleBlur={handleBlurCreate}
            validateForm={validateFormCreate}
          />
        }
        insertFormClassName="!w-1/3"
        insertFormTitle="user-management:create-new-user"
        insertResetForm={resetForm}
        deleteForm={<DeleteUserForm />}
        deleteFormClassName="!w-1/4 !h-1/4"
      />
    </MainLayout>
  );
}
