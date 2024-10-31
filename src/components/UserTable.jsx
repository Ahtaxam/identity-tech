import React from "react";
import UserRow from "./UserRow";
import styles from "../styles/users.module.scss";

const UserTable = ({ users, onMakeAdmin, onDelete }) => {
  return (
    <table className={styles.userTable}>
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Email</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <UserRow
            key={user.id}
            user={user}
            onMakeAdmin={onMakeAdmin}
            onDelete={onDelete}
          />
        ))}
      </tbody>
    </table>
  );
};

export default UserTable;
