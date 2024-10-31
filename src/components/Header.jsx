import React from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { toast } from "react-toastify";
import { deleteCookie } from "cookies-next";
import styles from "../styles/dashboard.module.scss"; 

const Header = () => {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      const response = await fetch("/api/auth/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        deleteCookie("loggedIn");
        sessionStorage.removeItem("user");
        router.push("/login");
      } else {
        toast.error("Logout failed. Please try again.");
      }
    } catch (error) {
      console.error("Error during logout:", error);
      toast.error("An error occurred while logging out.");
    }
  };

  return (
    <header className={styles.header}>
      <h1 className={styles.headerTitle}>Dashboard</h1>
      <div className={styles.btngroup}>
        <Link href="/users" className={styles.viewuserButton}>
          Manage Users
        </Link>
        <button onClick={handleLogout} className={styles.logoutButton}>
          Logout
        </button>
      </div>
    </header>
  );
};

export default Header;
