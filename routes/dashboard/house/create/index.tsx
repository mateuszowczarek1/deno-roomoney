import Layout from "@/components/Layout.tsx";
import CreateHouseForm from "@/islands/CreateHouseForm.tsx";
import GoBackAnchor from "@/components/Common/GoBackAnchor.tsx";

export default function CreateHouse() {
  return (
    <Layout title="Roomoney 💰 - Create house">
      <>
        <div className="container-sm mt-4">
          <h1 class="text-success">Create a new virtual household here</h1>
          <p>
            <p class="text-secondary">
              When a household is created, you will see a household secret code.
              Copy it and share with someone to join you. If you don't copy the
              code now, you can find it in Dashboard/Manage households
            </p>
          </p>
        </div>
        <CreateHouseForm />
        <GoBackAnchor link="/dashboard/house" />
      </>
    </Layout>
  );
}
