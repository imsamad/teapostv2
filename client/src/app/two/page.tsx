import { Heading } from "@radix-ui/themes";
import { headers } from "next/headers";

const Two = function (props: any) {
  const headersList = headers();
  const domain = headersList.get("host") || "";
  const fullUrl = headersList.get("referer") || "";
  const pathname = fullUrl.split(domain);
  return (
    <div>
      <Heading>Twoo</Heading>
      <Heading>{Date.now()}</Heading>

      <Heading>{domain}</Heading>
      <Heading>{pathname}</Heading>
      <Heading>{fullUrl}</Heading>
    </div>
  );
};
export const dynamic = "force-dynamic";
export const revalidate = 0;
export default Two;
