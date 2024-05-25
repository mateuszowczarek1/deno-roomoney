import { Handlers, PageProps } from "$fresh/server.ts";
import Layout from "@/components/Layout.tsx";
import EditPurchaseForm from "@/islands/EditPurchaseForm.tsx";
import { UserWithIdType } from "@/interfaces/UserInterface.ts";

export const handler: Handlers = {
  GET(_req, ctx) {
    const user = ctx.state.user as unknown as UserWithIdType;
    return ctx.render({
      user,
    });
  },
};

export default function EditOne(data: { data: { user: UserWithIdType } }) {
  const id = (data as unknown as PageProps).params.id;
  console.log(id);
  return (
    <Layout title="Roomoney 💰 - Edit Purchase">
      <div className="container-sm mt-4">
        <h1>Dashboard - 🛒 Edit Purchase</h1>
        <p>
          Edit or delete your purchase here 😃.
        </p>
        <EditPurchaseForm id={id} user={data.data.user} />
      </div>
    </Layout>
  );
}
