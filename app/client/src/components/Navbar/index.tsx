import { getAuthUser, logout } from "@/app/(auth)/authAction";

import { Box, Container, Heading } from "@radix-ui/themes";
import Link from "next/link";
import AuthBtns from "./AuthBtns";
import Search from "./Search";

const Navbar = async () => {
  const loggedUser = await getAuthUser();

  return (
    <Box className="text-gray-800 border-b-2 border-gray-300 shadow-sm ">
      <Container className="p-2">
        <Box className={`flex gap-2  md:flex-row items-center justify-between`}>
          <Heading size="7" className="order-1">
            <Link href="/">TEAPOST</Link>
          </Heading>
          <AuthBtns loggedUser={loggedUser} logout={logout} />
        </Box>

        <Box className="md:order-2 mt-2 flex  md:hidden">
          <Search />
        </Box>
      </Container>
    </Box>
  );
};

export default Navbar;
