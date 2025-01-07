"use client";

import { LabelProps } from "@/shared/types/components-type/label-type";

const Label = (props: LabelProps) => {
  const truncateText = (text: string) => {
    const translated = props.translate ? props.t?.(text) : text;
    return translated ? (translated.length > 10 ? `${translated.slice(0, 10)}...` : translated) : text;
  };

  return (
    <label
      className={`
        group relative
        ${props.inheritedClass ? "" : "block text-sm font-medium text-gray-700"} 
        ${props.className}
      `}
      htmlFor={props.htmlFor}
      suppressHydrationWarning
    >
      {truncateText(props.text)}
      {/* <span
        className={`
          absolute left-0 top-full z-10
          hidden ${
            ((props.translate && props.t && props.t(props.text).length > 10) || (!props.translate && props.text.length > 10)) &&
            "group-hover:block"
          }
          bg-black text-white
          px-2 py-1 rounded
          text-sm whitespace-nowrap
        `}
      >
        {props.t ? props.t(props.text) : props.text}
      </span> */}
    </label>
  );
};

export default Label;
