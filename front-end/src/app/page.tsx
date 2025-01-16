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
      email: "john.doe@example.com",
      lastLogin: new Date("2024-01-10"),
      phoneNumber: "123-456-7890",
      createdAt: "2023-01-01",
      updatedAt: "2023-01-01",
      username: "John Doe",
    },
    {
      id: "2",
      email: "jane.smith@example.com",
      createdAt: "2023-02-15",
      updatedAt: "2023-02-15",
      deletedAt: "2024-01-15",
      username: "Jane Smith",
      phoneNumber: "",
      lastLogin: new Date("2024-01-15"),
    },
    {
      id: "3",
      email: "john.doe@example.com",
      lastLogin: new Date("2024-01-10"),
      phoneNumber: "123-456-7890",
      createdAt: "2023-01-01",
      updatedAt: "2023-01-01",
      username: "John Doe2",
    },
    {
      id: "4",
      email: "jane.smith@example.com",
      createdAt: "2023-02-15",
      updatedAt: "2023-02-15",
      deletedAt: "2024-01-15",
      username: "Jane Smith2",
      phoneNumber: "",
      lastLogin: new Date("2024-01-15"),
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
      <Button text="Button" type="button" action={() => {}} mainColor="warning" contextColor="danger" />
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

  const UpdateForm = ({ id }: { id: string }) => {
    console.log(id);
    return (
      <>
        <Dropdown
          options={[
            { label: "10", value: 10 },
            { label: "20", value: 20 },
            { label: "30", value: 30 },
            { label: "50", value: 50 },
          ]}
          placeholder="Search..."
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
  };

  const DeleteForm = ({ id }: { id: string }) => {
    console.log(id);
    return (
      <>
        <Dropdown
          options={[
            { label: "10", value: 10 },
            { label: "20", value: 20 },
            { label: "30", value: 30 },
            { label: "50", value: 50 },
          ]}
          placeholder="Search..."
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
  };

  return (
    <MainLayout title="Template Form" maxWidthPercentage={80}>
      <List<User>
        items={users}
        typeString="User"
        insertForm={templateForm}
        filterForm={filterForm}
        updateForm={(id) => <UpdateForm id={id} />}
        deleteForm={(id) => <DeleteForm id={id} />}
      />
    </MainLayout>
  );
}
