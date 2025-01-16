"use client";

import React, { Fragment, useRef } from "react";
import { useState, useEffect } from "react";
import Button from "@/shared/components/Atoms/Button/Button";
import Input from "@/shared/components/Atoms/Input/Input";
import Label from "@/shared/components/Atoms/Label/Label";
import { usePathname } from "next/navigation";
import { TypeTransfer } from "@/shared/constants/type-transfer";
import { useNotification } from "@/shared/hooks/useNotification";
import Form from "@/shared/components/Molecules/Form/Form";
import { useRouter } from "next/navigation";
import { DefaultItemType } from "@/shared/types/common-type/default-item-type";
import { DetailPageProps } from "@/shared/types/components-type/detail-page-type";

export default function DetailPage<T extends DefaultItemType>(props: DetailPageProps) {
  const router = useRouter();
  const pathname = usePathname();
  const id = pathname.substring(pathname.lastIndexOf("/") + 1);
  const { showNotification } = useNotification();
  const [isEdit, setIsEdit] = useState(false);

  const [itemData, setItemData] = useState<T | undefined>(undefined);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const formRef = useRef<HTMLFormElement>(null);

  const getAPI = TypeTransfer[props.typeString].getAPI;
  const updateAPI = TypeTransfer[props.typeString].updateAPI;
  const deleteAPI = TypeTransfer[props.typeString].deleteAPI;
  const detailFields = TypeTransfer[props.typeString].detailFields;
  const listPath = TypeTransfer[props.typeString].listPath;

  // get item data when mount
  useEffect(() => {
    const handleGetItem = async (id: string) => {
      try {
        const response = await getAPI(id);
        setItemData(response);
      } catch (error) {
        showNotification({
          title: `${props.localeName}:notification.error`,
          content: <Label text={(error as Error)?.message || `${props.localeName}:notification.getError`} translate />,
          position: "top-right",
          color: "danger",
          enableOtherElements: true,
        });
      }
    };

    if (pathname) {
      handleGetItem(id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const showErrorNotification = (errors: Record<string, string>) => {
    if (Object.values(errors).length >= 1 && Object.values(errors).some((value) => value !== "")) {
      showNotification({
        title: `${props.localeName}:notification.error`,
        content: (
          <Fragment>
            <div className="flex flex-col justify-start items-start text-start">
              {Object.entries(errors).map(([key, value]) => (
                <Label key={key} text={value} translate />
              ))}
            </div>
          </Fragment>
        ),
        position: "top-right",
        color: "danger",
        enableOtherElements: true,
      });
    }
  };

  useEffect(() => {
    console.log("errors", errors);
    showErrorNotification(errors);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [errors]);

  const fieldsToChange = Object.entries(detailFields)
    .filter(([, field]) => field.changable)
    .map(([fieldName]) => fieldName);

  const validateField = (name: string, value: string): string | null => {
    // Skip validation for empty password or unchanged password
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if (name === "password" && (!value || value === (itemData as any)?.password)) return null;

    // Get validator function for the field if it exists
    if (!props.validators) return null;
    const validator = props.validators[name];
    const error = validator?.(value) ?? null;

    return error;
  };

  const validateForm = (data: Partial<T>): boolean => {
    if (!props.validators) return true;

    // Validate the fields which can be changed
    const errorData: Record<string, string> = {};
    for (const field of fieldsToChange) {
      const value = data[field as keyof T] as string;
      // Skip validation for empty password field and unchanged password
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      if (field === "password" && (!value || value === (itemData as any)?.password)) continue;
      if (value) {
        const error = validateField(field, value);
        if (error) {
          errorData[field] = error;
        }
      }
    }
    if (Object.keys(errorData).length > 0) {
      setErrors(errorData);
      return false;
    }

    return true;
  };

  const handleSave = () => {
    const formData = new FormData(formRef.current!);
    const formEntries = Object.fromEntries(formData.entries());

    const updatePayload = {
      ...fieldsToChange.reduce(
        (acc, field) => ({
          ...acc,
          // Skip empty or unchanged password
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          ...(field === "password" && (!formEntries[field] || formEntries[field] === (itemData as any)?.password)
            ? {}
            : { [field]: formEntries[field] }),
        }),
        {},
      ),
    } as T;

    if (validateForm(updatePayload)) {
      updateData(updatePayload);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteAPI(id);
      showNotification({
        title: `${props.localeName}:notification.success`,
        content: <Label text={`${props.localeName}:notification.deleteSuccess`} translate />,
        position: "top-right",
        color: "success",
        enableOtherElements: true,
      });

      if (props.onBack) {
        props.onBack();
      } else {
        router.push(listPath);
      }
    } catch (error) {
      showNotification({
        title: `${props.localeName}:notification.error`,
        content: <Label text={(error as Error)?.message || `${props.localeName}:notification.deleteError`} translate />,
        position: "top-right",
        color: "danger",
        enableOtherElements: true,
      });
    }
  };

  const handleActivateEdit = () => {
    setIsEdit(true);
  };

  // const handleBlur = (key: string, value: string) => {
  //   if (detailFields[key].changable) {
  //     const error = validateField(key, value);

  //     setErrors((prev) => ({
  //       ...prev,
  //       [key]: error || "",
  //     }));
  //   }
  // };

  const updateData = async (updatePayload: T) => {
    try {
      await updateAPI(id, updatePayload);
      setIsEdit(false);
      showNotification({
        title: `${props.localeName}:notification.success`,
        content: <Label text={`${props.localeName}:notification.updateSuccess`} translate />,
        position: "top-right",
        color: "success",
        enableOtherElements: true,
      });
    } catch (error) {
      showNotification({
        title: `${props.localeName}:notification.error`,
        content: <Label text={(error as Error)?.message || `${props.localeName}:notification.updateError`} translate />,
        position: "top-right",
        color: "danger",
        enableOtherElements: true,
      });
    }
  };

  return (
    <Form
      formTitle={""}
      manualBelowButtons={true}
      onSubmit={() => {}}
      isPopup={false}
      className={""}
      onSubmitNoReload
      onSubmitClosePopUp
      ref={formRef}
    >
      {/* Show avatar and upload images

			<div className="flex items-center gap-4 mb-6">
        <Image
          src="/icon-pasona.png"
          alt={`${localeName} Avatar`}
          className="w-24 h-24 rounded-full border"
          width={100000}
          height={100000}
        />
        <Input type="file" />
      </div> */}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-16">
        {Object.keys(detailFields).map((key) => (
          <div key={key}>
            <Label text={detailFields[key].label} translate />
            <Input
              type={key === "password" ? "password" : "text"}
              name={key}
              defaultValue={itemData?.[key as keyof typeof itemData] as string}
              inputClassName="disabled:bg-gray-100 transition-all duration-500 border-2 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              disabled={detailFields[key].changable ? !isEdit : true}
              isError={!!errors[key]}
              // onBlur={(e) => handleBlur(key, e.target.value)}
              onFocus={(e) => key === "password" && (e.target.value = "")}
            />
          </div>
        ))}
      </div>
      <div className="flex flex-row-reverse gap-4">
        <Button
          action={handleDelete}
          text={"common:button.delete"}
          mainColor="primary"
          border={true}
          className="my-3 w-full !py-2 !px-8 bg-white text-black font-semibold rounded-md shadow hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <Button
          action={() => {}}
          onMouseDown={isEdit ? handleSave : handleActivateEdit}
          text={isEdit ? "common:button.save" : "common:button.edit"}
          mainColor="primary"
          border={true}
          className="my-3 w-full !py-2 !px-8 !bg-indigo-600 text-white font-semibold rounded-md shadow hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>
    </Form>
  );
}
