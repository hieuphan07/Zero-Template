"use client";

import UnAuthLayout from "@/shared/components/MainLayout/UnAuthLayout";
import LoginForm from "@/app/auth/components/LoginForm";
import { useState } from "react";
import RegisterForm from "@/app/auth/components/RegisterForm";

export default function LoginPage() {
  const [isRegister, setIsRegister] = useState<boolean | null>(null);
  return (
    <UnAuthLayout
      className="flex justify-center self-center !w-full"
      containerClassName="w-full flex justify-center items-center"
      maxWidthPercentage={100}
    >
      <div className="relative w-full h-full flex self-center justify-center items-center z-0">
        <div
          className={`bg-white absolute ${isRegister == true ? "move-left-to-hide" : isRegister == false ? "move-right-to-show" : "default-above-position"}`}
        >
          <LoginForm setToRegister={setIsRegister} />
        </div>
        <div
          className={`bg-white absolute ${isRegister == true ? "move-right-to-show" : isRegister == false ? "move-left-to-hide" : "default-below-position"}`}
        >
          <RegisterForm setToRegister={setIsRegister} />
        </div>
      </div>
    </UnAuthLayout>
  );
}
