import { MiddlewareHandlerContext } from "$fresh/server.ts";
import envConfig from "@/utils/config.ts";
import { isLogged } from "@/signals/isLogged.tsx";

interface State {
  user:
    | string
    | null;
  message: string;
}

export async function handler(
  _req: Request,
  ctx: MiddlewareHandlerContext<State>,
) {
  if (ctx.state.user) {
    isLogged.value = true;
    return await ctx.next();
  } else {
    isLogged.value = false;
    const message = encodeURIComponent("Unauthorized 😭. You need to log in.");
    return Response.redirect(`${envConfig.base_url}?message=${message}`);
  }
}
