import { useState } from "preact/hooks";
import { JSX } from "preact/jsx-runtime";
import Alert from "@/components/Common/Alert.tsx";
import Button from "@/components/Common/Button.tsx";

function RegisterForm() {
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [credentials, setCredentials] = useState<
    { login: string; password: string }
  >({ login: "", password: "" });

  async function validateForm(event: JSX.TargetedEvent) {
    event.preventDefault();
    try {
      const loginRequest = await fetch("/api/register", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(credentials),
      });
      const response = await loginRequest.json();
      if (response.location) {
        window.location.href = response.location;
        return;
      }
      if (response.message) {
        setErrorMessage(response.message);
      }
    } catch (error) {
      setErrorMessage("Something went wrong. Try again later.");
    }
  }
  return (
    <>
      <form data-bitwarden-watching="1" onSubmit={validateForm}>
        <fieldset>
          <legend>Create a new user here:</legend>
          <div class="form-group">
            <label for="login" class="form-label mt-4">
              Login:
              <div class="col-sm-10">
                <input
                  type="text"
                  readonly={false}
                  class="form-control"
                  id="login"
                  minLength={5}
                  maxLength={20}
                  defaultValue=""
                  placeholder="your-login"
                  onInput={(e) =>
                    setCredentials({
                      ...credentials,
                      login: e.currentTarget.value,
                    })}
                  onFocus={() => setErrorMessage("")}
                  required
                >
                </input>
                <small class="form-text text-muted">
                  Your user login should be at least 5 characters long but not
                  longer than 20 characters.
                </small>
              </div>
            </label>
          </div>
          <div class="form-group">
            <label for="password" class="form-label mt-4">
              Password:
              <div class="col-sm-10">
                <input
                  type="password"
                  minLength={5}
                  maxLength={20}
                  readonly={false}
                  class="form-control"
                  id="password"
                  placeholder="your-password"
                  onInput={(e) =>
                    setCredentials({
                      ...credentials,
                      password: e.currentTarget.value,
                    })}
                  onFocus={() => setErrorMessage("")}
                  required
                />
                <small class="form-text text-muted">
                  Your user password should be at least 5 characters long but
                  not longer than 20 characters.
                </small>
              </div>
            </label>
          </div>
        </fieldset>
        <Button class="btn btn-primary" name="Sign up 🗝️" />
        {errorMessage &&
          <Alert class="alert mt-4 alert-secondary" message={errorMessage} />}
      </form>
    </>
  );
}

export default RegisterForm;
