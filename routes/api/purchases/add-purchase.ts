import { Handlers } from "$fresh/server.ts";
import { ObjectId } from "mongodb";
import { HouseWithIdType } from "@/interfaces/HouseInterface.ts";
import PurchaseWithoutId, { PurchaseWithoutIdType } from "@/interfaces/PurchaseInterface.ts";
import type { UserWithIdType } from "@/interfaces/UserInterface.ts";
import { Status } from "httpStatus";
import { ZodError } from "zod";
import { Houses, Purchases } from "@/main.ts";

export const handler: Handlers = {
  async POST(req: Request, ctx) {
    const user = ctx.state.user as unknown as UserWithIdType;
    const foundHouse = await Houses.findOne({
      _id: { $in: user.houses },
    }) as HouseWithIdType | null;

    if (!foundHouse) {
      return new Response(
        JSON.stringify({
          message: "You are not in any household right now.",
          status: Status.Forbidden,
        }),
        {
          headers: { "Content-Type": "application/json}" },
          status: Status.Forbidden,
        },
      );
    }
    if (foundHouse.users.length < 2) {
      return new Response(
        JSON.stringify({
          message:
            "You cannot add any purchases. You are the only person in the household. Share a secret code with somebody and let them join you here.",
          status: Status.NotAcceptable,
        }),
        {
          headers: { "Content-Type": "application/json}" },
          status: Status.NotAcceptable,
        },
      );
    }

    const purchaseData = await req.json() as PurchaseWithoutIdType;

    const updatedPurchase = {
      ...purchaseData,
      paidBy: new ObjectId(
        purchaseData.paidBy),
        house: foundHouse._id,
    };
    try {
      const readyToSavePurchase: PurchaseWithoutIdType = await PurchaseWithoutId.parseAsync(updatedPurchase);
      await Purchases.insertOne(readyToSavePurchase);
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
      const zodError = JSON.parse(e);
      const firstError: ZodError = zodError[0].message;
      return new Response(
        JSON.stringify({
          message: firstError,
          status: Status.UnprocessableEntity,
        }),
        {
          headers: { "Content-Type": "application/json}" },
          status: Status.UnprocessableEntity,
        },
      );
    }
  },
};
