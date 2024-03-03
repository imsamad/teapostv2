import { Button, Flex, Heading } from "@radix-ui/themes";
import Link from "next/link";

const page = async ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Heading>Dashboard</Heading>
      <Flex gap="2" my="2">
        <Link className="flex-1 rounded-none" href="/me">
          <Button className="w-full rounded-none" color="crimson">
            Stories
          </Button>
        </Link>
        <Link className="flex-1 rounded-none" href="/me/profile">
          <Button className="w-full rounded-none">Profile</Button>
        </Link>
      </Flex>
      {children}
    </>
  );
};

export default page;
