import { cn } from "@/lib/utils";

export function Loader({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "flex items-center justify-center mx-auto loader",
        className
      )}
    ></div>
  );
}
