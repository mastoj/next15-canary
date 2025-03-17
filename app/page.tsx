import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { cacheLife } from "next/dist/server/use-cache/cache-life";
import { cacheTag } from "next/dist/server/use-cache/cache-tag";
import { PropsWithChildren, Suspense } from "react";

const Box = async ({
  children,
  className,
}: PropsWithChildren<{ className?: string }>) => {
  return (
    <div
      className={cn(
        "w-full h-20 flex justify-center items-center gap-2 py-8 px-4",
        className
      )}
    >
      {children}
    </div>
  );
};

const Content = async () => {
  // Sleep for 2 seconds
  await new Promise((resolve) => setTimeout(resolve, 2000));
  return <Box>Hello streamed content!</Box>;
};

const CachedContent = async () => {
  "use cache";
  const text = (await new Promise((resolve) =>
    setTimeout(() => resolve(new Date().toUTCString()), 2000)
  )) as string;

  console.log("==> Cached content: ", text);
  cacheLife("minutes");
  cacheTag("cached-content");

  return (
    <Box className="flex-col">
      Hello cached content!
      <div>{text}</div>
    </Box>
  );
};

const ContentSkeleton = () => {
  return (
    <Box className="py-0">
      <Skeleton className="w-full h-full flex justify-center items-center">
        Loading...
      </Skeleton>
    </Box>
  );
};

const StaticStreamingPage = async () => {
  return (
    <div className="h-full w-full flex *:border *:border-blue-700 py-8 gap-2 max-w-lg mx-auto">
      <Suspense fallback={<ContentSkeleton />}>
        <Content />
      </Suspense>
      <CachedContent />
    </div>
  );
};

export default StaticStreamingPage;
