import { z } from "zod";

export const UserSchema = z.object({
  username: z.string({ required_error: "Username is requried!" }),
  email: z.string({ required_error: "Email is requried!" }).email(),
  fullName: z.string({ required_error: "FullName is requried!" }),
  profilePic: z.string(),
});

export type TUserSchema = z.infer<typeof UserSchema>;
