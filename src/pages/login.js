import Login from "../components/Login";
import Head from "next/head";

const LoginPage = () => {
  return (
    <>
      <Head>
        <title>Login | Identity</title>
        <meta name="description" content="Login to your MyApp account" />
      </Head>
      <Login />
    </>
  );
};

export default LoginPage;
