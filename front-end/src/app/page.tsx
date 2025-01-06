"use client";

import MainLayout from "@/shared/components/MainLayout/MainLayout";
import Button from "@/shared/components/Atoms/Button/Button";
import Dropdown from "@/shared/components/Atoms/Dropdown/Dropdown";
import SearchBar from "@/shared/components/Molecules/SearchBar/SearchBar";
import Checkbox from "@/shared/components/Atoms/Checkbox/Checkbox";
import RadioButton from "@/shared/components/Atoms/Radiobutton/Radiobutton";
import Input from "@/shared/components/Atoms/Input/Input";
import List from "@/shared/components/Molecules/List/List";
import { User } from "@/app/admin/user/types/user-type";

// For template only, change later with the actual page
export default function Home() {
  const users: User[] = [
    {
      id: "1",
      firstName: "John",
      lastName: "Doe",
      email: "john.doe@example.com",
      role: "Admin",
      dateCreated: new Date("2023-01-01"),
      lastLogin: new Date("2024-01-10"),
      isActive: true,
      department: "IT",
      phoneNumber: "123-456-7890",
      profileImageUrl: "/profiles/john.jpg",
      createdAt: "2023-01-01",
      updatedAt: "2023-01-01",
    },
    {
      id: "2",
      firstName: "Jane",
      lastName: "Smith",
      email: "jane.smith@example.com",
      role: "User",
      dateCreated: new Date("2023-02-15"),
      isActive: true,
      department: "HR",
      createdAt: "2023-02-15",
      updatedAt: "2023-02-15",
      deletedAt: "2024-01-15",
    },
    {
      id: "3",
      firstName: "Bob",
      lastName: "Wilson",
      email: "bob.wilson@example.com",
      role: "Manager",
      dateCreated: new Date("2023-03-20"),
      lastLogin: new Date("2024-01-09"),
      isActive: false,
      phoneNumber: "098-765-4321",
      createdAt: "2023-03-20",
      updatedAt: "2023-03-20",
    },
  ];

  const templateForm = (
    <>
      <Input
        type="text"
        name="search"
        placeholder="Search..."
        className="mt-10 !w-[20%] ml-[20%]"
        contextColor="warning"
      />
      <RadioButton
        name="radio"
        value="radio"
        label="Radio"
        className=""
        contextColor="danger"
        textClassName="font-bold"
      />
      <RadioButton
        name="radio"
        value="radio2"
        label="Radio2"
        className=""
        contextColor="warning"
        textClassName="font-bold"
      />
      <Checkbox
        name="checkbox"
        label="Checkbox"
        className=""
        boxColor="warning"
        mainColor="danger"
        textClassName="font-bold"
      />
    </>
  );

  const filterForm = (
    <>
      <RadioButton
        name="firstName"
        value="John"
        label="John"
        className=""
        contextColor="danger"
        textClassName="font-bold"
      />
      <RadioButton
        name="firstName"
        value="Jane"
        label="Jane"
        className=""
        contextColor="warning"
        textClassName="font-bold"
      />
    </>
  );

  const updateForm = (
    <>
      <Dropdown
        apiEndpoint="https://api.example.com/data"
        placeholder="Search..."
        clickOpen={true}
        action={() => {}}
        className="mt-10 w-[20%] ml-[20%]"
      />
      <SearchBar
        onSearch={() => {}}
        placeholder="Search..."
        className="mt-10 w-[20%] ml-[20%]"
        inputMainColor="warning"
        buttonMainColor="warning"
        attachToEachOther={true}
        focusBorder={true}
        focusBorderColor="danger"
      />
      <Input
        type="text"
        name="search"
        placeholder="Search..."
        className="mt-10 !w-[20%] ml-[20%]"
        contextColor="warning"
      />
      <RadioButton
        name="radio"
        value="radio"
        label="Radio"
        className=""
        contextColor="danger"
        textClassName="font-bold"
      />
      <RadioButton
        name="radio"
        value="radio2"
        label="Radio2"
        className=""
        contextColor="warning"
        textClassName="font-bold"
      />
      <Checkbox
        name="checkbox"
        label="Checkbox"
        className=""
        boxColor="warning"
        mainColor="danger"
        textClassName="font-bold"
      />
      <Button text="Button" action={() => {}} mainColor="warning" contextColor="danger" />
    </>
  );

  const deleteForm = (
    <>
      <Dropdown
        apiEndpoint="https://api.example.com/data"
        placeholder="Search..."
        clickOpen={true}
        action={() => {}}
        className="mt-10 w-[20%] ml-[20%]"
      />
      <SearchBar
        onSearch={() => {}}
        placeholder="Search..."
        className="mt-10 w-[20%] ml-[20%]"
        inputMainColor="warning"
        buttonMainColor="warning"
        attachToEachOther={true}
        focusBorder={true}
        focusBorderColor="danger"
      />
      <Input
        type="text"
        name="search"
        placeholder="Search..."
        className="mt-10 !w-[20%] ml-[20%]"
        contextColor="warning"
      />
      <RadioButton
        name="radio"
        value="radio"
        label="Radio"
        className=""
        contextColor="danger"
        textClassName="font-bold"
      />
      <RadioButton
        name="radio"
        value="radio2"
        label="Radio2"
        className=""
        contextColor="warning"
        textClassName="font-bold"
      />
      <Checkbox
        name="checkbox"
        label="Checkbox"
        className=""
        boxColor="warning"
        mainColor="danger"
        textClassName="font-bold"
      />
      <Button text="Button" action={() => {}} mainColor="warning" contextColor="danger" />
    </>
  );

  return (
    <MainLayout title="Template Form" maxWidthPercentage={80}>
      <List<User>
        items={users}
        typeString="User"
        insertForm={templateForm}
        filterForm={filterForm}
        updateForm={updateForm}
        deleteForm={deleteForm}
      />
    </MainLayout>
  );
}
