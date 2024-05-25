import { Handlers } from "$fresh/server.ts";
import Layout from "@/components/Layout.tsx";
import { UserWithIdType } from "@/interfaces/UserInterface.ts";
import RecievePurchaseForm from "@/islands/RecievePurchaseForm.tsx";
import { Houses, Users } from "@/main.ts";

export const handler: Handlers = {
  async GET(_req, ctx) {
    const foundUser = ctx.state.user as UserWithIdType;
    const foundHouse = await Houses.findOne({ users: foundUser._id });
    if (!foundHouse) {
      return ctx.render({
        errorMessage:
          "You haven't joined or created any household. Adding purchases will not work.",
      });
    }
    if (foundHouse.users.length < 2) {
      return ctx.render({
        errorMessage:
          "You are the only one in your household. Adding purchases will not work.",
      });
    }
    const users = await Users.find({ _id: { $in: foundHouse.users } }).toArray();
    const otherUser =
      users.filter((user) =>
        user._id.toString() != foundUser._id.toString()
      )[0];
    return ctx.render({
      otherUser,
    });
  },
};

export interface RecievePurchaseHouseInterface {
  errorMessage: string | null;
  otherUser: UserWithIdType;
}

export default function AddPurchase(
  { data }: { data: RecievePurchaseHouseInterface },
) {
  return (
    <Layout title="Roomoney 💰 - Recieved Payment">
      <div className="container-sm mt-4">
        <h1>Recieved payment</h1>
        <p>
          If you recieved payment from your roomate, fill the form below 😃.
        </p>
        <RecievePurchaseForm data={data} />
      </div>
    </Layout>
  );
}
