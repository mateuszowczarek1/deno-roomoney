import Alert from "@/components/Common/Alert.tsx";
import GoBackAnchor from "@/components/Common/GoBackAnchor.tsx";
import { useEffect, useState } from "preact/hooks";
import { JSX } from "preact/jsx-runtime";
import { PurchaseWithIdType } from "@/interfaces/PurchaseInterface.ts";
import { UserWithIdType } from "@/interfaces/UserInterface.ts";

interface Credentials {
  name: string;
  amount: number;
  paidBy: string;
}

interface Props {
  id: string;
  user: UserWithIdType;
}

function EditPurchaseForm(props: Props) {
  const [message, setMessage] = useState<string>("");
  const [purchase, setPurchase] = useState<PurchaseWithIdType | null>(null);
  const [credentials, setCredentials] = useState<Credentials>({
    name: "",
    amount: 0,
    paidBy: props.user._id.toString(),
  });

  useEffect(() => {
    (async () => {
      try {
        const findPurchaseRequest = await fetch("/api/purchases/find-one", {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({ id: props.id }),
        });
        const findPurchaseResponse = await findPurchaseRequest.json();
        if (findPurchaseResponse.purchase) {
          setPurchase(findPurchaseResponse.purchase);
          setCredentials({
            ...credentials,
            name: findPurchaseResponse.purchase.name,
            amount: Number(findPurchaseResponse.purchase.amount),
          });
        }
        if (findPurchaseResponse.message) {
          setMessage(findPurchaseResponse.message);
        }
      } catch (error) {
        console.error(error);
        if (error.message) {
          setMessage(error.message);
        }
      }
    })();
  }, []);
  async function deletePurchase(event: JSX.TargetedEvent) {
    event.preventDefault();
    try {
      const editPurchaseRequest = await fetch(
        "/api/purchases/delete-purchase",
        {
          method: "DELETE",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({ id: purchase!._id }),
        },
      );
      const response = await editPurchaseRequest.json();
      if (response.location) {
        window.location.href = response.location;
        return;
      }
      setMessage(response.message);
    } catch (error) {
      setMessage("Something went wrong. Try again later.");
    }
  }

  async function editPurchase(event: JSX.TargetedEvent) {
    event.preventDefault();
    try {
      const editPurchaseRequest = await fetch("/api/purchases/edit-purchase", {
        method: "PUT",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          name: credentials.name,
          amount: credentials.amount,
          id: purchase!._id,
        }),
      });
      const response = await editPurchaseRequest.json();
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

      <div>
        {message && (
          <Alert class="alert mt-4 alert-secondary" message={message} />
        )}

        {purchase
          ? (
            <form data-bitwarden-watching="1" onSubmit={editPurchase}>
              <fieldset>
                <legend>Edit your purchase here:</legend>
                <div class="form-group">
                  <label for="name" class="form-label mt-4">
                    Purchase name:
                    <div class="col-sm-10">
                      <input
                        type="text"
                        minLength={5}
                        maxLength={30}
                        readonly={false}
                        class="form-control"
                        id="name"
                        defaultValue={purchase.name}
                        placeholder="purchase-name"
                        onInput={(e) =>
                          setCredentials({
                            ...credentials,
                            name: e.currentTarget.value,
                          })}
                        onFocus={() => setMessage("")}
                        required
                      />
                      <small class="form-text text-muted">
                        Type the purchase name here. Purchase name cannot be
                        shorter than 5 and longer than 30 characters.
                      </small>
                    </div>
                  </label>
                </div>
                <div class="form-group">
                  <label for="amount" class="form-label mt-4">
                    Amount:
                    <div class="col-sm-10">
                      <input
                        type="number"
                        min={1}
                        step={0.01}
                        readonly={false}
                        class="form-control"
                        id="amount"
                        placeholder="0"
                        defaultValue={purchase.amount.toString()}
                        onInput={(e) =>
                          setCredentials({
                            ...credentials,
                            amount: Number(e.currentTarget.value),
                          })}
                        onFocus={() => setMessage("")}
                        required
                      />
                      <small class="form-text text-muted">
                        Type purchase amount here.
                      </small>
                    </div>
                  </label>
                </div>
              </fieldset>
              <p>
                <button
                  type="submit"
                  class="btn btn-primary mt-2"
                >
                  Edit purchase 🛒
                </button>
              </p>
              <p>
                <button
                  onClick={deletePurchase}
                  class="btn btn-danger mt-2"
                >
                  Delete purchase 🗑
                </button>
              </p>
            </form>
          )
          : null}
      </div>
    </>
  );
}

export default EditPurchaseForm;
