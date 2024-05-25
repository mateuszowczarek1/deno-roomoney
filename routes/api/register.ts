import { Handlers } from "$fresh/server.ts";
import UserWithoutId, { UserWithIdType, UserWithoutIdType } from "@/interfaces/UserInterface.ts";
import envConfig from "@/utils/config.ts";
import { hash } from "bcrypt";
import { Status } from "httpStatus";
import { ZodError } from "zod";
import { Users } from "@/main.ts";

export const handler: Handlers = {
  async POST(req, _ctx) {
    const data = await req.json();
    if (data) {
      try {
        await UserWithoutId.parseAsync({
          login: data.login.trim(),
          password: data.password.trim(),
        });
        if (await Users.findOne({ login: data.login.trim() })) {
          return new Response(
            JSON.stringify({
              message:
                "Login already exists in our database. Try something else.",
              status: Status.UnprocessableEntity,
            }),
            {
              headers: { "Content-Type": "application/json}" },
              status: Status.UnprocessableEntity,
            },
          );
        }
        const userReadyToSave: UserWithoutIdType = await UserWithoutId.parseAsync({...data})
        await Users.insertOne({ ...userReadyToSave, password: await hash(data.password)});
        return new Response(
          JSON.stringify({
            location:
              `${envConfig.base_url}?message=${"Account successfully created 👨‍👨‍👧. You can log in now."}`,
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
