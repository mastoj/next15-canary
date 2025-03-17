import { cn } from "@/lib/utils";
import { PropsWithChildren } from "react";

export const Box = async ({
  children,
  className,
}: PropsWithChildren<{ className?: string }>) => {
  return (
    <div
      className={cn(
        "w-full h-20 flex justify-center items-center gap-2",
        className
      )}
    >
      {children}
    </div>
  );
};
