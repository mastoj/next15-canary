import RevalidateButton from "@/components/revalidate-button";
import { revalidateTag } from "next/cache";
import { cacheLife } from "next/dist/server/use-cache/cache-life";
import { cacheTag } from "next/dist/server/use-cache/cache-tag";
import { Box } from "./box";

export const CachedContent = async ({ pageId }: { pageId: string }) => {
  "use cache";
  const text = (await new Promise((resolve) =>
    setTimeout(() => resolve(new Date().toUTCString()), 2000)
  )) as string;
  cacheLife("minutes");
  cacheTag("cached-content");
  return (
    <Box className="flex-col">
      Hello cached content! {pageId}
      <div>{text}</div>{" "}
      <RevalidateButton
        onClick={async () => {
          "use server";
          revalidateTag("cached-content");
        }}
      >
        Revalidate
      </RevalidateButton>
    </Box>
  );
};
