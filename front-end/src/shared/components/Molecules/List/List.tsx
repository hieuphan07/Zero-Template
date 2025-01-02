"use client";

import { TypeTransfer } from "../../../types/common-type/shared-types";
import { FilterIcon, TrashIcon } from "lucide-react";
import Button from "../../Atoms/Button/Button";
import { EditIcon } from "lucide-react";
import Form from "../Form/Form";
import SearchBar from "../SearchBar/SearchBar";
import { ListProps } from "@/shared/types/components-type/list-type";
import Pagination from "../Pagination/Pagination";
import { useState } from "react";

const List = <T extends object>(props: ListProps<T>) => {
  const [page, setPage] = useState(1);
  // Add type guard to check if items array is not empty
  if (props.items.length === 0) {
    return null;
  }

  const headers = TypeTransfer[props.typeString].headers;
  return (
    <div className={`w-full flex flex-col gap-4 ${props.className}`}>
      <div className="flex gap-4 items-center w-full justify-between">
        <div className="flex gap-4 w-[50%]">
          <SearchBar
            onSearch={() => {}}
            placeholder="Search..."
            className="w-full"
            inputMainColor="primary"
            buttonMainColor="primary"
            buttonContextColor="default"
            attachToEachOther={true}
          />
          <Form
            formButton={
              <Button
                action={() => {}}
                text="Filter"
                mainColor="primary"
                iconAfter={<FilterIcon size={20} />}
                contextColor="default"
                className="flex gap-4"
              />
            }
            isPopup={true}
          >
            <p>hahha</p>
          </Form>
        </div>
        <Form
          formButton={<Button action={() => {}} text="Create New" mainColor="primary" contextColor="default" />}
          isPopup={true}
        >
          <p>hahha</p>
        </Form>
      </div>
      <table className="w-full border-collapse">
        <thead>
          <tr className={`bg-primary text-white ${props.headerClassName}`}>
            {Object.entries(headers).map(
              ([key, header]) =>
                !header.hidden && (
                  <th key={key} className={`p-3 text-left ${props.cellClassName}`}>
                    {header.label}
                  </th>
                ),
            )}
            <th className="p-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {props.items.map((item, rowIndex) => (
            <tr key={rowIndex} className={`border-b hover:bg-gray-50 ${props.rowClassName}`}>
              {Object.entries(headers).map(
                ([key, header]) =>
                  !header.hidden && (
                    <td key={key} className={`p-3 ${props.cellClassName}`}>
                      {String(item[key as keyof T])}
                    </td>
                  ),
              )}
              <td className="p-3">
                <div className="flex justify-end gap-2">
                  <Form
                    formButton={
                      <Button
                        action={() => {}}
                        text=""
                        mainColor="primary"
                        contextColor="default"
                        iconBefore={<EditIcon size={20} />}
                        className="!p-2"
                      />
                    }
                    isPopup={true}
                  >
                    <p>hahha</p>
                  </Form>
                  <Form
                    formButton={
                      <Button
                        action={() => {}}
                        text=""
                        mainColor="danger"
                        contextColor="default"
                        iconBefore={<TrashIcon size={20} />}
                        className="!p-2"
                      />
                    }
                    isPopup={true}
                  >
                    <p>hahha</p>
                  </Form>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination
        currentPage={page}
        totalPages={10}
        onPageChange={(page) => {
          setPage(page);
        }}
      />
    </div>
  );
};

export default List;
