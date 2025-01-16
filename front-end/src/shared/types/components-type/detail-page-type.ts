import { TypeTransfer } from "@/shared/constants/type-transfer";
import { ComponentDefaultProps } from "./component-default-type";

export type DetailPageProps = ComponentDefaultProps & {
  // objectType:
  localeName: string;
  typeString: keyof typeof TypeTransfer;
  validators?: Record<string, (value: string) => string | null>;
  onBack?: () => void;
};
