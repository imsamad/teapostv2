import Navbar from "@/components/Navbar";
import { Box, ScrollArea } from "@radix-ui/themes";
import React from "react";

const GenericLayout = ({
  children,
  showRightBtns,
}: {
  children: React.ReactNode;
  showRightBtns: boolean;
}) => {
  return (
    <Box className="max-w-screen w-screen max-h-screen overflow-hidden h-full  flex flex-col">
      <Navbar showRightBtns={showRightBtns} />
      <ScrollArea
        type="auto"
        scrollbars="vertical"
        style={{
          minHeight: "100%",
          height: "100%",
        }}
        className="flex-1 h-full p-4 pt-0"
      >
        {children}
      </ScrollArea>
    </Box>
  );
};

export default GenericLayout;
