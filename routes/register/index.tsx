import Layout from "@/components/Layout.tsx";
import RegisterForm from "@/islands/RegisterForm.tsx";

export default function Register() {
  return (
    <Layout title="Roomoney 💰 - Registration">
      <>
        <div className="container-sm mt-4">
          <h1>Sign Up</h1>
          <p>
            Create a new account and get full access to Roomoney app 😃. As a
            registered user you will be able to create virtual houses, join
            other houses, add purchases and keeping track of your house's
            balance.
          </p>
          <RegisterForm />
        </div>
      </>
    </Layout>
  );
}
