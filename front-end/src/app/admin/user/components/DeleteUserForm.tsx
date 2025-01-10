"use client";

import Label from "@/shared/components/Atoms/Label/Label";
import { useTranslation } from "next-i18next";

export default function DeleteUserForm() {
  const { t } = useTranslation();
  return (
    <div className="flex flex-col items-center justify-center p-4">
      <Label text={`common:message.delete-confirmation`} t={t} translate={true} className="!text-lg" />
    </div>
  );
}
