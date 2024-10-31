import { useState, useEffect } from "react";
import styles from "../styles/dashboard.module.scss";
import { toast } from "react-toastify";
import UserForm from "../components/UserForm";
import Header from "../components/Header";
import Head from "next/head";

const Dashboard = () => {
  const [user, setUser] = useState({ id: "", name: "", email: "" });

  useEffect(() => {
    const data = JSON.parse(sessionStorage.getItem("user"));
    if (data) {
      setUser(data);
    } else {
      toast.error("User data not found.");
    }
  }, []);

  const handleUserUpdate = (updatedUser) => {
    setUser(updatedUser);
  };

  return (
    <>
      <Head>
        <title>Dashboard | Identity</title>
        <meta name="description" content="Login to your MyApp account" />
      </Head>
      <div className={styles.dashboardWrapper}>
        <Header />
        <main className={styles.mainContent}>
          <h2>Welcome, {user?.name}</h2>
          <UserForm user={user} onUpdate={handleUserUpdate} />
        </main>
      </div>
    </>
  );
};

export default Dashboard;
