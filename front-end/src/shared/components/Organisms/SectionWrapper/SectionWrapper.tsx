"use client";

import { SectionWrapperProps } from "@/shared/types/components-type/section-wrapper-type";

const SectionWrapper = ({ children, className = "", maxWidth = "7xl", padding = true }: SectionWrapperProps) => {
  const maxWidthClasses = {
    sm: "max-w-sm",
    md: "max-w-md",
    lg: "max-w-lg",
    xl: "max-w-xl",
    "2xl": "max-w-2xl",
    "7xl": "max-w-7xl",
    full: "max-w-full",
  };

  return (
    <section className={`w-full h-[90vh] overflow-y-auto ${className}`}>
      <div
        className={`
          mx-auto
          ${maxWidthClasses[maxWidth]}
          ${padding ? "px-4 sm:px-6 lg:px-8" : ""}
        `}
      >
        {children}
      </div>
    </section>
  );
};

export default SectionWrapper;
