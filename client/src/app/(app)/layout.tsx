import { Box, Container, ScrollArea } from "@radix-ui/themes";
import React from "react";
import { LAYOUT_DIMS } from "../LAYOUT_DIMS";

const layout = ({ children }: any) => {
  return (
    <ScrollArea
      type="auto"
      scrollbars="vertical"
      size="2"
      style={{
        height: "100%",
      }}
      //   className={LAYOUT_DIMS.content}
    >
      <Container>
        <Box
          className={
            "relative p-2 log "
            // + LAYOUT_DIMS.content
          }
        >
          {children}
        </Box>
      </Container>
    </ScrollArea>
  );
};

export default layout;
