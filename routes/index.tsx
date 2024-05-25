import { Handlers } from "$fresh/server.ts";
import Layout from "@/components/Layout.tsx";
import envConfig from "@/utils/config.ts";
import MainAlert from "@/islands/MainAlert.tsx";
import { isLogged } from "@/signals/isLogged.tsx";
import SingleCard from "@/components/Common/SingleCard.tsx";

export const handler: Handlers = {
  GET(req, ctx) {
    if (ctx.state.user) {
      isLogged.value = true;
    } else {
      isLogged.value = false;
    }
    const params = new URLSearchParams(req.url.split("?")[1]);
    const message = params.get("message");
    if (message) {
      return ctx.render({
        message: params.get("message"),
      });
    } else {
      return ctx.render({});
    }
  },
};

interface HomeParamsInterface {
  message?: string;
}

export default function Home({ data }: { data: HomeParamsInterface }) {
  return (
    <Layout title="Roomoney 💰">
      <h1 class="mt-4">Roomoney App</h1>
      {data.message && <MainAlert message={data.message} />}
      <div class="d-flex justify-content-center mt-4 gap-4 p-4 flex-wrap">
        <SingleCard
          class="card border-light mb-3"
          header="Welcome to Roomoney."
          text="Roomoney is a user-friendly app that enables you to create and
              manage virtual households. Once you've established a household,
              you can invite fellow resident to join. This way, you can easily
              keep track of all household purchases and expenditures."
          title="Keep track of all the money that goes into your household."
        />

        {isLogged.value === true
          ? (
            <div class="card border-dark mb-3" style="max-width: 20rem;">
              <div class="card-header">You are already logged in.</div>
              <div class="card-body">
                <h4 class="card-title">Go to the dashboard:</h4>
                <p class="card-text">
                  <a
                    href={envConfig.base_url + "/dashboard"}
                    class="btn btn-outline-secondary"
                  >
                    Dashboard
                  </a>
                </p>
              </div>
              <div class="card-body">
                <h4 class="card-title">Or log out here:</h4>
                <p class="card-text">
                  <a
                    href={envConfig.base_url + "/logout"}
                    class="btn btn-outline-primary"
                  >
                    Log out
                  </a>
                </p>
              </div>
            </div>
          )
          : (
            <div class="card border-dark mb-3" style="max-width: 20rem;">
              <div class="card-header">
                Log in to access all the features of the app.
              </div>
              <div class="card-body">
                <h4 class="card-title">If you already have an account:</h4>
                <p class="card-text">
                  <a
                    href={envConfig.base_url + "/login"}
                    class="btn btn-outline-secondary"
                  >
                    Log in here
                  </a>
                </p>
              </div>
              <div class="card-body">
                <h4 class="card-title">If you want to create an account:</h4>
                <p class="card-text">
                  <a
                    href={envConfig.base_url + "/register"}
                    class="btn btn-outline-info"
                  >
                    Sign up here
                  </a>
                </p>
              </div>
            </div>
          )}
      </div>
      <hr />
      <div class="container-sm mt-4"></div>
      <p>
        Roomoney currently restricts the number of residents in one virtual
        household to two, but this will change in the near future. If you have
        more roommates, don't worry, you can simply create another virtual
        household and include them as residents. This way, everyone can keep
        track of their individual expenses and contribute to the overall
        financial management of the household.
      </p>
    </Layout>
  );
}
