import { useEffect, useMemo, useState } from "preact/hooks";
import GoBackAnchor from "@/components/Common/GoBackAnchor.tsx";
import { ListHousePurchasesPropsInterface } from "@/routes/dashboard/purchase/list/index.tsx";
import { PurchaseWithIdType } from "@/interfaces/PurchaseInterface.ts";
import { UserWithIdType } from "@/interfaces/UserInterface.ts";
import Alert from "@/components/Common/Alert.tsx";
import LoadingSpinner from "@/components/Common/LoadingSpinner.tsx";
import SingleCard from "@/components/Common/SingleCard.tsx";
interface DataInterface {
  message?: string;
  purchases?: PurchaseWithIdType[] | [];
  status: number;
}

function AddPurchaseForm(props: { data: ListHousePurchasesPropsInterface }) {
  const [purchases, setPurchases] = useState<DataInterface | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [filter, setFilter] = useState<string>("all");
  const [message, setMessage] = useState<string>("");
  const [users, setUsers] = useState<UserWithIdType[]>(
    props.data.users as UserWithIdType[],
  );

  useEffect(() => {
    if (users.length < 2) {
      setMessage(
        "You need minimum of two users in your household to list purchases.",
      );
    }
  }, []);

  useEffect(() => {
    const localData = localStorage.getItem("purchases-list");
    if (localData) {
      setPurchases(JSON.parse(localData));
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const listPurchasesRequest = await fetch(
          "/api/purchases/list-purchases",
          { method: "POST" },
        );
        const listPurchasesResponse = await listPurchasesRequest.json();
        if (listPurchasesResponse) {
          localStorage.setItem(
            "purchases-list",
            JSON.stringify(listPurchasesResponse),
          );
          setPurchases(listPurchasesResponse);
          if (purchases?.message) {
            setMessage(purchases?.message);
          }
        }
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
        if (error.message) {
          setMessage(error.message);
        }
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const amountUser1 = useMemo(() => {
    if (purchases?.purchases && purchases?.purchases.length) {
      return (purchases.purchases as PurchaseWithIdType[]).reduce(
        (acc: number, item: PurchaseWithIdType) => {
          if (item.paidBy === users[0]._id) {
            acc += item.amount;
          }
          return acc;
        },
        0,
      );
    }
    return 0;
  }, [purchases]);

  const amountUser2 = useMemo(() => {
    if (purchases?.purchases && purchases?.purchases.length) {
      return (purchases.purchases as PurchaseWithIdType[]).reduce(
        (acc: number, item: PurchaseWithIdType) => {
          if (item.paidBy === users[1]._id) {
            acc += item.amount;
          }
          return acc;
        },
        0,
      );
    }
    return 0;
  }, [purchases]);

  const balance = useMemo(() => (amountUser1 - amountUser2).toFixed(2), [
    amountUser1,
    amountUser2,
  ]);

  const filteredData = useMemo(() => {
    if (filter === "user1") {
      return purchases?.purchases!.filter((item) =>
        item.paidBy === users[0]._id
      );
    } else if (filter === "user2") {
      return purchases?.purchases!.filter((item) =>
        item.paidBy === users[1]._id
      );
    }
    return purchases?.purchases;
  }, [purchases, filter]);

  return (
    <>
      <GoBackAnchor link="/dashboard/purchase" />
      {message && (
        <Alert class="alert mt-4 mb-4 alert-secondary" message={message} />
      )}
      <div>
        <button
          class="btn btn-success mx-2 my-4"
          onClick={() => setFilter("all")}
        >
          Show All Purchases
        </button>
        <button
          class="btn btn-success mx-2 my-4"
          onClick={() => setFilter("user1")}
        >
          Show {users[0].login} Purchases
        </button>
        <button
          class="btn btn-secondary mx-2 my-4"
          onClick={() => setFilter("user2")}
        >
          Show {users[1].login} Purchases
        </button>
      </div>

      <div>
        {loading && (
          <div class="my-4">
            <LoadingSpinner />
          </div>
        )}
      </div>
      <div class="d-flex justify-content-center mt-4 gap-4 p-4 flex-wrap">
        {Number(balance) >= 0
          ? (
            <SingleCard
              class="card border-danger mb-3"
              header="Balance"
              title={`${users[1].login} owes ${users[0].login} ${balance}`}
              text=""
            />
          )
          : (
            <SingleCard
              class="card border-danger mb-3"
              header="Balance"
              title={`${users[0].login} owes ${users[1].login} ${
                Math.abs(Number(balance))
              }`}
              text=""
            />
          )}
      </div>
      <div>
        <table class="table table-hover table-responsive">
          <thead>
            <tr>
              <th scope="col">Date</th>
              <th scope="col">Name</th>
              <th scope="col">Amount</th>
              <th scope="col">Paid By</th>
            </tr>
          </thead>
          <tbody>
            {filteredData
              ? (
                filteredData.slice(0, 50).map((el, index) => (
                  <tr
                    key={index}
                    class="table-dark"
                    onClick={() => {
                      return window.location.href =
                        `/dashboard/purchase/one/${el._id.toString()}`;
                    }}
                  >
                    <th>{el.purchaseDate.toString().slice(0, 10)}</th>
                    <td>{el.name}</td>
                    <td>{el.amount}</td>
                    <td>
                      {users.find((user) => {
                        return user._id === el.paidBy;
                      })?.login}
                    </td>
                  </tr>
                ))
              )
              : <p>No purchases in this household yet.</p>}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default AddPurchaseForm;
