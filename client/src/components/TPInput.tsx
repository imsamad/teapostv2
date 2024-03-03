import { EyeClosedIcon, EyeOpenIcon } from "@radix-ui/react-icons";
import { Box, IconButton, Text, TextField } from "@radix-ui/themes";
import { HTMLInputTypeAttribute, useState } from "react";
import { UseFormRegisterReturn } from "react-hook-form";

const TPInput = ({
  label,
  placeholder,
  type,
  register,
  error,
}: {
  label: string;
  register: UseFormRegisterReturn<any>;
  placeholder?: string;
  type: HTMLInputTypeAttribute;
  error?: string;
}) => {
  const [show, setShow] = useState(false);

  return (
    <Box className="w-full">
      <Text size="3">{label}</Text>
      <TextField.Root size="3">
        <TextField.Input
          placeholder={placeholder}
          size="2"
          type={type == "password" ? (show ? "text" : type) : type}
          {...register}
        />
        {type == "password" ? (
          <TextField.Slot>
            <IconButton
              size="1"
              variant="ghost"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setShow((p) => !p);
              }}
            >
              {show ? (
                <EyeClosedIcon height="14" width="14" />
              ) : (
                <EyeOpenIcon height="14" width="14" />
              )}
            </IconButton>
          </TextField.Slot>
        ) : null}
      </TextField.Root>

      {error ? (
        <Text color="red" size="1" className="italic">
          {error}
        </Text>
      ) : null}
    </Box>
  );
};

export default TPInput;
