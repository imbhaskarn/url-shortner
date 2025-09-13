import * as React from "react";
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import { cn } from "../../lib/utils";
import { ChevronDown, ChevronUp } from "lucide-react";

// Ensure `dir` property matches the expected type in your version of Radix UI
type Direction = 'left' | 'right' | 'up' | 'down';

export const DropdownMenu = ({ children, ...props }: React.ComponentProps<typeof DropdownMenuPrimitive.Root>) => (
  <DropdownMenuPrimitive.Root {...props}>
    {children}
  </DropdownMenuPrimitive.Root>
);

export const DropdownMenuTrigger = ({ children, ...props }: React.ComponentProps<typeof DropdownMenuPrimitive.Trigger>) => (
  <DropdownMenuPrimitive.Trigger {...props}>
    {children}
  </DropdownMenuPrimitive.Trigger>
);

export const DropdownMenuContent = ({ children, ...props }: React.ComponentProps<typeof DropdownMenuPrimitive.Content> & { dir?: Direction }) => (
  <DropdownMenuPrimitive.Content
    {...props}
    className={cn(
      "z-50 mt-2 rounded-md border bg-white shadow-lg dark:bg-gray-800",
      props.className
    )}
  >
    {children}
  </DropdownMenuPrimitive.Content>
);

export const DropdownMenuItem = ({ children, ...props }: React.ComponentProps<typeof DropdownMenuPrimitive.Item>) => (
  <DropdownMenuPrimitive.Item
    {...props}
    className={cn(
      "flex items-center px-4 py-2 text-sm text-gray-900 hover:bg-gray-100 dark:text-gray-100 dark:hover:bg-gray-700",
      props.className
    )}
  >
    {children}
  </DropdownMenuPrimitive.Item>
);

export const DropdownMenuSeparator = (props: React.ComponentProps<typeof DropdownMenuPrimitive.Separator>) => (
  <DropdownMenuPrimitive.Separator
    {...props}
    className={cn(
      "my-1 border-t dark:border-gray-700",
      props.className
    )}
  />
);

