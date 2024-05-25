import { UnknownPageProps } from "$fresh/server.ts";
import Layout from "@/components/Layout.tsx";
import Anchor from "@/components/Common/Anchor.tsx";
export default function NotFoundPage({ url }: UnknownPageProps) {
  return (
    <Layout title="Roomoney 💰 - Not found 🙅🏿">
      <>
        <h1>404 - 🔍 Page not found</h1>
        <h2>{url.pathname}</h2>
        <div class="d-flex justify-content-center mt-4 gap-4 p-4 flex-wrap">
          <div class="card border-danger mb-3" style="max-width: 20rem;">
            <div class="card-header">Page not found</div>
            <div class="card-body">
              <h4 class="card-title">Sorry, the page was not found</h4>
              <p class="card-text">
                The page you were trying to visit was{" "}
                <strong class="text-warning">not found</strong>.
              </p>
              <p class="card-text">
                <Anchor class="btn btn-danger" link="/" name="Go back home" />
              </p>
            </div>
          </div>
        </div>
      </>
    </Layout>
  );
}
