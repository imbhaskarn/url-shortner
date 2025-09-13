import * as React from "react";



import { cn } from "../../lib/utils";

const Button = React.forwardRef<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement>>(
  ({ className, ...props }, ref) => (
    <button
      ref={ref}
      className={cn(
        "text-gray-100 inline-flex items-center px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium  bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200",
        className
      )}
      {...props}
    />
  )
);
Button.displayName = "Button";


export { Button }