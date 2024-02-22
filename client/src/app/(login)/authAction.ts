"use server";

import { cookies } from "next/headers";

const AUTHED_USER_SESSION = "auth-session";
const AUTHED_USER_DETAILS = "auth-user";

export async function register(params: any) {
  try {
    const res = await fetch(`${process.env.API_URL}/auth/register`, {
      method: "POST",
      body: JSON.stringify(params),
      headers: {
        "content-type": "application/json",
      },
    });

    const data = await res.json();
    return data;
  } catch (err) {
    console.error(err);
  }
}

export async function login(data: any) {
  try {
    cookies().set(AUTHED_USER_SESSION, data.session, {
      httpOnly: process.env.NODE_ENV == "production",
      sameSite: "strict",
      secure: process.env.NODE_ENV == "production",
      maxAge: 5 * 60 * 1000,
    });

    cookies().set(AUTHED_USER_DETAILS, JSON.stringify(data.user), {
      httpOnly: process.env.NODE_ENV == "production",
      sameSite: "strict",
      secure: process.env.NODE_ENV == "production",
      maxAge: 5 * 60 * 1000,
    });

    cookies().set("N", JSON.stringify(data.user), {
      httpOnly: process.env.NODE_ENV == "production",
      sameSite: "none",
      secure: process.env.NODE_ENV == "production",
      maxAge: 5 * 60 * 1000,
    });
    cookies().set("L", JSON.stringify(data.user), {
      httpOnly: process.env.NODE_ENV == "production",
      sameSite: "lax",
      secure: process.env.NODE_ENV == "production",
      maxAge: 5 * 60 * 1000,
    });
    return data;
  } catch (err) {
    console.error(err);
    return { error: "wat" };
  }
}

export async function isLoggedIn() {
  return cookies().get(AUTHED_USER_SESSION)
    ? {
        session: cookies().get(AUTHED_USER_SESSION)?.value,
        user: cookies().get(AUTHED_USER_DETAILS)?.value,
      }
    : null;
}

export async function logout() {
  cookies().delete(AUTHED_USER_SESSION);
  cookies().delete(AUTHED_USER_DETAILS);
  return "ok";
}
