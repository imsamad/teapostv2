import clsx, { ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export const typeOf = (
  val: any,
  type: string | "string" | "array" | "object"
) =>
  !val ? false : val?.constructor?.name?.toLowerCase() === type.toLowerCase();

export function getCookieClientSide(cname: string) {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

export function setCookieClientSide(
  cname: string,
  cvalue: string,
  exdays = 365
) {
  const d = new Date();
  d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
  let expires = "expires=" + d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires;
}

/*
This function merges functionality from clsx and twMerge
clsx: used for conditional css
twMerge: used for replacing repetitive styles
*/

export const cn = (...classes: ClassValue[]) => {
  return twMerge(clsx(...classes));
};
