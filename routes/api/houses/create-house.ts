import { Handlers } from "$fresh/server.ts";
import type { HouseWithoutIdType } from "@/interfaces/HouseInterface.ts";
import HouseWithoutId from "@/interfaces/HouseInterface.ts";
import type { UserWithIdType } from "@/interfaces/UserInterface.ts";
import { Houses, Users } from "@/main.ts";
import envConfig from "@/utils/config.ts";
import { Status } from "httpStatus";
import { ObjectId } from "mongodb";
import { generate as uuid } from "uuid";
import { ZodError } from "zod";

export const handler: Handlers = {
  async POST(req: Request, ctx) {
    const user = ctx.state.user as UserWithIdType;
    const foundHouses = await Houses.find({ _id: { $in: user.houses } })
      .toArray();
    console.log(foundHouses);
    if (foundHouses.length) {
      return new Response(
        JSON.stringify({
          message:
            "You already joined a house. You can leave current virtual household and then create a new one or join someone's virtual house with a secret code.",
          status: Status.NotAcceptable,
        }),
        {
          headers: { "Content-Type": "application/json}" },
          status: Status.NotAcceptable,
        },
      );
    }

    let data = await req.json();

    if (data) {
      data = {
        ...data,
        secretCode: uuid(),
        users: [new ObjectId(user._id)],
        owner: new ObjectId(user._id),
      };

      try {
        await HouseWithoutId.parseAsync(data);

        if (await Houses.findOne({ name: (data as HouseWithoutIdType).name })) {
          return new Response(
            JSON.stringify({
              message:
                "House already exists in our database. Try a different name.",
              status: Status.NotAcceptable,
            }),
            {
              headers: { "Content-Type": "application/json}" },
              status: Status.NotAcceptable,
            },
          );
        }

        const savedHouse = await Houses.insertOne(
          data,
        );

        await Users.updateOne({ _id: user._id }, {
          $push: { houses: savedHouse.insertedId },
        });

        return new Response(
          JSON.stringify({
            location:
              `${envConfig.base_url}?message=${"Virtual household created 🏡. You can manage it from the dashboard."}`,
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
        if (zodError[0].message || zodError.message) {
          const firstError: ZodError = zodError[0].message || zodError.message;
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
        } else {
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
    }
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
  },
};
