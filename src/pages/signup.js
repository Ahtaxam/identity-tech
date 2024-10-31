import Signup from "../components/Signup";
import Head from "next/head";

const SignupPage = () => {
  return (
    <>
      <Head>
        <title>Signup | Identity</title>
        <meta name="description" content="Create a new account on MyApp" />
      </Head>
      <Signup />
    </>
  );
};

export default SignupPage;
