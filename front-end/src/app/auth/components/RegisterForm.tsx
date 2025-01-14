"use client";

import { useState, useRef } from "react";
import Form from "@/shared/components/Molecules/Form/Form";
import Input from "@/shared/components/Atoms/Input/Input";
import Button from "@/shared/components/Atoms/Button/Button";
import { autherizeService } from "@/app/auth/services/auth-services";
import { useTranslation } from "next-i18next";
import Label from "@/shared/components/Atoms/Label/Label";
import { useNotification } from "@/shared/hooks/useNotification";
import authValidators from "../utils/auth-validator";
import commonValidators from "@/shared/utils/functions/validation/common-validator";
import { FormErrors, LoginFormType } from "@/app/auth/types/auth-type";
import ZeroLink from "@/shared/components/Atoms/Link/ZeroLink";
import { ApiError } from "next/dist/server/api-utils";

const RegistrationForm = (props: LoginFormType) => {
  const { t } = useTranslation("common");
  const { showNotification } = useNotification();

  // Refs for form inputs
  const formRef = useRef<HTMLFormElement>(null);

  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Partial<FormErrors>>({});

  const validateForm = (formData: FormData) => {
    const newErrors: FormErrors = {};
    const errorMessages: string[] = [];

    const fields = [
      { name: "username", validator: () => authValidators.username(formData.get("username") as string) },
      { name: "email", validator: () => commonValidators.email(formData.get("email") as string) },
      { name: "password", validator: () => commonValidators.password(formData.get("password") as string) },
      {
        name: "confirmPassword",
        validator: () =>
          authValidators.confirmPassword(formData.get("password") as string, formData.get("confirmPassword") as string),
      },
    ];

    const phoneNumber = formData.get("phoneNumber") as string;
    if (phoneNumber) {
      fields.push({
        name: "phoneNumber",
        validator: () => commonValidators.phoneNumber(phoneNumber),
      });
    }

    for (const field of fields) {
      const error = field.validator();
      if (error) {
        newErrors[field.name as keyof FormErrors] = true;
        errorMessages.push(error);
      }
    }

    setErrors(newErrors);
    return { isValid: errorMessages.length === 0, errorMessages };
  };

  const handleSubmit = async (props: LoginFormType) => {
    if (!formRef.current) return;

    const formData = new FormData(formRef.current);
    const { isValid, errorMessages } = validateForm(formData);

    if (!isValid) {
      showNotification({
        color: "danger",
        title: t("common:auth.validation-error"),
        content: errorMessages.map((msg, index) => <Label key={index} text={msg} t={t} translate={true} />),
        position: "top-right",
        contentClassName: "flex-col gap-2",
      });
      return;
    }

    const phoneNumber = formData.get("phoneNumber")?.toString() ?? "";

    const data = {
      username: formData.get("username")?.toString() ?? "",
      email: formData.get("email")?.toString() ?? "",
      password: formData.get("password")?.toString() ?? "",
      phoneNumber: phoneNumber ?? undefined,
    };

    try {
      setIsLoading(true);
      const response = await autherizeService.register(data);
      if (response) {
        showNotification({
          color: "success",
          position: "top-right",
          title: t("common:message.register-success"),
          content: <Label text={"common:message.register-success"} t={t} translate={true} />,
          enableOtherElements: true,
        });
        props.setToRegister(false);
      }
    } catch (err: unknown) {
      showNotification({
        color: "danger",
        title: t("common:auth.error"),
        content: (err as ApiError).message ? (
          <Label text={(err as ApiError).message} t={t} translate={true} />
        ) : (
          <Label text={t("common:auth.unknown-error")} t={t} translate={true} />
        ),
        position: "top-right",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form
      isPopup={false}
      formName="registration"
      onSubmit={() => {}}
      onSubmitNoReload={true}
      formTitle={t("common:auth.register")}
      className="border rounded-lg shadow-sm py-4"
      formTextClassName="mb-6 text-2xl"
      ref={formRef}
      manualBelowButtons
    >
      <div className="flex flex-col gap-4 px-6">
        <Label
          text="common:message.welcome"
          t={t}
          translate={true}
          className="text-2xl font-weight-semibold text-center text-primary mb-2"
          inheritedClass={true}
        />
      </div>
      <div className="space-y-4">
        <div className="flex flex-col gap-1 px-6">
          <Label
            text={"common:auth.username"}
            t={t}
            translate={true}
            className="text-sm font-semibold text-gray-700"
            inheritedClass
          />
          <Input
            type="text"
            name="username"
            placeholder={t("common:auth.enter-your-username")}
            className="w-full"
            required
            disabled={isLoading}
            isError={errors.username}
            border
          />
        </div>

        <div className="flex flex-col gap-1 px-6">
          <Label
            text={"common:auth.email"}
            t={t}
            translate={true}
            className="text-sm font-semibold text-gray-700"
            inheritedClass
          />
          <Input
            type="email"
            name="email"
            placeholder={t("common:auth.enter-your-email")}
            className="w-full"
            required
            disabled={isLoading}
            isError={errors.email}
            border
          />
        </div>

        <div className="flex flex-col gap-1 px-6">
          <Label
            text={"common:auth.password"}
            t={t}
            translate={true}
            className="text-sm font-semibold text-gray-700"
            inheritedClass
          />
          <Input
            type="password"
            name="password"
            placeholder={t("common:auth.enter-your-password")}
            className="w-full"
            required
            disabled={isLoading}
            isError={errors.password}
            border
          />
        </div>

        <div className="flex flex-col gap-1 px-6">
          <Label
            text={"common:auth.confirm-password"}
            t={t}
            translate={true}
            className="text-sm font-semibold text-gray-700"
            inheritedClass
          />
          <Input
            type="password"
            name="confirmPassword"
            placeholder={t("common:auth.confirm-your-password")}
            className="w-full"
            required
            disabled={isLoading}
            isError={errors.confirmPassword}
            border
          />
        </div>

        <div className="flex flex-col gap-1 px-6">
          <Label
            text={"common:auth.phone-number"}
            t={t}
            translate={true}
            className="text-sm font-semibold text-gray-700"
            inheritedClass
          />
          <Input
            type="tel"
            name="phoneNumber"
            placeholder={t("common:auth.enter-your-phone-number")}
            className="w-full"
            disabled={isLoading}
            isError={errors.phoneNumber}
            border
          />
        </div>

        <div className="flex flex-col items-center px-6 space-y-4">
          <Button
            text={isLoading ? "common:button.registering" : "common:button.register"}
            action={() => handleSubmit(props)}
            mainColor="primary"
            contextColor="default"
            type="submit"
            className="!w-full"
            disabled={isLoading}
          />
          <ZeroLink
            href="#"
            action={() => {
              props.setToRegister(false);
            }}
            className="px-4 py-2 text-sm text-center font-medium text-blue-600 hover:text-blue-800 transition duration-200"
            color="info"
          >
            <Label text="common:button.back-to-login" t={t} translate={true} className="text-sm text-blue-700" />
          </ZeroLink>
        </div>
      </div>
    </Form>
  );
};

export default RegistrationForm;
