import React from "react";
import Link from "next/link";
import styles from "../styles/home.module.scss";

const Index = () => (
  <div className={styles.container}>
    <h1>Welcome to Identity App!</h1>
    <div className={styles.btnGroup}>
      <Link href="/login" className={styles.button}>
        Login
      </Link>
      <Link href="/signup" className={styles.button}>
        Sign Up
      </Link>
    </div>
  </div>
);

export default Index;
