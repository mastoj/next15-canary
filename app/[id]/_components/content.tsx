import { cookies } from "next/headers";
import { Box } from "./box";

export const Content = async () => {
  const cookieJar = await cookies();
  const text = (await new Promise((resolve) =>
    setTimeout(() => resolve("hello"), 2000)
  )) as string;
  return (
    <Box>
      Hello streamed content! {text} {cookieJar.size}
    </Box>
  );
};
