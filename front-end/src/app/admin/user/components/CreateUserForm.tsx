"use client";

import React, { useState } from "react";
import Input from "@/shared/components/Atoms/Input/Input";
import { UserCreate } from "../types/user-type";
import Label from "@/shared/components/Atoms/Label/Label";
import Button from "@/shared/components/Atoms/Button/Button";
import Checkbox from "@/shared/components/Atoms/Checkbox/Checkbox";

const CreateUserForm = () => {
  const [activeTab, setActiveTab] = useState("userInfo");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [user, setUser] = useState<UserCreate>({
    username: "",
    email: "",
    password: "",
    phoneNumber: "",
    roles: [],
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
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

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    if (!value && name !== "phoneNumber") {
      setErrors((prev) => ({
        ...prev,
        [name]: "This field is required",
      }));
    }
  };

  return (
    <div className="flex flex-col items-center w-full mt-5">
      <div className="flex flex-col items-center justify-center gap-4 w-full px-5">
        <div className="flex flex-col w-full">
          <div className="flex border-b border-gray-200">
            <Button
              action={() => setActiveTab("userInfo")}
              type="button"
              text="User Information"
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
              text="Roles"
              mainColor="primary"
              contextColor="primary"
              className={`px-4 py-2 rounded-none ${activeTab === "roles" ? "border-b-2 border-primary text-primary" : "text-gray-500"}`}
              isTransparent
            />
          </div>

          {activeTab === "userInfo" && (
            <div className="flex flex-col gap-4 w-full mt-4">
              <div className="w-full">
                <Label htmlFor="username" text="User Name" required className="text-base mb-1" />
                <Input
                  required
                  type="text"
                  id="username"
                  name="username"
                  placeholder="JohnDoe"
                  value={user.username}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.username && <span className="text-red-500 text-sm mt-1">{errors.username}</span>}
              </div>
              <div className="w-full">
                <Label htmlFor="email" text="Email" required className="text-base mb-1" />
                <Input
                  required
                  type="email"
                  id="email"
                  name="email"
                  placeholder="john.doe@gmail.com"
                  value={user.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.email && <span className="text-red-500 text-sm mt-1">{errors.email}</span>}
              </div>
              <div className="w-full">
                <Label htmlFor="password" text="Password" required className="text-base mb-1" />
                <Input
                  required
                  type="password"
                  id="password"
                  name="password"
                  placeholder="********"
                  value={user.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.password && <span className="text-red-500 text-sm mt-1">{errors.password}</span>}
              </div>
              <div className="w-full">
                <Label htmlFor="phoneNumber" text="Phone Number" className="text-base mb-1" />
                <Input
                  type="tel"
                  id="phoneNumber"
                  name="phoneNumber"
                  placeholder="+6281234567890"
                  value={user.phoneNumber}
                  onChange={handleChange}
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
                  checked={user.roles?.includes("admin")}
                  onChange={(e) => handleChange(e as React.ChangeEvent<HTMLInputElement>)}
                  className="w-4 h-4"
                />
                <Label text="Admin" htmlFor="admin" />
              </div>
              <div className="flex items-center gap-2">
                <Checkbox
                  name="user"
                  id="user"
                  checked={user.roles?.includes("user")}
                  onChange={(e) => handleChange(e as React.ChangeEvent<HTMLInputElement>)}
                  className="w-4 h-4"
                />
                <Label text="User" htmlFor="user" />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CreateUserForm;
