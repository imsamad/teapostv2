import { getAuthUser, logout } from "@/app/(login)/authAction";
import { AvatarIcon } from "@radix-ui/react-icons";
import { Box, Button, Container, Flex, Heading } from "@radix-ui/themes";
import Link from "next/link";
import LogoutBtn from "./LogoutBtn";

const Navbar = async ({ showRightBtns }: { showRightBtns: boolean }) => {
  const loogedUser = await getAuthUser();
  return (
    <Box className="bg-blue-100 text-gray-800 border-b-2 border-gray-300 shadow-md shadow-slate-700">
      <Container>
        <Box
          className={`p-4 flex flex-row md:flex-col ${
            showRightBtns ? "justify-between" : "justify-center"
          }`}
        >
          <Heading className="text-center italic">
            <Link href="/">TEAPOST</Link>
          </Heading>
          {showRightBtns ? (
            <Flex justify="center" gap="4">
              {!loogedUser ? (
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
                  <Button asChild>
                    <Link href="/me">
                      Profile <AvatarIcon />
                    </Link>
                  </Button>
                </>
              )}
            </Flex>
          ) : null}
        </Box>
      </Container>
    </Box>
  );
};

export default Navbar;
