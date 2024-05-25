import { MiddlewareHandlerContext } from "$fresh/server.ts";
import * as squishyCookies from "squishyCookies";

import envConfig from "@/utils/config.ts";
import { UserWithIdType as UserWithId } from "@/interfaces/UserInterface.ts";
import { Users } from "@/main.ts";
import { ObjectId } from "mongodb";

interface State {
  user:
    | UserWithId
    | null;
}
export async function handler(
  req: Request,
  ctx: MiddlewareHandlerContext<State>,
) {
  try {
    const cookieVerification = await squishyCookies.verifySignedCookie(
      req.headers,
      "auth",
      envConfig.cookie_secret,
    );
    const userId = (cookieVerification as string).split(".")[0];
    const findUser = await Users.findOne({ _id: new ObjectId(userId) });
    if (findUser) {
      ctx.state.user = findUser as UserWithId;
    } else {
      ctx.state.user = null;
    }
  } catch {
    ctx.state.user = null;
  }
  return ctx.next();
}
