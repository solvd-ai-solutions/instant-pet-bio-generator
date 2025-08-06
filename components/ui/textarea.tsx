import * as React from "react";

import { cn } from "./utils";

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "input-base min-h-16 w-full resize-none",
        className,
      )}
      {...props}
    />
  );
}

export { Textarea };
