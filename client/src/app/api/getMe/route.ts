import { cookies } from "next/headers";

export async function GET() {
  return Response.json({
    cookies: cookies().getAll(),
  });
}
