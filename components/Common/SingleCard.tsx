interface SingleCardPropsInterface {
  class: string;
  style?: string;
  header: string;
  title: string;
  text: string;
}

export default function SingleCard(props: SingleCardPropsInterface) {
  return (
    <div
      class={props.class}
      style={props.style ? props.style : "max-width: 20rem;"}
    >
      <div class="card-header">{props.header}</div>
      <div class="card-body">
        <h4 class="card-title">
          {props.title}
        </h4>
        <p class="card-text">
          {props.text}
        </p>
      </div>
    </div>
  );
}
