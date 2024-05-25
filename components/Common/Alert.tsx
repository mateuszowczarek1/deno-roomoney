interface AlertPropsInterface {
  class: string;
  message: string;
}

export default function Alert(props: AlertPropsInterface) {
  return (
    <div class={props.class}>
      <strong>Oops 😢!</strong>
      {props.message}
    </div>
  );
}
