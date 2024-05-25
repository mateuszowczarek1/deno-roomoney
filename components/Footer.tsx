import Anchor from "@/components/Common/Anchor.tsx";

function Footer() {
  return (
    <>
      <footer class="text-center bg-dark mt-4">
        <div>
          <p>
            Created by{"  "}
            <Anchor
              link="https://github.com/mateuszowczarek1"
              target="blank"
              name="mateuszowczarek1"
            />.
          </p>
          <p>
            <a
              href="mailto:mateuszowczarek@onet.eu"
              style={"text-decoration: none"}
            >
              📭
            </a>
          </p>
        </div>
      </footer>
    </>
  );
}

export default Footer;
