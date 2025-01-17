import Button from "@/shared/components/Atoms/Button/Button";
import { UserFormProps } from "@/shared/types/components-type/user-form-type";

const TabNavigation = (props: Partial<UserFormProps>) => {
  return (
    <div className="flex border-b border-gray-200">
      <Button
        action={() => props.setActiveTab?.("userInfo")}
        type="button"
        text="user-management:tabs.user-information"
        mainColor="primary"
        contextColor="primary"
        className={`px-4 py-2 rounded-none ${props.activeTab === "userInfo" ? "border-b-2 border-primary text-primary" : "text-gray-500"}`}
        isTransparent
      />
      <Button
        action={() => props.setActiveTab?.("roles")}
        type="button"
        text="user-management:tabs.roles"
        mainColor="primary"
        contextColor="primary"
        className={`px-4 py-2 rounded-none ${props.activeTab === "roles" ? "border-b-2 border-primary text-primary" : "text-gray-500"}`}
        isTransparent
      />
    </div>
  );
};

export default TabNavigation;
