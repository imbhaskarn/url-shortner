// components/ui/skeleton.jsx
import { cn } from "../../lib/utils"

const Skeleton = ({
  className,
  ...props
}) => {
  return (
    <div
      className={cn(
        "animate-pulse rounded-md bg-gray-200 dark:bg-gray-800",
        className
      )}
      {...props}
    />
  )
}

Skeleton.displayName = "Skeleton"

export { Skeleton }