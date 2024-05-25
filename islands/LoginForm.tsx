import { useState } from "preact/hooks";
import { JSX } from "preact/jsx-runtime";
import Alert from "@/components/Common/Alert.tsx";
import Button from "@/components/Common/Button.tsx";

function LoginForm() {
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [credentials, setCredentials] = useState<
    { login: string; password: string }
  >({ login: "", password: "" });

  async function validateForm(event: JSX.TargetedEvent) {
    event.preventDefault();
    try {
      const loginRequest = await fetch("/api/login", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(credentials),
      });
      const response = await loginRequest.json();
      if (response.logged) {
        window.location.href = response.location;
        return;
      }
      setErrorMessage(response.message);
    } catch (error) {
      setErrorMessage("Something went wrong. Try again later.");
    }
  }
  return (
    <>
      <form data-bitwarden-watching="1" onSubmit={validateForm}>
        <fieldset>
          <legend>Please fill in the fields with accurate information.</legend>
          <div class="form-group">
            <label for="login" class="form-label mt-4">
              Login:
              <div class="col-sm-10">
                <input
                  type="text"
                  minLength={5}
                  maxLength={20}
                  readonly={false}
                  class="form-control"
                  id="login"
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
                  Type your user login here.
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
                  Type your user password here.
                </small>
              </div>
            </label>
          </div>
        </fieldset>
        <Button class="btn btn-primary" name="Log in 🔒" />

        {errorMessage &&
          <Alert class="alert mt-4 alert-secondary" message={errorMessage} />}
      </form>
    </>
  );
}

export default LoginForm;
