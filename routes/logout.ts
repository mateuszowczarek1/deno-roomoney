import { Handlers } from "$fresh/server.ts";
import * as denoCookie from "https://deno.land/std@0.153.0/http/cookie.ts";
import config from "@/utils/config.ts";

export const handler: Handlers = {
  GET(_req, _ctx) {
    const response = new Response("", {
      status: 302,
      headers: {
        Location: config.base_url,
      },
    });
    denoCookie.deleteCookie(response.headers, "auth", {
      path: config.environment === "production" ? `/` : config.base_url,
      domain: config.environment === "production"
        ? "." + `${config.base_url.split("https://")[1]}`
        : "",
    });
    return response;
  },
};
