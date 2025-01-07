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
import { useTranslation } from "next-i18next";
import { DefaultItemType } from "@/shared/types/common-type/default-item-type";
import { FilterProperty, SortProperty } from "@/shared/types/common-type/shared-types";
import { cn } from "@/lib/utils";
import Checkbox from "../../Atoms/Checkbox/Checkbox";
import Label from "../../Atoms/Label/Label";

const List = <T extends DefaultItemType>(props: ListProps<T>) => {
  const router = useRouter();
  const [page, setPage] = useState(1);
  const [listItems, setListItems] = useState<T[]>(props.items ? props.items : []);
  const [meta, setMeta] = useState({
    total: 0,
    page: 1,
    lastPage: 1,
  });
  const [filter, setFilter] = useState<FilterProperty[]>([]);

  const filterFormRef = useRef<HTMLFormElement>(null);
  const createFormRef = useRef<HTMLFormElement>(null);
  const updateFormRef = useRef<HTMLFormElement>(null);
  const deleteFormRef = useRef<HTMLFormElement>(null);

  const { t } = useTranslation("common");
  const headers = TypeTransfer[props.typeString].headers;
  const [sort, setSort] = useState<SortProperty | null>(null);
  const getListAPI = TypeTransfer[props.typeString].getListAPI;
  const detailPath = TypeTransfer[props.typeString].detailPath;
  const deleteAPI = TypeTransfer[props.typeString].deleteAPI;
  const updateAPI = TypeTransfer[props.typeString].updateAPI;
  const createAPI = TypeTransfer[props.typeString].createAPI;

  useEffect(() => {
    if (props.items) {
      handleGivenList(sort || undefined, filter);
    } else {
      handleGetList(page, sort || undefined, filter);
    }
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (props.items) {
      handleGivenList(sort || undefined, filter);
    } else {
      handleGetList(page, sort || undefined, filter);
    }
    // eslint-disable-next-line
  }, [props.items, page, sort, filter]);

  const handleGetList = async (page: number, sort?: SortProperty, filter?: FilterProperty[]) => {
    const listItems = await getListAPI({
      page: page,
      limit: 10,
      sortBy: sort?.key,
      sortDirection: sort?.direction === "asc" ? "ASC" : "DESC",
      searchBy: filter?.[0]?.key,
      searchValue: filter?.[0]?.value,
    });
    setListItems(listItems?.data);
    setMeta(listItems?.meta);
  };

  const handleGivenList = (sort?: SortProperty, filter?: FilterProperty[]) => {
    let listItemData = [...listItems];
    if (sort) {
      listItemData = listItemData.sort((a, b) => {
        const aValue = String(a[sort.key as keyof T]);
        const bValue = String(b[sort.key as keyof T]);
        return sort.direction === "asc" ? (aValue > bValue ? 1 : -1) : bValue > aValue ? 1 : -1;
      });
    }
    if (filter && filter.length > 0) {
      listItemData = listItemData.filter((item) => {
        return filter.every((e) => item[e.key as keyof T] == e.value);
      });
    }
    setListItems(listItemData);
  };

  const handleSort = (header: string) => {
    setSort((prevSort) => {
      const newDirection = prevSort?.key === header ? (prevSort.direction === "asc" ? "desc" : "asc") : "asc"; // default to "asc" if sorting by a different header
      return { key: header, direction: newDirection };
    });
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
        return <Label text={value} t={t} truncate translate={true} className="" inheritedClass />;
      } else {
        return <Label text={String(value)} t={t} truncate translate={true} className="" inheritedClass />;
      }
    } else {
      return <Label text={"common:text.no-data"} t={t} truncate translate={true} className="" inheritedClass />;
    }
  };

  return (
    <div className={`w-full flex flex-col gap-4 ${props.className}`}>
      <div className="flex gap-4 items-center w-full justify-between">
        <div className="flex gap-4 w-[50%]">
          <SearchBar
            onSearch={() => {}}
            placeholder={t("common:button.search") + "..."}
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
                text="common:button.filter"
                mainColor="primary"
                iconAfter={<FilterIcon size={20} />}
                contextColor="default"
                className="flex gap-4"
                border
              />
            }
            formTitle={"common:button.filter"}
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
          formTitle={t("common:button.create")}
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
                <div
                  className={cn(headerStyle, `${index === 0 ? "" : ""}`)}
                  onClick={() => (header.sortable ? handleSort(key) : "")}
                >
                  <Label
                    text={header.label}
                    t={t}
                    className="whitespace-nowrap font-bold"
                    inheritedClass
                    translate={true}
                  />
                  <br />
                  <Button
                    action={() => {}}
                    text=""
                    mainColor="default"
                    contextColor="danger"
                    iconBefore={
                      sort?.key === key ? (
                        sort?.direction === "asc" ? (
                          <ArrowUp size={20} />
                        ) : (
                          <ArrowDown size={20} />
                        )
                      ) : (
                        <ArrowUpDown size={20} />
                      )
                    }
                    className="!p-2 !outline-none hover:outline-none hover:text-white "
                    manualHover
                    border={false}
                    isTransparent
                    disabled={!header.sortable}
                  />
                </div>
                <div className="flex flex-col w-full flex-1 items-stretch">
                  {listItems.map((item, rowIndex) => (
                    <div
                      key={rowIndex}
                      className={`flex whitespace-nowrap items-center justify-center flex-1 w-full border-b p-3 text-black bg-gray-100 cursor-pointer ${props.rowClassName} item-row-${rowIndex}`}
                      onMouseOver={() => hoverRow(rowIndex)}
                      onMouseLeave={() => unhoverRow(rowIndex)}
                      onClick={() => handleRowClick(item.id)}
                    >
                      {renderCell(item, key)}
                    </div>
                  ))}
                </div>
              </div>
            ),
        )}
        <div key={"actions"} className={cn(columnStyle)}>
          <div className={cn(headerStyle)}>
            <Label
              text="common:text.actions"
              translate={true}
              t={t}
              inheritedClass
              className="whitespace-nowrap font-bold"
            />
            <br />
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
          {listItems?.map((item, rowIndex) => (
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
                formTitle={t("common:button.update")}
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
                formTitle={t("common:button.delete")}
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
        currentPage={meta.page}
        totalPages={meta.lastPage}
        onPageChange={(page) => {
          setPage(page);
        }}
      />
    </div>
  );
};

export default List;
