import { asset, Head } from "$fresh/runtime.ts";
import { ComponentChildren, FunctionalComponent } from "preact";
import NavBar from "@/components/NavBar.tsx";
import Footer from "@/components/Footer.tsx";

interface LayoutProps {
  title: string;
  children: ComponentChildren;
}

const Layout: FunctionalComponent<LayoutProps> = ({ title, children }) => {
  return (
    <>
      <Head>
        <title>{title}</title>
        <link rel="stylesheet" href={asset("/css/bootstrap.min.css")} />
        <link rel="stylesheet" href={asset("/css/NavBar.css")} />
        <link rel="stylesheet" href={asset("/css/Utils.css")} />
        <link rel="manifest" href={asset("/manifest.json")} />
      </Head>
      <header>
        <NavBar></NavBar>
      </header>
      <main>
        <div class="container">
          {children}
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Layout;
