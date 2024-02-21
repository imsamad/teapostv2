import { Box, Flex, Heading, Text } from "@radix-ui/themes";
import Link from "next/link";

const Navbar = () => {
  return (
    <Box className="p-4 bg-blue-300 text-white border-b-2 border-gray-300">
      <Heading className="text-center">
        <Link href="/"> Abdus Samad</Link>
      </Heading>
      <Flex justify="center" gap="2">
        <Text asChild className="underline">
          <Link href="/">About</Link>
        </Text>
        <Text asChild className="underline">
          <Link href="/team">Our Team</Link>
        </Text>
        <Text asChild className="underline">
          <Link href="/code">Code</Link>
        </Text>
      </Flex>
    </Box>
  );
};

export default Navbar;
