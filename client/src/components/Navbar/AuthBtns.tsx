"use client";
import { Box, Button, Flex } from "@radix-ui/themes";
import LogoutBtn from "../LogoutBtn";
import Search from "./Search";
import Write from "./Write";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Theme from "./Theme";

const AuthBtns = ({ loggedUser, logout }: any) => {
  const pathname = usePathname();
  console.log("pathname: ", pathname);
  const include = ["/login", "/register", "/auth/confirm"].filter((path) =>
    pathname.startsWith(path)
  ).length;

  console.log("include: ", include);
  if (include) {
    return <></>;
  }
  return (
    <>
      <Box className="md:order-2 flex-1 order-3 hidden  md:flex">
        <Search />
      </Box>

      {/* <Link href="/one">
              <Button>One</Button>
            </Link>
            <Link href="/two">
              <Button>Two</Button>
            </Link> */}
      <Flex className="items-center md:order-3 order-2">
        {/* This extra flex wraaper is neededfor gap consistency. */}
        <Flex className="gap-x-2">
          {!loggedUser ? (
            <>
              <Button asChild>
                <Link href="/login">Login</Link>
              </Button>
              <Button asChild>
                <Link href="/register">Register</Link>
              </Button>
            </>
          ) : (
            <>
              <LogoutBtn logout={logout} />
              <Write />
            </>
          )}
        </Flex>
        <Theme />
      </Flex>
    </>
  );
};

export default AuthBtns;
