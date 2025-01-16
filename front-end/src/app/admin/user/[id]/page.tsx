"use client";

import MainLayout from "@/shared/components/MainLayout/MainLayout";
import userValidators from "../utils/user-validator";
import { UserDetail } from "./types/userDetail-type";
import DetailPage from "@/shared/components/Organisms/DetailPage/DetailPage";

export default function UserDetailPage() {
  return (
    <MainLayout title="user-management:title.user-detail-title" maxWidthPercentage={80}>
      <DetailPage<UserDetail> localeName="user-management" typeString="User" validators={userValidators} />
    </MainLayout>
  );
}
