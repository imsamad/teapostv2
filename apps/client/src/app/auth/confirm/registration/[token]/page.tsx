import { Box, Heading } from "@radix-ui/themes";
import { redirect } from "next/navigation";

import fetchClient from "@/lib/fetchClient";
import Redirect from "./Redirect";
import Link from "next/link";

const page = async ({ params: { token } }: { params: { token: string } }) => {
  const url = `/auth/confirm/registration/${token}`;

  try {
    const res = await fetchClient(
      url,
      {
        method: "POST",
      },
      false
    );
    if (res.ok) {
      return (
        <Box className="w-sreen h-screen flex flex-col justify-center items-center">
          <Link href="/">
            <Heading size="9" className="underline italic">
              Teapost
            </Heading>
          </Link>

          <Heading my="4">Confirmed! Go to Login page</Heading>
          <Redirect />
        </Box>
      );
    } else {
      redirect("/not-found");
    }
  } catch (err) {
    redirect("/not-found");
  }
};

export default page;
