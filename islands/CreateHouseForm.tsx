import { useState } from "preact/hooks";
import { JSX } from "preact/jsx-runtime";
import Button from "@/components/Common/Button.tsx";
import Alert from "@/components/Common/Alert.tsx";

function CreateHouseForm() {
  const [message, setMessage] = useState<string>("");
  const [houseCredentials, setHouseCredentials] = useState<
    { name: string } | null
  >(null);

  async function validateForm(event: JSX.TargetedEvent) {
    event.preventDefault();
    try {
      const joinHouseRequest = await fetch("/api/houses/create-house", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(houseCredentials),
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
          <legend>Create a new virtual household here:</legend>
          <div class="form-group">
            <label for="name" class="form-label mt-4">
              House name:
              <div class="col-sm-10">
                <input
                  type="text"
                  readonly={false}
                  class="form-control"
                  id="name"
                  minLength={5}
                  maxLength={30}
                  defaultValue=""
                  placeholder="household-name"
                  required
                  onInput={(e) =>
                    setHouseCredentials({ name: e.currentTarget.value })}
                  onFocus={() => setMessage("")}
                >
                </input>
                <small class="form-text text-muted">
                  Your new virtual household name should be at least 5
                  characters long but not longer than 20 characters.
                </small>
              </div>
            </label>
          </div>
        </fieldset>
        <Button class="btn btn-primary" name="Create a household 🏚️" />

        {message &&
          <Alert class="alert mt-4 alert-secondary" message={message} />}
      </form>
    </>
  );
}

export default CreateHouseForm;
