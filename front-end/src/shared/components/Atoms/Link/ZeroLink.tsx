"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { ZeroLinkProps } from "@/shared/types/link-type";

const ZeroLink = (props: ZeroLinkProps) => {
  const { href, className, target, rel, children, color, title, action, ...rest } = props;

  const baseStyles = cn(`text-${color && color !== "default" ? color : "primary"} relative group font-bold`, className);

  return (
    <Link href={href} className={baseStyles} target={target} rel={rel} title={title} onClick={action} {...rest}>
      {children}
      <span
        className={`absolute left-1/2 -translate-x-1/2 bottom-0 w-0 h-[2px] bg-${color ? color : "primary"} transition-all duration-300 group-hover:w-full`}
      />
    </Link>
  );
};

export default ZeroLink;
