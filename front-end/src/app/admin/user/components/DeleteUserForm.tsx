"use client";

import Label from "@/shared/components/Atoms/Label/Label";
import { useTranslation } from "next-i18next";
import { useEffect, useState } from "react";
import { User } from "../types/user-type";
import { TypeTransfer } from "@/shared/constants/type-transfer";
import { useNotification } from "@/shared/hooks/useNotification";

export default function DeleteUserForm({ id, listRefetch }: { id: string; listRefetch: () => void }) {
  const { t } = useTranslation();
  const [user, setUser] = useState<User | null>(null);

  const GetAPI = TypeTransfer["User"].getAPI;

  const { showNotification } = useNotification();

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line
  }, [id]);

  const fetchData = async () => {
    try {
      if (id != "") {
        const response = await GetAPI(id);
        console.log(response);
        setUser(response);
      }
    } catch (error) {
      showNotification({
        title: "",
        content: (
          <Label
            text={(error as Error).message || "user-management:errors.get-user-failed"}
            t={t}
            translate={true}
            className="!text-lg !font-bold"
          />
        ),
        color: "danger",
        position: "top-right",
        closeOnClick: true,
        enableOtherElements: true,
      });
      listRefetch();
    }
  };

  return (
    <div className="flex flex-col items-center text-center justify-center h-fit overflow-y-scroll">
      <Label text={"The following user with these informations will be deleted:"} translate className="!text-lg" />
      <div className="flex flex-col items-center justify-center">
        <div className="flex flex-row gap-1">
          <Label text={`user-management:label.username`} t={t} translate={true} className="!text-lg" />:
          <Label text={`${user?.username}`} className="!text-lg !font-bold" />
        </div>
        <div className="flex flex-row gap-1">
          <Label text={`user-management:label.email`} t={t} translate={true} className="!text-lg" />:
          <Label text={`${user?.email}`} className="!text-lg !font-bold" />
        </div>
        <div className="flex flex-row gap-1">
          <Label text={`user-management:label.phone-number`} t={t} translate={true} className="!text-lg" />:
          <Label text={`${user?.phoneNumber}`} className="!text-lg !font-bold" />
        </div>
        <div className="flex flex-row gap-1">
          <Label text={`user-management:label.last-login`} t={t} translate={true} className="!text-lg" />:
          <Label text={`${user?.lastLogin}`} className="!text-lg !font-bold" />
        </div>
        <div className="flex flex-row gap-1">
          <Label text={`user-management:label.created-at`} t={t} translate={true} className="!text-lg" />:
          <Label text={`${user?.createdAt}`} className="!text-lg !font-bold" />
        </div>
        <div className="flex flex-row gap-1">
          <Label text={`user-management:label.updated-at`} t={t} translate={true} className="!text-lg" />:
          <Label text={`${user?.updatedAt}`} className="!text-lg !font-bold" />
        </div>
      </div>
      <Label text={`common:message.delete-confirmation`} translate={true} className="!text-lg" />
    </div>
  );
}
