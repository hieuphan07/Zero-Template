"use client";

import { TypeTransfer } from "../../../constants/type-transfer";
import { ArrowDown, ArrowUp, ArrowUpDown, FilterIcon, PlusIcon, TrashIcon } from "lucide-react";
import Button from "../../Atoms/Button/Button";
import { EditIcon } from "lucide-react";
import Form from "../Form/Form";
import SearchBar from "../SearchBar/SearchBar";
import { ListProps } from "@/shared/types/components-type/list-type";
import Pagination from "../Pagination/Pagination";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { DefaultItemType } from "@/shared/types/common-type/default-item-type";
import { FilterProperty, SortProperty } from "@/shared/types/common-type/shared-types";
import { cn } from "@/lib/utils";
import Checkbox from "../../Atoms/Checkbox/Checkbox";

const List = <T extends DefaultItemType>(props: ListProps<T>) => {
  const router = useRouter();
  const [page, setPage] = useState(1);
  const [listItems, setListItems] = useState<T[]>(props.items ? props.items : []);
  const [filter, setFilter] = useState<FilterProperty[]>([]);
  const headers = TypeTransfer[props.typeString].headers;
  const [sort, setSort] = useState<SortProperty[]>([
    ...Object.keys(headers).map(
      (header) =>
        ({
          key: header,
          direction: "default",
        }) as SortProperty,
    ),
  ]);

  const filterFormRef = useRef<HTMLFormElement>(null);
  const createFormRef = useRef<HTMLFormElement>(null);
  const updateFormRef = useRef<HTMLFormElement>(null);
  const deleteFormRef = useRef<HTMLFormElement>(null);

  const getListAPI = TypeTransfer[props.typeString].getListAPI;
  const detailPath = TypeTransfer[props.typeString].detailPath;
  const deleteAPI = TypeTransfer[props.typeString].deleteAPI;
  const updateAPI = TypeTransfer[props.typeString].updateAPI;
  const createAPI = TypeTransfer[props.typeString].createAPI;

  useEffect(() => {
    if (props.items) {
      handleGivenList(sort, filter);
    } else {
      handleGetList(page, sort, filter);
    }
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (props.items) {
      handleGivenList(sort, filter);
    } else {
      handleGetList(page, sort, filter);
    }
    // eslint-disable-next-line
  }, [props.items, page, sort, filter]);

  const handleGetList = async (page: number, sort: SortProperty[], filter: FilterProperty[]) => {
    console.log(page, sort, filter);
    const listItems = await getListAPI(page);
    setListItems(listItems);
  };

  const handleGivenList = (sort: SortProperty[], filter: FilterProperty[]) => {
    let listItemData = [...listItems];
    if (sort.length > 0) {
      let sorted = false;
      listItemData = listItemData.sort((a, b) => {
        let result = 0;
        sort.forEach((sortItem) => {
          if (sortItem && sortItem.direction !== "default") {
            const aValue = String(a[sortItem.key as keyof T]);
            const bValue = String(b[sortItem.key as keyof T]);

            result += sortItem.direction === "asc" ? (aValue > bValue ? 1 : -1) : bValue > aValue ? 1 : -1;
          }
        });
        if (result !== 0) {
          sorted = true;
        }
        return result;
      });
      if (!sorted) {
        listItemData = props.items ? [...props.items] : [];
      }
    }
    if (filter.length > 0) {
      listItemData = listItemData.filter((item) => {
        return filter.every((e) => item[e.key as keyof T] == e.value);
      });
    }
    setListItems(listItemData);
  };

  const handleSort = (header: string) => {
    const foundSort = sort.find((sort) => sort.key === header);
    if (foundSort) {
      const newSort = [...sort];
      if (foundSort) {
        foundSort.direction =
          foundSort.direction === "asc" ? "desc" : foundSort.direction === "desc" ? "default" : "asc";
      }
      setSort(newSort);
    } else {
      setSort([...sort, { key: header, direction: "asc" }]);
    }
  };

  const handleFilter = () => {
    const formData = new FormData(filterFormRef.current!);
    const filterData = Object.fromEntries(formData.entries());
    const isValid = props.filterValidation ? props.filterValidation(filterData) : true;
    if (isValid) {
      const filterExist = [...filter];
      if (filterData) {
        Object.keys(filterData).forEach((key) => {
          const filterExistByKey = filterExist.find((e) => e.key == key);
          if (filterData[key]) {
            if (filterExistByKey) {
              filterExistByKey.value = filterData[key].toString();
            } else {
              filterExist.push({ key: key, value: filterData[key].toString() });
            }
          }
        });
      }
      setFilter(filterExist);
    } else {
      alert("Validation failed");
    }
  };

  const handleCreate = () => {
    const formData = new FormData(createFormRef.current!);
    const createData = Object.fromEntries(formData.entries());
    const isValid = props.insertValidation ? props.insertValidation(createData) : true;
    if (isValid) {
      createAPI(createData);
    } else {
      console.log("create not valid");
    }
  };

  const handleUpdate = () => {
    const formData = new FormData(updateFormRef.current!);
    const updateData = Object.fromEntries(formData.entries());
    const isValid = props.updateValidation ? props.updateValidation(updateData) : true;
    if (isValid) {
      updateAPI(updateData);
    } else {
      console.log("update not valid");
    }
  };

  const handleDelete = () => {
    const formData = new FormData(deleteFormRef.current!);
    const deleteData = Object.fromEntries(formData.entries());
    const isValid = props.deleteValidation ? props.deleteValidation(deleteData) : true;
    if (isValid) {
      deleteAPI(deleteData);
    } else {
      console.log("delete not valid");
    }
  };

  const hoverRow = (rowIndex: number) => {
    const rows = document.querySelectorAll(`.item-row-${rowIndex}`);
    if (rows) {
      rows.forEach((row) => {
        row.classList.add("bg-gray-200");
      });
    }
  };

  const unhoverRow = (rowIndex: number) => {
    const rows = document.querySelectorAll(`.item-row-${rowIndex}`);
    if (rows) {
      rows.forEach((row) => {
        row.classList.remove("bg-gray-200");
      });
    }
  };

  const handleRowClick = (id: string) => {
    router.push(`${detailPath}/${id}`);
  };

  const columnStyle = cn(
    props.cellClassName,
    "flex flex-1 flex-col items-center justify-center text-center",
    "scale-100 hover:scale-105 z-[2] hover:z-[5]",
    "border-none hover:border-2 hover:border-primary hover:border-solid",
    "group cursor-pointer origin-center",
    "transition-all duration-300 text-white items-center text-center",
  );

  const headerStyle = cn(
    props.headerClassName,
    "transition-all w-full duration-300 bg-primary px-3 py-3 group-hover:px-6 text-md group-hover:text-xl",
  );

  const renderCell = (item: T, key: string) => {
    const value = item[key as keyof T];
    if (value instanceof Date) {
      return <p>{value.toISOString().split("T")[0]}</p>;
    }
    if (typeof value === "boolean") {
      return (
        <Checkbox
          name="checkbox"
          checked={value}
          label=""
          className=""
          boxColor="primary"
          mainColor="default"
          textClassName="font-bold"
          disabled={true}
        />
      );
    }
    if (value) {
      if (typeof value === "string") {
        return <p>{value}</p>;
      } else return <p>{String(value)}</p>;
    } else {
      return <p>No Data</p>;
    }
  };

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
            focusBorder
            focusBorderColor="primary"
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
                border
              />
            }
            formTitle="Filter"
            onSubmit={handleFilter}
            isPopup={true}
            ref={filterFormRef}
            onSubmitNoReload
            onSubmitClosePopUp
          >
            {props.filterForm}
          </Form>
        </div>
        <Form
          formButton={
            <Button
              action={() => {}}
              text=""
              iconBefore={<PlusIcon size={20} />}
              mainColor="primary"
              contextColor="default"
              border
            />
          }
          isPopup={true}
          formTitle="Insert"
          onSubmit={handleCreate}
          ref={createFormRef}
          onSubmitNoReload
        >
          {props.insertForm}
        </Form>
      </div>
      <div className="w-full flex flex-row justify-center">
        {Object.entries(headers).map(
          ([key, header], index) =>
            !header.hidden && (
              <div key={key} className={cn(columnStyle, `${index === 0 ? "" : ""}`)}>
                <div className={cn(headerStyle, `${index === 0 ? "" : ""}`)} onClick={() => handleSort(key)}>
                  <p className="whitespace-nowrap font-bold">{header.label}</p>
                  <Button
                    action={() => {}}
                    text=""
                    mainColor="default"
                    contextColor="danger"
                    iconBefore={
                      sort.find((sort) => sort.key === key)?.direction === "asc" ? (
                        <ArrowUp size={20} />
                      ) : sort.find((sort) => sort.key === key)?.direction === "desc" ? (
                        <ArrowDown size={20} />
                      ) : (
                        <ArrowUpDown size={20} />
                      )
                    }
                    className="!p-2 !outline-none hover:outline-none hover:text-white "
                    manualHover
                    border={false}
                    isTransparent
                  />
                </div>
                {listItems.map((item, rowIndex) => (
                  <div
                    key={rowIndex}
                    className={`flex items-center justify-center flex-1 w-full border-b p-3 text-black bg-gray-100 cursor-pointer ${props.rowClassName} item-row-${rowIndex}`}
                    onMouseOver={() => hoverRow(rowIndex)}
                    onMouseLeave={() => unhoverRow(rowIndex)}
                    onClick={() => handleRowClick(item.id)}
                  >
                    {renderCell(item, key)}
                  </div>
                ))}
              </div>
            ),
        )}
        <div key={"actions"} className={cn(columnStyle)}>
          <div className={cn(headerStyle)}>
            <p className="whitespace-nowrap font-bold">Actions</p>
            <Button
              action={() => {}}
              text=""
              mainColor="default"
              contextColor="danger"
              iconBefore={<ArrowUpDown size={20} />}
              className="!p-2 !outline-none hover:outline-none hover:text-white "
              manualHover
              border={false}
              isTransparent
              disabled
            />
          </div>
          {listItems.map((item, rowIndex) => (
            <div
              key={rowIndex}
              className={`flex gap-2 items-center justify-center flex-1 w-full border-b p-3 text-black bg-gray-100 cursor-pointer ${props.rowClassName} item-row-${rowIndex}`}
              onMouseOver={() => hoverRow(rowIndex)}
              onMouseLeave={() => unhoverRow(rowIndex)}
            >
              <Form
                formButton={
                  <Button
                    action={() => {}}
                    text=""
                    mainColor="primary"
                    contextColor="default"
                    iconBefore={<EditIcon size={20} />}
                    className="!p-2"
                    border
                  />
                }
                isPopup={true}
                formTitle="Update"
                onSubmit={handleUpdate}
                ref={updateFormRef}
                onSubmitNoReload
              >
                {props.updateForm}
              </Form>
              <Form
                formButton={
                  <Button
                    action={() => {}}
                    text=""
                    mainColor="danger"
                    contextColor="danger"
                    iconBefore={<TrashIcon size={20} />}
                    className="!p-2"
                    border
                  />
                }
                isPopup={true}
                formTitle="Delete"
                onSubmit={handleDelete}
                ref={deleteFormRef}
                onSubmitNoReload
              >
                {props.deleteForm}
              </Form>
            </div>
          ))}
        </div>
      </div>
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
