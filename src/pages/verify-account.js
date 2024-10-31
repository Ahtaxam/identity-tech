import React from "react";
import styles from "../styles/verifyAccount.module.scss";
import VerifyAccountForm from "../components/VerifyAccountForm";
import Head from "next/head";

const VerifyAccountPage = () => {
  return (
    <>
      <Head>
        <title>Verification | Identity</title>
        <meta name="description" content="Login to your MyApp account" />
      </Head>
      <div className={styles.verifyWrapper}>
        <div className={styles.verifyContainer}>
          <h1 className={styles.heading}>Verify Your Account</h1>
          <p className={styles.subheading}>
            Please enter the code from your email to verify your account.
          </p>
          <VerifyAccountForm />
        </div>
      </div>
    </>
  );
};

export const getServerSideProps = async (context) => {
  const { req, res } = context;
  const userCookie = req.cookies.loggedIn;

  if (!userCookie) {
    res.writeHead(302, { Location: "/login" });
    res.end();
    return { props: {} };
  }

  return { props: {} };
};

export default VerifyAccountPage;
