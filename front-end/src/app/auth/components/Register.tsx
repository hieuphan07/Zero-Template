"use client";

import Form from "@/shared/components/Molecules/Form/Form";
import { useTranslation } from "react-i18next";
import Label from "@/shared/components/Atoms/Label/Label";
import Input from "@/shared/components/Atoms/Input/Input";
import Button from "@/shared/components/Atoms/Button/Button";
import Checkbox from "@/shared/components/Atoms/Checkbox/Checkbox";
import ZeroLink from "@/shared/components/Atoms/Link/ZeroLink";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useNotification } from "@/shared/hooks/useNotification";
import { loginService } from "../services/auth-services";
import { LoginFormType } from "../types/auth-type";

const RegisterForm = (props: LoginFormType) => {
  const { t } = useTranslation("common");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [isError, setIsError] = useState(false);

  const router = useRouter();

  const { showNotification } = useNotification();

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setUsername(value);
    if (value.length < 2) {
      setUsernameError(t("common:text.username-must-be-at-least-2-characters-long"));
    } else {
      setUsernameError("");
    }
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPassword(value);
    if (value.length < 8) {
      setPasswordError(t("common:auth.password-must-be-at-least-8-characters-long"));
    } else {
      setPasswordError("");
    }
  };

  const handleSubmit = async () => {
    if (username.length < 2) {
      showNotification({
        color: "danger",
        position: "top-right",
        title: t("common:text.error"),
        content: <Label text={t("common:auth.username-must-be-at-least-2-characters-long")} t={t} translate={true} />,
        enableOtherElements: true,
      });
      return;
    }
    if (password.length < 8) {
      showNotification({
        color: "danger",
        position: "top-right",
        title: t("common:text.error"),
        content: <Label text={t("common:auth.password-must-be-at-least-8-characters-long")} t={t} translate={true} />,
        enableOtherElements: true,
      });
      return;
    }

    try {
      const response = await loginService.login(username, password);
      if (response) {
        showNotification({
          color: "success",
          position: "top-right",
          title: t("common:text.success"),
          content: <Label text={t("common:message.login-success")} t={t} translate={true} />,
          enableOtherElements: true,
        });
        router.push("/");
      }
    } catch (error: unknown) {
      setIsError(true);
      showNotification({
        color: "danger",
        position: "top-right",
        title: t("common:text.error"),
        // eslint-disable-next-line
        content: <Label text={(error as any).message} t={t} translate={true} />,
        enableOtherElements: true,
      });
    }
  };
  return (
    <Form
      isPopup={false}
      onSubmit={handleSubmit}
      onSubmitNoReload={true}
      className="flex flex-col gap-4 border max-w-md rounded-lg shadow-sm pt-4 w-full"
      childrenClassName="flex flex-col gap-4"
      manualBelowButtons={true}
      formTitle="register"
    >
      <div className="flex flex-col gap-1 px-6">
        <Label
          text="common:auth.username"
          t={t}
          translate={true}
          htmlFor="username"
          className="text-sm font-semibold text-gray-700"
        />
        <Input
          type="text"
          id="username"
          className=""
          placeholder={t("common:auth.enter-your-username")}
          name="username"
          value={username}
          onChange={handleUsernameChange}
          required
          isError={usernameError !== "" || isError}
        />
      </div>
      <div className="flex flex-col gap-1 px-6">
        <Label
          text="common:auth.password"
          t={t}
          translate={true}
          htmlFor="password"
          className="text-sm font-semibold text-gray-700"
        />
        <Input
          type="password"
          id="password"
          name="password"
          className=""
          placeholder={t("common:auth.enter-your-password")}
          value={password}
          onChange={handlePasswordChange}
          required
          isError={passwordError !== "" || isError}
        />
      </div>
      <div className="flex items-center gap-2 px-6">
        <Checkbox name="remember" label="" className="w-4 h-4" boxColor="primary" mainColor="primary" />
        <Label
          text="common:auth.remember-me"
          t={t}
          translate={true}
          htmlFor="remember"
          className="text-sm text-gray-700"
        />
      </div>
      <div className="flex flex-col items-center px-6 space-y-4">
        <Button
          type="submit"
          text="common:button.login"
          mainColor="primary"
          className="!w-full"
          action={() => {}}
          border
        />
        <ZeroLink
          href="#"
          action={() => {
            props.setToRegister(true);
          }}
          className="w-fit px-4 py-2 text-sm text-center font-medium text-blue-600 hover:text-blue-800 transition duration-200"
          color="info"
        >
          {t("common:button.dont-have-account")}
        </ZeroLink>
      </div>
    </Form>
  );
};

export default RegisterForm;
