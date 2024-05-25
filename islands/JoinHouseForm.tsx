import { useState } from "preact/hooks";
import { JSX } from "preact/jsx-runtime";
import Alert from "@/components/Common/Alert.tsx";
import Button from "@/components/Common/Button.tsx";

function JoinHouseForm() {
  const [message, setMessage] = useState<string>("");
  const [secretCode, setSecretCode] = useState<{ secretCode: string } | null>(
    null,
  );

  async function validateForm(event: JSX.TargetedEvent) {
    event.preventDefault();
    try {
      const joinHouseRequest = await fetch("/api/houses/join-house", {
        method: "PUT",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(secretCode),
      });
      const response = await joinHouseRequest.json();
      if (response.message) {
        setMessage(response.message);
      } else if (response.location) {
        window.location.href = response.location;
        return;
      }
    } catch (error) {
      setMessage("Something went wrong. Try again later.");
    }
  }

  return (
    <>
      <form data-bitwarden-watching="1" onSubmit={validateForm}>
        <fieldset>
          <legend>
            Fill the input with the <strong>secret code</strong>{" "}
            given to you by the owner of the household.
          </legend>
          <div class="form-group">
            <label for="secretCode" class="form-label mt-4">
              Secret code:
              <div class="col-sm-10">
                <input
                  type="text"
                  readonly={false}
                  class="form-control"
                  id="secretCode"
                  minLength={36}
                  defaultValue=""
                  placeholder="secret-code"
                  required
                  onInput={(e) =>
                    setSecretCode({ secretCode: e.currentTarget.value })}
                  onFocus={() => setMessage("")}
                >
                </input>
                <small class="form-text text-muted">
                  Secret codes are 36 characters long.
                </small>
              </div>
            </label>
          </div>
        </fieldset>
        <Button class="btn btn-primary" name="Join someone's household 🏚️" />
        {message &&
          <Alert class="alert mt-4 alert-secondary" message={message} />}
      </form>
    </>
  );
}

export default JoinHouseForm;
