"use client";

import { LabelProps } from "@/shared/types/components-type/label-type";

const Label = (props: LabelProps) => {
  const truncateText = (text: string) => {
    const translated = props.translate ? props.t?.(text) : text;
    if (!props.truncate) return translated;
    return translated ? (translated.length > 10 ? `${translated.slice(0, 10)}...` : translated) : text;
  };

  return (
    <label
      className={`
        relative custom-label
        ${props.inheritedClass ? "" : "block text-sm font-medium text-gray-700"}
        ${props.className}
        ${props.onClick ? "cursor-pointer" : ""}
      `}
      onClick={props.onClick}
      htmlFor={props.htmlFor}
    >
      {truncateText(props.text)}
      {props.required && <span className="text-red-500 ml-1">*</span>}
      <span
        className={`
          absolute left-0 top-full z-10
          hidden
           ${
             props.truncate &&
             ((props.translate && props.t && props.t(props.text).length > 10) ||
               (!props.translate && props.text.length > 10)) &&
             "label-extended-span"
           }
          bg-black text-white
          px-2 py-1 rounded
          text-sm whitespace-nowrap
        `}
      >
        {props.t ? props.t(props.text) : props.text}
      </span>
    </label>
  );
};

export default Label;
