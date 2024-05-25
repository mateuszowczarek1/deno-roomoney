import { ObjectId } from "mongodb";
import { z } from "zod";

const PurchaseWithoutId = z.object({
  name: z.string({
    required_error:
      "Purchase name should be at least 5 characters long but not more than 30.",
  }).min(5).max(30),
  paidBy: z.instanceof(ObjectId),
  amount: z.number(),
  house: z.instanceof(ObjectId),
  purchaseDate: z.date({ required_error: "Date is required" }).default(
    new Date(),
  ),
});

const PurchaseWithId = PurchaseWithoutId.extend({
  _id: z.instanceof(ObjectId),
});

export type PurchaseWithIdType = z.infer<typeof PurchaseWithId>;
export type PurchaseWithoutIdType = z.infer<typeof PurchaseWithoutId>;

export default PurchaseWithoutId;
