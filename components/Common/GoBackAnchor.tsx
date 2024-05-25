import Anchor from "@/components/Common/Anchor.tsx";

export default function GoBackAnchor(props: { link: string }) {
  return (
    <Anchor
      link={props.link}
      class="btn btn-outline-light mt-4"
      name="Go Back"
    />
  );
}
