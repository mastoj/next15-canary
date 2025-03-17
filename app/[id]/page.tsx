import { Skeleton } from "@/components/ui/skeleton";
import { Suspense } from "react";
import { Box } from "./_components/box";
import { CachedContent } from "./_components/cached-content";
import { Content } from "./_components/content";

type PageProps = {
  params: Promise<{ id: string }>;
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

const StaticStreamingPage = async ({ params }: PageProps) => {
  return (
    <div className="h-full w-full flex *:border *:border-blue-700 py-8 gap-2 max-w-xl mx-auto">
      <Suspense fallback={<ContentSkeleton />}>
        <Content />
      </Suspense>
      <Suspense fallback={<ContentSkeleton />}>
        <CachedContent pageId={(await params).id} />
      </Suspense>
    </div>
  );
};

export default StaticStreamingPage;
