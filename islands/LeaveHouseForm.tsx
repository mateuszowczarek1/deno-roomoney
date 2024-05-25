import { useState } from "preact/hooks";
import { JSX } from "preact/jsx-runtime";
import Alert from "@/components/Common/Alert.tsx";

function LeaveHouseForm() {
  const [message, setMessage] = useState<string>("");
  function goBack(event: JSX.TargetedEvent) {
    event.preventDefault();
    window.location.href = `/dashboard/house`;
    return;
  }
  async function validateForm(event: JSX.TargetedEvent) {
    event.preventDefault();
    try {
      const leaveHouseRequest = await fetch("/api/houses/leave-house", {
        method: "PATCH",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({}),
      });
      const response = await leaveHouseRequest.json();
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
      <div class="d-flex justify-content-center mt-4 gap-4 p-4 flex-column">
        <h2 class="text-danger">
          Do you want to leave your current virtual household?
        </h2>

        <button class="btn btn-info" type="submit" onClick={goBack}>No!</button>
        <button class="btn btn-warning" type="submit" onClick={validateForm}>
          Yes!
        </button>
        {message &&
          <Alert class="alert mt-4 alert-secondary" message={message} />}
      </div>
    </>
  );
}

export default LeaveHouseForm;
