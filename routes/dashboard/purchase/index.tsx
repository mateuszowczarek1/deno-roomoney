import Layout from "@/components/Layout.tsx";
import GoBackAnchor from "@/components/Common/GoBackAnchor.tsx";
import Anchor from "@/components/Common/Anchor.tsx";

export default function DashboardPurchase() {
  return (
    <Layout title="Roomoney 💰 - Purchase">
      <>
        <h1>Dashboard - 🛒 Manage Purchases</h1>
        <p>
          You can create, edit and delete purchases here.
        </p>
        <GoBackAnchor link="/dashboard" />
        <div class="d-flex justify-content-center mt-4 gap-4 p-4 flex-wrap">
          <div class="card border-success mb-3" style="max-width: 20rem;">
            <div class="card-header">Add new purchase</div>
            <div class="card-body">
              <h4 class="card-title">You can add new purchases here.</h4>
              <p class="card-text">
                Click the button below to add new purchase.
              </p>
              <p class="card-text">
                <Anchor
                  link="/dashboard/purchase/add"
                  name="🛒 Add purchase"
                  class="btn btn-info"
                />
              </p>
            </div>
          </div>
          <div class="card border-success mb-3" style="max-width: 20rem;">
            <div class="card-header">List balance and purchases.</div>
            <div class="card-body">
              <h4 class="card-title">
                See the last 50 purchases made for your household.
              </h4>
              <p class="card-text">
                You can list, edit and remove purchases here
              </p>
              <p class="card-text">
                <Anchor
                  link="/dashboard/purchase/list"
                  name="🏡 🧑‍🤝‍🧑 List purchases here"
                  class="btn btn-success"
                />
              </p>
            </div>
          </div>
          <div class="card border-success mb-3" style="max-width: 20rem;">
            <div class="card-header">Recieved transfer?</div>
            <div class="card-body">
              <h4 class="card-title">
                If you currently recieved payment from other resident.
              </h4>
              <p class="card-text">
                Use the button below to note that other user transferred you
                money,
              </p>
              <p class="card-text">
                <Anchor
                  link="/dashboard/purchase/recieve"
                  name="💰 Received payment"
                  class="btn btn-success"
                />
              </p>
            </div>
          </div>
        </div>
      </>
    </Layout>
  );
}
