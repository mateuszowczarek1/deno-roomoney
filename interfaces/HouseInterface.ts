import { ObjectId } from "mongodb";
import { z } from "zod";

const HouseWithoutId = z.object({
  name: z.string({
    required_error:
      "House name should be at least 5 characters long but not more than 30.",
  }).min(5).max(30),
  secretCode: z.string({
    required_error: "Secret code should be 36 characters long",
  }).length(36),
  users: z.instanceof(ObjectId).array().default([]),
  owner: z.instanceof(ObjectId),
});

const HouseWithId = HouseWithoutId.extend({
  _id: z.instanceof(ObjectId),
});

export type HouseWithoutIdType = z.infer<typeof HouseWithoutId>;
export type HouseWithIdType = z.infer<typeof HouseWithId>;

export default HouseWithoutId;
