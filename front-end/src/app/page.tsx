"use client";
import MainLayout from "@/shared/components/MainLayout/MainLayout";
import Button from "@/shared/components/Atoms/Button/Button";
import Form from "@/shared/components/Molecules/Form/Form";
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
    },
  ];
  return (
    <MainLayout>
      <Form
        isPopup={true}
        popUpButtonText="Template Form"
        popUpButtonMainColor="warning"
        popUpButtonContextColor="danger"
        formName="form"
        formText="Form"
        belowButtons={[
          <Button key="submit" text="Submit" action={() => {}} mainColor="warning" contextColor="danger" />,
        ]}
      >
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
      </Form>
      <List<User> items={users} typeString="User" />
    </MainLayout>
  );
}
