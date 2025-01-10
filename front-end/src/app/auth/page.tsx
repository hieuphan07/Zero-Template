"use client";

import UnAuthLayout from "@/shared/components/MainLayout/UnAuthLayout";
import LoginForm from "./components/LoginForm";
import { useState } from "react";
import RegisterForm from "./components/Register";

export default function LoginPage() {
  const [isRegister, setIsRegister] = useState(false);
  return (
    <UnAuthLayout
      className="flex justify-center self-center !w-full"
      containerClassName="w-full flex justify-center items-center"
      maxWidthPercentage={100}
    >
      {isRegister ? <RegisterForm setToRegister={setIsRegister} /> : <LoginForm setToRegister={setIsRegister} />}
    </UnAuthLayout>
  );
}
