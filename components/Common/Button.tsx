interface ButtonPropsInterface {
  class: string;
  name: string;
  type?: string;
}

export default function Button(props: ButtonPropsInterface) {
  return (
    <button class={props.class} type={props.type ? props.type : "submit"}>
      {props.name}
    </button>
  );
}
