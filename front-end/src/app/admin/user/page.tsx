"use client";

import React from "react";
import UserList from "./components/UserList";
import MainLayout from "@/shared/components/MainLayout/MainLayout";

export default function UserPage() {
  return (
    <MainLayout title="user-management:title.user-management-title" maxWidthPercentage={80}>
      <UserList />
    </MainLayout>
  );
}
