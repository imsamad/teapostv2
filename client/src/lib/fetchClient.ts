const fetchClient = async (
  url: string,
  reqOptions: RequestInit = {},
  auth = true
) => {
  try {
    if (!url.startsWith("http")) {
      if (typeof window != "undefined")
        url = process.env.NEXT_PUBLIC_API_URL + url;
      else url = process.env.API_URL + url;
    }

    if (auth) {
      if (typeof window != "undefined") {
        reqOptions.credentials = "include";
      } else {
        const headers: any = await import("next/headers");

        if (headers.cookies) {
          let authSession = headers
            .cookies()
            .get(process.env.AUTHED_USER_SESSION)?.value;

          reqOptions.headers = {
            ...reqOptions.headers,
            Authorization: `Bearer ${authSession}`,
          };
        }
      }
    }
  } catch (err) {
  } finally {
    reqOptions.credentials = "include";

    return fetch(url, reqOptions);
  }
};

export default fetchClient;
