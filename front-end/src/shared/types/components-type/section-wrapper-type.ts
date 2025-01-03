import { ReactNode } from "react";

export type SectionWrapperProps = {
  children: ReactNode;
  className?: string;
  maxWidth?: "sm" | "md" | "lg" | "xl" | "2xl" | "7xl" | "full";
  padding?: boolean;
};
