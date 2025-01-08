"use client";

import { useState, useRef, useEffect, Fragment } from "react";
import Button from "@/shared/components/Atoms/Button/Button";
import { XIcon } from "lucide-react";
import { FormProps } from "@/shared/types/components-type/form-type";
import Label from "../../Atoms/Label/Label";
import { useTranslation } from "react-i18next";

const Form = (props: FormProps) => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(!props.isPopup);
  const formRef = useRef<HTMLDivElement>(null);
  const popupRef = useRef<HTMLDivElement>(null);

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

  useEffect(() => {
    if (!props.isPopup) return;

    const popup = popupRef.current;
    if (isOpen && popup) {
      document.body.appendChild(popup);
    }

    return () => {
      if (popup && popup.parentElement === document.body) {
        document.body.removeChild(popup);
      }
    };
  }, [isOpen, props.isPopup]);

  if (!props.isPopup) {
    return (
      <form
        name={props.formName}
        className={`w-full ${props.className}`}
        onSubmit={
          props.onSubmitNoReload
            ? (event) => {
                event.preventDefault();
                props.onSubmit();
                if (props.onSubmitClosePopUp) {
                  handleToggle();
                }
              }
            : () => {
                props.onSubmit();
                if (props.onSubmitClosePopUp) {
                  handleToggle();
                }
              }
        }
        ref={props.ref}
      >
        <Label
          text={props.formTitle ?? ""}
          t={t}
          translate={true}
          className={`flex justify-center w-full text-4xl font-bold ${props.formTextClassName}`}
          inheritedClass
        />
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
        <div className={`absolute bottom-0 w-full z-10 bg-background flex justify-end ${props.belowButtonsClassName}`}>
          {props.manualBelowButtons ? (
            props.belowButtons?.map((button, index) => <Fragment key={index}>{button}</Fragment>)
          ) : (
            <div className="flex gap-4">
              <Button
                key={-2}
                text={"Submit"}
                action={() => {}}
                mainColor={"primary"}
                contextColor={"default"}
                isTransparent={true}
                border
                type="submit"
              />
              <Button
                key={-1}
                text={"Cancel"}
                action={handleToggle}
                mainColor={"primary"}
                contextColor={"default"}
                isTransparent={true}
                border
              />
            </div>
          )}
        </div>
      </form>
    );
  }

  return (
    <>
      <div className="">
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
      </div>

      <div
        ref={popupRef}
        className={`${isOpen ? "block" : "hidden"} fixed top-0 left-0 h-screen w-screen bg-black bg-opacity-50 flex items-center justify-center z-50`}
      >
        <div
          ref={formRef}
          className={`bg-background rounded-lg p-6 w-[80%] h-[80%] animate-slideDown ${props.className}`}
        >
          <form
            name={props.formName}
            className={`h-full relative overflow-hidden ${props.className}`}
            onSubmit={
              props.onSubmitNoReload
                ? (event) => {
                    event.preventDefault();
                    props.onSubmit();
                    if (props.onSubmitClosePopUp) {
                      handleToggle();
                    }
                  }
                : () => {
                    props.onSubmit();
                    if (props.onSubmitClosePopUp) {
                      handleToggle();
                    }
                  }
            }
            ref={props.ref}
          >
            <Label
              text={props.formTitle ?? ""}
              t={t}
              translate={true}
              className={`flex justify-center w-full text-4xl font-bold ${props.formTextClassName}`}
              inheritedClass
            />
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
              {props.manualBelowButtons ? (
                props.belowButtons?.map((button, index) => <Fragment key={index}>{button}</Fragment>)
              ) : (
                <div className="flex gap-4">
                  <Button
                    key={-2}
                    text={"Submit"}
                    action={() => {}}
                    mainColor={"primary"}
                    contextColor={"default"}
                    isTransparent={true}
                    border
                    type="submit"
                  />
                  <Button
                    key={-1}
                    text={"Cancel"}
                    action={handleToggle}
                    mainColor={"primary"}
                    contextColor={"default"}
                    isTransparent={true}
                    border
                  />
                </div>
              )}
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Form;
