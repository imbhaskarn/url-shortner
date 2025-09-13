import * as React from "react";
import { cn } from "../../lib/utils";

const Badge = React.forwardRef<HTMLSpanElement, React.HTMLProps<HTMLSpanElement>>(
  ({ className, ...props }, ref) => (
    <span
      ref={ref}
      className={cn(
        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800",
        className
      )}
      {...props}
    />
  )
);
Badge.displayName = "Badge";
export { Badge }