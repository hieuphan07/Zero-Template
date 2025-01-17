import Input from "@/shared/components/Atoms/Input/Input";
import Label from "@/shared/components/Atoms/Label/Label";
import { useTranslation } from "react-i18next";
import { UserFormProps } from "@/shared/types/components-type/user-form-type";
import { getUserFormFields } from "@/app/admin/user/constants/form-fields";

const UserInfoTab = (props: Partial<UserFormProps>) => {
  const { t } = useTranslation(["common", "user-management"]);

  const fields = getUserFormFields(props.user, props.hidePassword);

  return (
    <div className="flex flex-col gap-4 w-full mt-4">
      {fields.map(
        (field) =>
          !field.hidden && (
            <div key={field.id} className="w-full">
              {field.type === "hidden" ? (
                <Input type="hidden" name={field.id} defaultValue={field.defaultValue} />
              ) : (
                <>
                  <Label
                    htmlFor={field.id}
                    translate={true}
                    t={t}
                    text={field.label}
                    required={field.required} // in order to display (*) for required field
                    className="text-base mb-1"
                  />
                  <Input
                    required={field.required}
                    type={field.type}
                    id={field.id}
                    name={field.id}
                    placeholder={field.placeholder}
                    defaultValue={field.value}
                    isError={!!props.errors?.[field.id as keyof typeof props.errors]}
                  />
                </>
              )}
            </div>
          ),
      )}
    </div>
  );
};

export default UserInfoTab;
