import * as React from "react";
import * as Toast from "@radix-ui/react-toast";
import { Box, IconButton } from "@radix-ui/themes";
import { Cross1Icon } from "@radix-ui/react-icons";

const ToastTP = ({
  title,
  subtitle,
  open,
  toggle,
}: {
  title: string;
  subtitle?: string;
  open: boolean;
  toggle: (_: boolean) => void;
}) => {
  const timerRef = React.useRef<number>(0);

  React.useEffect(() => {
    // @ts-ignore
    timerRef.current = setTimeout(() => {
      // toggle(false);
    }, 3000);
    return () => clearTimeout(timerRef.current);
  }, []);

  return (
    <Toast.Provider swipeDirection="right">
      <Toast.Root
        className="border-2 border-gray-200 bg-white shadow-lg rounded-md p-4 flex items-center"
        open={open}
        onOpenChange={toggle}
      >
        <Box className="flex-1">
          <Toast.Title className="mb-[5px] font-medium text-slate12 text-lg">
            {title}
          </Toast.Title>
          {subtitle ? <Toast.Description>{subtitle}</Toast.Description> : null}
        </Box>
        <Toast.Action asChild altText="Goto schedule to undo">
          <IconButton className="cursor-pointer" size="2">
            <Cross1Icon />
          </IconButton>
        </Toast.Action>
      </Toast.Root>
      <Toast.Viewport className="[--viewport-padding:_25px] fixed bottom-0 right-0 flex flex-col p-[var(--viewport-padding)] gap-[10px] w-[390px] max-w-[100vw] m-0 list-none z-[2147483647] outline-none" />
    </Toast.Provider>
  );
};

export default ToastTP;
