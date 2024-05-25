import Layout from "@/components/Layout.tsx";
import LeaveHouseForm from "@/islands/LeaveHouseForm.tsx";
import GoBackAnchor from "@/components/Common/GoBackAnchor.tsx";

export default function LeaveHouse() {
  return (
    <Layout title="Roomoney 💰 - Leave House">
      <>
        <div className="container-sm mt-4">
          <h1 class="text-success">Leave someone's virtual household here</h1>
          <p>
            <p class="text-secondary">
              You can leave someone's virtual household. If you are an owner,
              you cannot leave a household but you can delete it. You can always
              rejoin someone's house, join another one or create your own
              virtual household.
            </p>
          </p>
        </div>
        <LeaveHouseForm />
        <GoBackAnchor link="/dashboard/house" />
      </>
    </Layout>
  );
}
