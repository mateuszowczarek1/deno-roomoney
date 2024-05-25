import { Handlers } from "$fresh/server.ts";
import { Status } from "httpStatus";
import { HouseWithIdType } from "@/interfaces/HouseInterface.ts";
import { UserWithIdType } from "@/interfaces/UserInterface.ts";
import envConfig from "@/utils/config.ts";
import { Houses, Users } from "@/main.ts";

export const handler: Handlers = {
  async PUT(req: Request, ctx) {
    const data = await req.json();
    if (data.secretCode) {
      try {
        const foundHouse = await Houses.findOne({
          secretCode: data.secretCode,
        }) as HouseWithIdType;
        const foundUser = ctx.state.user as UserWithIdType;
        if (!foundHouse) {
          return new Response(
            JSON.stringify({
              message: "Secret code is invalid.",
              status: Status.UnprocessableEntity,
            }),
            {
              headers: { "Content-Type": "application/json}" },
              status: Status.UnprocessableEntity,
            },
          );
        }
        if (foundUser._id.equals(foundHouse.owner)) {
          return new Response(
            JSON.stringify({
              message: "You cannot join your own house again.",
              status: Status.Forbidden,
            }),
            {
              headers: { "Content-Type": "application/json}" },
              status: Status.Forbidden,
            },
          );
        } else if (foundUser.houses.length) {
          return new Response(
            JSON.stringify({
              message:
                "You already joined a house. Leave current household before joining another one.",
              status: Status.Forbidden,
            }),
            {
              headers: { "Content-Type": "application/json}" },
              status: Status.Forbidden,
            },
          );
        } else if (foundHouse.users.length >= 2) {
          return new Response(
            JSON.stringify({
              message: "House is already full.",
              status: Status.Forbidden,
            }),
            {
              headers: { "Content-Type": "application/json}" },
              status: Status.Forbidden,
            },
          );
        }
        await Users.updateOne({ _id: foundUser._id }, {
          $push: { houses: foundHouse._id },
        });
        await Houses.updateOne({ secretCode: foundHouse.secretCode }, {
          $push: { users: foundUser._id },
        });
        return new Response(
          JSON.stringify({
            location:
              `${envConfig.base_url}?message=${"You joined the household. 🏡. Go to the dashboard and add purchases."}`,
            status: Status.Created,
          }),
          {
            headers: { "Content-Type": "application/json}" },
            status: Status.Created,
          },
        );
      } catch (error) {
        console.error(error);
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
    }
    return new Response(
      JSON.stringify({
        message: "Invalid data provided.",
        status: Status.UnprocessableEntity,
      }),
      {
        headers: { "Content-Type": "application/json}" },
        status: Status.UnprocessableEntity,
      },
    );
  },
};
