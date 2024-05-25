import Layout from "@/components/Layout.tsx";
import LoginForm from "@/islands/LoginForm.tsx";

export default function Login() {
  return (
    <Layout title="Roomoney 💰 - Sign in">
      <>
        <div className="container-sm mt-4">
          <h1>Sign in</h1>
          <p>
            Please sign in so you can start creating and joining houses,
            creating new purchases and checking your balance 😃.
          </p>
          <LoginForm />
        </div>
      </>
    </Layout>
  );
}
