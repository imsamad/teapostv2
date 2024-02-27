"use server";

import fetchClient from "@/lib/fetchClient";
import { cookies } from "next/headers";

export async function register(params: any) {
  try {
    const res = await fetchClient(
      `/auth/register`,
      {
        method: "POST",
        body: JSON.stringify(params),
        headers: {
          "content-type": "application/json",
        },
      },
      false
    );

    return {
      error: !res.ok,
      data: await res.json(),
    };
  } catch (err: any) {
    throw err;
  }
}

export async function postLogin(data: any) {
  try {
    if (data.user)
      cookies().set(
        process.env.AUTHED_USER_DETAILS!,
        JSON.stringify(data.user),
        {
          httpOnly: process.env.NODE_ENV == "production",
          sameSite: "strict",
          secure: process.env.NODE_ENV == "production",
          maxAge: 5 * 60 * 1000,
        }
      );

    if (data.session)
      cookies().set(process.env.AUTHED_USER_SESSION!, data.session, {
        httpOnly: process.env.NODE_ENV == "production",
        sameSite: "strict",
        secure: process.env.NODE_ENV == "production",
        maxAge: 5 * 60 * 1000,
      });
    return data;
  } catch (err) {
    console.error(err);
    return { error: "wat" };
  }
}

export async function getAuthUser() {
  const cookiesStore = cookies();
  const user = cookiesStore.get(process.env.AUTHED_USER_DETAILS!)?.value;
  if (user)
    return {
      session: cookiesStore.get(process.env.AUTHED_USER_SESSION!)?.value,
      user: JSON.parse(user),
    };
  return null;
}

export async function logout() {
  cookies().delete(process.env.AUTHED_USER_SESSION!);
  cookies().delete(process.env.AUTHED_USER_DETAILS!);
  return "ok";
}
