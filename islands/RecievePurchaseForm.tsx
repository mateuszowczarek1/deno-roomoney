import Alert from "@/components/Common/Alert.tsx";
import GoBackAnchor from "@/components/Common/GoBackAnchor.tsx";
import { RecievePurchaseHouseInterface } from "@/routes/dashboard/purchase/recieve/index.tsx";
import { useState } from "preact/hooks";
import { JSX } from "preact/jsx-runtime";

function ReceivePurchaseForm(props: { data: RecievePurchaseHouseInterface }) {
  const [message, setMessage] = useState<string>("");
  const [credentials, setCredentials] = useState<
    { name: string; amount: number; paidBy: string | null }
  >({ name: "Payment received", amount: 0, paidBy: null });

  async function validateForm(event: JSX.TargetedEvent) {
    event.preventDefault();
    try {
      const addPurchaseRequest = await fetch("/api/purchases/add-purchase", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(credentials),
      });
      const response = await addPurchaseRequest.json();
      if (response.location) {
        window.location.href = response.location;
        return;
      }
      setMessage(response.message);
    } catch (error) {
      setMessage("Something went wrong. Try again later.");
    }
  }
  return (
    <>
      <GoBackAnchor link="/dashboard/purchase" />

      {props.data.errorMessage &&
        (
          <Alert
            class="alert mt-4 mb-4 alert-secondary"
            message={props.data.errorMessage}
          />
        )}
      <form data-bitwarden-watching="1" onSubmit={validateForm}>
        <fieldset>
          <legend>Please fill in the fields with accurate information.</legend>
          <div class="form-group">
            <label for="amount" class="form-label mt-4">
              Recieved Amount:
              <div class="col-sm-10">
                <input
                  type="number"
                  min={1}
                  step={0.01}
                  readonly={false}
                  class="form-control"
                  id="amount"
                  placeholder="0"
                  defaultValue=""
                  onInput={(e) =>
                    setCredentials({
                      ...credentials,
                      amount: Number(e.currentTarget.value),
                      paidBy: props.data.otherUser._id.toString(),
                    })}
                  onFocus={() => setMessage("")}
                  required
                  disabled={!!props.data.errorMessage}
                />
                <small class="form-text text-muted">
                  Type purchase amount here.
                </small>
              </div>
            </label>
          </div>
        </fieldset>
        <button
          type="submit"
          class="btn btn-primary"
          disabled={!!props.data.errorMessage}
        >
          Received payment 💰
        </button>
        {message &&
          <Alert class="alert mt-4 alert-secondary" message={message} />}
      </form>
    </>
  );
}
export default ReceivePurchaseForm;
