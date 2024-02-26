import Navbar from "@/components/Navbar";
import { Box, Container, ScrollArea } from "@radix-ui/themes";
import React from "react";

const GenericLayout = ({
  children,
  showRightBtns,
  showSearch,
}: {
  children: React.ReactNode;
  showRightBtns: boolean;
  showSearch: boolean;
}) => {
  return (
    <Box className="max-w-screen w-screen max-h-screen overflow-hidden h-full  flex flex-col">
      <Navbar />
      <ScrollArea
        type="auto"
        scrollbars="vertical"
        style={{
          minHeight: "100%",
          height: "100%",
        }}
        className="flex-1 h-full"
      >
        <Container className="p-2">{children}</Container>
      </ScrollArea>
    </Box>
  );
};

export default GenericLayout;
