"use client";

import { useState, useRef, useEffect, Fragment } from "react";
import Button from "@/shared/components/Atoms/Button/Button";
import { XIcon } from "lucide-react";
import { FormProps } from "@/shared/types/form-type";

const Form = (props: FormProps) => {
  const [isOpen, setIsOpen] = useState(!props.isPopup);
  const formRef = useRef<HTMLDivElement>(null);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (formRef.current && !formRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  if (!props.isPopup) {
    return (
      <form name={props.formName} className={`w-full ${props.className}`}>
        {props.children}
      </form>
    );
  }

  return (
    <div className="relative">
      {props.formButton ? (
        <div onClick={handleToggle}>{props.formButton}</div>
      ) : (
        <Button
          text={props.popUpButtonText ?? "Open Form"}
          action={handleToggle}
          mainColor={props.popUpButtonMainColor ?? "primary"}
          contextColor={props.popUpButtonContextColor}
        />
      )}

      {isOpen && (
        <div className="fixed h-full inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div
            ref={formRef}
            className={`bg-background rounded-lg p-6 w-[80%] h-[80%] animate-slideDown ${props.className}`}
          >
            <form name={props.formName} className={`h-full relative overflow-hidden ${props.className}`}>
              <label
                htmlFor={props.formName}
                className={`flex justify-center w-full text-4xl font-bold ${props.formTextClassName}`}
              >
                {props.formText}
              </label>
              <Button
                text=""
                iconBefore={<XIcon />}
                action={handleToggle}
                mainColor={"default"}
                contextColor={"primary"}
                className="!w-auto absolute top-0 right-0"
                isTransparent={true}
              />
              <div className="h-[85%] overflow-y-auto">{props.children}</div>
              <div
                className={`absolute bottom-0 w-full z-10 bg-background flex justify-end ${props.belowButtonsClassName}`}
              >
                {props.belowButtons?.map((button, index) => <Fragment key={index}>{button}</Fragment>)}
                <Button
                  key={-1}
                  text={"Cancel"}
                  action={handleToggle}
                  mainColor={"primary"}
                  contextColor={"default"}
                  isTransparent={true}
                />
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Form;
