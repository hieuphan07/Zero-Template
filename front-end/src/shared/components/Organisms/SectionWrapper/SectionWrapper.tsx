"use client";

import { SectionWrapperProps } from "@/shared/types/components-type/section-wrapper-type";

const SectionWrapper = (props: SectionWrapperProps) => {
  return (
    <section className={`w-full h-[87.5vh] py-4 overflow-y-auto ${props.className}`}>
      <div
        className={`
          mx-auto p-4 sm:p-6 lg:p-10 bg-white rounded-xl shadow-lg transition-all duration-500 ${props.containerClassName}
        `}
        style={{ maxWidth: `${props.maxWidthPercentage}%` }}
      >
        {props.title && (
          <h1 className={`text-4xl font-bold text-${props.titleColor ? props.titleColor : "primary"} text-center mb-6`}>
            {props.title}
          </h1>
        )}
        {props.children}
      </div>
    </section>
  );
};

export default SectionWrapper;
