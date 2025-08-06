import * as React from "react";
import { Slot } from "@radix-ui/react-slot@1.1.2";
import { cva, type VariantProps } from "class-variance-authority@0.7.1";

import { cn } from "./utils";

const buttonVariants = cva(
  "btn-base [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "btn-primary",
        destructive: "bg-red-500 text-white outline outline-2 outline-red-500",
        outline: "btn-primary",
        secondary: "bg-muted text-black outline outline-2 outline-black",
        ghost: "bg-transparent outline-none",
        link: "bg-transparent outline-none text-mint underline-offset-4 underline",
      },
      size: {
        default: "btn-md gap-2",
        sm: "btn-sm gap-1.5",
        lg: "btn-lg gap-2",
        icon: "p-2 w-9 h-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
