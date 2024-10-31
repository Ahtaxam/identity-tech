import React from "react";
import Users from "../components/Users";
import Head from "next/head";

const UsersPage = () => {
  return (
    <>
      <Head>
        <title>Users | Identity</title>
        <meta name="description" content="Create a new account on MyApp" />
      </Head>
      <Users />
    </>
  );
};

export default UsersPage;
