interface AnchorPropsInterface {
  class?: string;
  name: string;
  link: string;
  target?: string;
}

export default function Anchor(props: AnchorPropsInterface) {
  return (
    <a
      href={props.link}
      class={props.class ? props.class : ""}
      target={props.target ? props.target : "_self"}
    >
      {props.name}
    </a>
  );
}
