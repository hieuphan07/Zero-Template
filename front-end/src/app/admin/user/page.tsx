import List from "@/shared/components/Molecules/List/List";
import { User } from "./types/user-type";
import MainLayout from "@/shared/components/MainLayout/MainLayout";

export default function UserPage() {
  return (
    <MainLayout title="Users Management" maxWidthPercentage={80}>
      <List<User> typeString="User" />
    </MainLayout>
  );
}
