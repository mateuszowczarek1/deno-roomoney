import { Handlers } from "$fresh/server.ts";
import { PurchaseWithIdType } from "@/interfaces/PurchaseInterface.ts";
import type { UserWithIdType } from "@/interfaces/UserInterface.ts";
import { Status } from "httpStatus";
import { ObjectId } from "mongodb";
import { Purchases } from "@/main.ts";

interface PurchaseUpdateDTO {
  name: string;
  amount: number;
  id: ObjectId;
}

export const handler: Handlers = {
  async PUT(req: Request, ctx) {
    const user = ctx.state.user as unknown as UserWithIdType;
    const purchase: PurchaseUpdateDTO = await req.json();

    try {
      const foundPurchase = await Purchases.findOne({
        _id: new ObjectId(purchase.id),
      }) as unknown as PurchaseWithIdType;

      if (!foundPurchase || !foundPurchase.paidBy.equals(user._id)) {
        return new Response(
          JSON.stringify({
            message:
              "Something is wrong. Purchase id not valid or maybe you are trying to edit purchase that you did not make.",
            status: Status.Forbidden,
          }),
          {
            headers: { "Content-Type": "application/json}" },
            status: Status.Forbidden,
          },
        );
      }
      await Purchases.updateOne({ _id: foundPurchase._id }, {
        $set: { name: purchase.name, amount: purchase.amount },
      });

      return new Response(
        JSON.stringify({
          location: `/dashboard/purchase/list`,
          status: Status.Created,
        }),
        {
          headers: { "Content-Type": "application/json}" },
          status: Status.Created,
        },
      );
    } catch (e) {
      console.error(e);
      return new Response(
        JSON.stringify({
          message: "Something went wrong. Try again later.",
          status: Status.InternalServerError,
        }),
        {
          headers: { "Content-Type": "application/json}" },
          status: Status.InternalServerError,
        },
      );
    }
  },
};
