import Layout from "@/components/Layout.tsx";
import Anchor from "@/components/Common/Anchor.tsx";

export default function Dashboard() {
  return (
    <Layout title="Roomoney 💰 - Dashboard">
      <>
        <h1>Dashboard</h1>
        <p>
          You are logged in. Manage your virtual households, purchases from here
          ✨.
        </p>
        <div class="d-flex justify-content-center mt-4 gap-4 p-4 flex-wrap">
          <div class="card border-secondary mb-3" style="max-width: 20rem;">
            <div class="card-header">Purchases</div>
            <div class="card-body">
              <h4 class="card-title">
                See, add, edit, remove purchases in your household.
              </h4>
              <p class="card-text">
                <Anchor
                  name="🛒 Go to purchases"
                  link="/dashboard/purchase"
                  class="btn btn-info"
                />
              </p>
            </div>
          </div>
          <div class="card border-secondary mb-3" style="max-width: 20rem;">
            <div class="card-header">Manage your houses</div>
            <div class="card-body">
              <h4 class="card-title">Create, join or delete households.</h4>
              <p class="card-text">
                <Anchor
                  name="🏠 Manage households"
                  link="/dashboard/house"
                  class="btn btn-info"
                />
              </p>
            </div>
          </div>
          <div class="card border-secondary mb-3" style="max-width: 20rem;">
            <div class="card-header">Go back</div>
            <div class="card-body">
              <h4 class="card-title">Go back</h4>
              <p class="card-text">
                <Anchor
                  name="🏡 Go to the home page"
                  link="/"
                  class="btn btn-info"
                />
              </p>
            </div>
          </div>
        </div>
      </>
    </Layout>
  );
}
