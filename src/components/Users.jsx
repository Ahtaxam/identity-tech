import React, { useEffect, useState } from "react";
import styles from "../styles/users.module.scss";
import Link from "next/link";
import UserTable from "./UserTable";
import UserService from "../services/userService";

const Users = () => {
  const { users, loading, deleteUser, makeAdmin } = UserService();
  const [hasPermission, setHasPermission] = useState(true);

  useEffect(() => {
    const user = JSON.parse(sessionStorage.getItem("user"));
    if (!user || !user.isAdmin) {
      setHasPermission(false);
    }
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!hasPermission) {
    return (
      <div className={styles.permissionDenied}>
        <h2>You don't have permission to view this page</h2>
        <Link href="/dashboard" className={styles.backLink}>
          Back to Dashboard
        </Link>
      </div>
    );
  }

  return (
    <div className={styles.userListContainer}>
      <Link href="/dashboard" className={styles.backLink}>
        Back to Dashboard
      </Link>
      <h1>Users List</h1>
      <UserTable users={users} onMakeAdmin={makeAdmin} onDelete={deleteUser} />
    </div>
  );
};

export default Users;
