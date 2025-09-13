import * as React from "react";


import { cn } from "../../lib/utils";

const Slider = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className, ...props }, ref) => (
    <input
      ref={ref}
      type="range"
      className={cn(
        "w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer hover:bg-gray-300",
        className
      )}
      {...props}
    />
  )
);
Slider.displayName = "Slider";

export { Slider }