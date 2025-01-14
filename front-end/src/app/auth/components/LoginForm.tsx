"use client";

import Form from "@/shared/components/Molecules/Form/Form";
import { useTranslation } from "react-i18next";
import Label from "@/shared/components/Atoms/Label/Label";
import Input from "@/shared/components/Atoms/Input/Input";
import Button from "@/shared/components/Atoms/Button/Button";
import Checkbox from "@/shared/components/Atoms/Checkbox/Checkbox";
import ZeroLink from "@/shared/components/Atoms/Link/ZeroLink";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useNotification } from "@/shared/hooks/useNotification";
import { autherizeService } from "../services/auth-services";
import { LoginFormType } from "../types/auth-type";
import { authProvider } from "@/shared/utils/functions/middleware/auth-provider";
import authValidators from "../utils/auth-validator";

const LoginForm = (props: LoginFormType) => {
  const { t } = useTranslation("common");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [isError, setIsError] = useState(false);
  const router = useRouter();
  const [rememberMe, setRememberMe] = useState("false");

  const { showNotification } = useNotification();

  useEffect(() => {
    const checkAuth = async () => {
      const isAuth = await authProvider.isAuthenticated();
      if (isAuth) {
        router.push("/");
      }
    };

    checkAuth();
  }, [router]);

  const validateField = (name: string, value: string): string | null => {
    switch (name) {
      case "username":
        return authValidators.username(value);
      case "password":
        return authValidators.password(value);
      default:
        return null;
    }
  };

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setUsername(value);
    const error = validateField("username", value);
    if (error) {
      setUsernameError(t(error));
    } else {
      setUsernameError("");
    }
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPassword(value);
    const error = validateField("password", value);
    if (error) {
      setPasswordError(t(error));
    } else {
      setPasswordError("");
    }
  };

  const handleSubmit = async () => {
    const usernameError = validateField("username", username);
    if (usernameError) {
      showNotification({
        color: "danger",
        position: "top-right",
        title: t("common:text.error"),
        content: <Label text={t(usernameError)} t={t} translate={true} />,
        enableOtherElements: true,
      });
      return;
    }

    const passwordError = validateField("password", password);
    if (passwordError) {
      showNotification({
        color: "danger",
        position: "top-right",
        title: t("common:text.error"),
        content: <Label text={t(passwordError)} t={t} translate={true} />,
        enableOtherElements: true,
      });
      return;
    }

    try {
      const response = await autherizeService.login({ username, password, rememberMe });
      if (response) {
        showNotification({
          color: "success",
          position: "top-right",
          title: t("common:message.login-success"),
          content: <Label text={t("common:message.login-success")} t={t} translate={true} />,
          enableOtherElements: true,
        });
        // eslint-disable-next-line
        authProvider.setToken((response as any).accessToken);
        // eslint-disable-next-line
        if ((response as any).refreshToken) {
          // eslint-disable-next-line
          authProvider.setRefreshToken((response as any).refreshToken);
        }
        setTimeout(() => {
          router.push("/");
        }, 2000);
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

  const handleRememberMeChange = (checked: boolean | React.ChangeEvent<HTMLInputElement>) => {
    if (typeof checked === "boolean") {
      setRememberMe(checked ? "true" : "false");
    } else {
      setRememberMe(checked.target.checked ? "true" : "false");
    }
  };

  return (
    <Form
      isPopup={false}
      onSubmit={handleSubmit}
      onSubmitNoReload={true}
      className="flex flex-col gap-4 border rounded-lg shadow-sm py-4 w-full"
      childrenClassName="flex flex-col gap-4"
      manualBelowButtons={true}
    >
      <div className="flex flex-col gap-4 items-center">
        <Label
          text={"common:button.login"}
          t={t}
          translate={true}
          className="text-4xl font-bold text-center mb-4"
          inheritedClass={true}
        />
      </div>
      <div className="flex flex-col gap-4 px-6">
        <Label
          text="common:message.welcome"
          t={t}
          translate={true}
          className="text-2xl font-weight-semibold text-center text-primary mb-2"
          inheritedClass={true}
        />
      </div>
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
          border={true}
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
        <div className="relative">
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
            border={true}
          />
        </div>
      </div>
      <div className="flex items-center gap-2 px-6">
        <Checkbox
          name="remember"
          label=""
          className="w-4 h-4"
          boxColor="primary"
          mainColor="primary"
          onChange={handleRememberMeChange}
          checked={rememberMe === "true"}
        />
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
          border={true}
        />
        <ZeroLink
          href="#"
          action={() => {
            props.setToRegister(true);
          }}
          className="w-fit px-4 py-2 text-sm text-center font-medium text-blue-600 hover:text-blue-800 transition duration-200"
          color="info"
        >
          <Label text="common:button.dont-have-account" t={t} translate={true} className="text-sm text-blue-700" />
        </ZeroLink>
      </div>
    </Form>
  );
};

export default LoginForm;
