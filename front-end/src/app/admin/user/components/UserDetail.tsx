"use client";

import { useEffect, useState } from "react";
import MainLayout from "@/shared/components/MainLayout/MainLayout";
import { User } from "../types/user-type";
import { TypeTransfer } from "@/shared/constants/type-transfer";
import { useTranslation } from "react-i18next";
import Label from "@/shared/components/Atoms/Label/Label";
import { Clock, Mail, Phone, User as UserIcon } from "lucide-react";

export default function UserDetail({ id }: { id: string }) {
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { t } = useTranslation(["user-management", "common"]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await TypeTransfer.User.getAPI(id);
        setUser(userData);
      } catch (err) {
        setError(err instanceof Error ? err.message : String(err));
      }
    };
    fetchUser();
  }, [id]);

  if (!user || error) {
    return (
      <MainLayout title="user-management:title.user-detail-title" maxWidthPercentage={80}>
        <div className="flex flex-col items-center justify-center p-8">
          <Label text={"common:text.no-data"} t={t} translate={true} className="text-red-500" />
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout title="user-management:title.user-detail-title" maxWidthPercentage={80}>
      <div className="grid grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="flex items-center gap-4 mb-6">
            <div className="bg-blue-100 rounded-full p-3">
              <UserIcon className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <Label
                text={user.username}
                t={t}
                translate={true}
                className="text-lg font-semibold text-gray-900"
                inheritedClass={true}
              />
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-3 text-gray-600">
              <Mail className="w-5 h-5 text-gray-400" />
              <Label text={user.email} t={t} translate={true} className="text-sm" inheritedClass={true} />
            </div>

            <div className="flex items-center gap-3 text-gray-600">
              <Phone className="w-5 h-5 text-gray-400" />
              <Label
                text={user.phoneNumber || t("common:text.no-data")}
                t={t}
                translate={true}
                className="text-sm"
                inheritedClass={true}
              />
            </div>

            <div className="flex items-center gap-3 text-gray-600">
              <Clock className="w-5 h-5 text-gray-400" />
              <Label
                text={`${t("user-management:fields.lastLogin")}: ${
                  user.lastLogin ? new Date(user.lastLogin).toLocaleString() : t("common:text.no-data")
                }`}
                t={t}
                translate={true}
                className="text-sm"
                inheritedClass={true}
              />
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
