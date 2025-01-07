import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-primary hover:bg-primary focus-within:border-primary hover:border-primary accent-primary text-primary text-primary-foreground focus:ring-primary hover:text-primary-foreground border border-primary hover:text-primary",
        destructive:
          "bg-danger hover:bg-danger focus:border-danger hover:border-danger accent-danger text-danger text-danger-foreground focus:ring-danger hover:text-danger-foreground border border-danger hover:text-danger",
        outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary hover:bg-secondary focus:border-secondary hover:border-secondary accent-secondary text-secondary text-secondary-foreground focus:ring-secondary hover:text-secondary-foreground border border-secondary hover:text-secondary",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline bg-background",
        warning:
          "bg-warning hover:bg-warning focus:border-warning hover:border-warning accent-warning text-warning text-warning-foreground focus:ring-warning hover:text-warning-foreground border border-warning hover:text-warning",
        success:
          "bg-success hover:bg-success focus:border-success hover:border-success accent-success text-success text-success-foreground focus:ring-success hover:text-success-foreground border border-success hover:text-success",
        info: "bg-info hover:bg-info focus:border-info hover:border-info accent-info text-info text-info-foreground focus:ring-info hover:text-info-foreground border border-info hover:text-info",
        light:
          "bg-light hover:bg-light focus:border-light hover:border-light accent-light text-light text-light-foreground focus:ring-light hover:text-light-foreground border border-light hover:text-light",
        dark: "bg-dark hover:bg-dark focus:border-dark hover:border-dark accent-dark text-dark text-dark-foreground focus:ring-dark hover:text-dark-foreground border border-dark hover:text-dark",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
