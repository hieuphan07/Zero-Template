import { Metadata } from "next";
import UserDetail from "../components/UserDetail";

export const metadata: Metadata = {
  title: "Users Details - Pasona Zero",
  description: "Users Details - Pasona Zero",
  icons: {
    icon: "/favicon.ico",
  },
};

export default async function UserDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;

  return <UserDetail id={resolvedParams.id} />;
}
