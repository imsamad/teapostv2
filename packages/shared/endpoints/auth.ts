import { z } from "zod";
export const LoginSchema = z.object({
  identifier: z
    .string({
      required_error: "Identifier is required, either email or username.",
    })
    .min(1, "Identifier is required, either email or username."),
  password: z.string().min(1, "Password is required."),
});

export type TLoginSchema = z.infer<typeof LoginSchema>;

export const UserRegisterSchema = z
  .object({
    email: z
      .string({
        required_error: "Email is required.",
      })
      .email("Email is required")
      .trim(),

    fullName: z
      .string({
        required_error: "FullName is required.",
      })
      .min(5),

    password: z
      .string({
        required_error: "Password is required.",
      })
      .min(8, "Password must contain 8 characters."),

    confirmPassword: z.string({
      required_error: "ConfirmPassword is required.",
    }),
  })
  .refine(
    ({ password, confirmPassword }) => password && password == confirmPassword,
    {
      path: ["confirmPassword"],
      message: "Password dont't match",
    }
  );

export type TUserRegisterSchema = z.infer<typeof UserRegisterSchema>;
