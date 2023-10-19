import { cn } from "@/lib/utils"

function Skeleton({
  className,
  children,
  isLoaded = false,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & { isLoaded: boolean }) {
  return isLoaded ? (
    children
  ) : (
    <div
      className={cn("animate-pulse rounded-md bg-muted", className)}
      {...props}
    >
      <div className="invisible">{children}</div>
    </div>
  )
}

export { Skeleton }
