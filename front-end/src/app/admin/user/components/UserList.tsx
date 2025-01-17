import React, { useState } from "react";
import { TUser } from "../types/user-type";
import List from "@/shared/components/Molecules/List/List";
import { useNotification } from "@/shared/hooks/useNotification";
import { useTranslation } from "react-i18next";
import userValidators from "../utils/user-validator";
import CreateUserForm from "./CreateUserForm";
import UpdateUserForm from "./UpdateUserForm";
import DeleteUserForm from "./DeleteUserForm";
import Label from "@/shared/components/Atoms/Label/Label";

export default function UserList() {
  const { showNotification } = useNotification();
  const { t } = useTranslation();
  const [errors, setErrors] = useState<Record<string, string>>({});

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

  const validateData = (formData: Partial<TUser>, validatePassword: boolean = true): boolean => {
    const errors: Record<string, string> = {};
    Object.keys(formData).forEach((key: string) => {
      if (key === "password" && formData.password === "" && !validatePassword) {
        return;
      }
      const error = validateField(key, formData[key as keyof typeof formData] as string);
      if (error) {
        errors[key] = error;
        setErrors(errors);
      }
    });

    if (Object.keys(errors).length > 0) {
      showNotification({
        title: "user-management:notification.error",
        content: (
          <div className="flex flex-col justify-start items-start text-start">
            {Object.entries(errors).map(([key, value]) => (
              <Label key={key} text={value} translate t={t} />
            ))}
          </div>
        ),
        position: "top-right",
        color: "danger",
        enableOtherElements: true,
      });
    }
    return Object.keys(errors).length === 0;
  };

  return (
    <List<TUser>
      typeString="User"
      insertForm={<CreateUserForm errors={errors} />}
      insertFormClassName="!w-1/3"
      insertFormTitle="user-management:create-new-user"
      insertValidation={validateData}
      resetErrors={() => setErrors({})}
      updateForm={(id: string, refetch, userData) => (
        <UpdateUserForm 
          errors={errors} 
          id={id} 
          userData={userData}
        />
      )}
      updateFormClassName="!w-1/3"
      updateValidation={(updateData: Partial<TUser>) => validateData(updateData, false)}
      deleteForm={(id, listRefetch) => <DeleteUserForm id={id} listRefetch={listRefetch} />}
      deleteFormClassName="!w-1/3 !h-fit"
    />
  );
}
