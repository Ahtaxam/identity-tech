import React from "react";
import { MdAdminPanelSettings, MdDelete } from "react-icons/md";
import styles from "../styles/users.module.scss";

const UserRow = ({ user, onMakeAdmin, onDelete }) => {
  return (
    <tr className={styles.userItem}>
      <td>{user.id}</td>
      <td>{user.name}</td>
      <td>{user.email}</td>
      <td>
        <span
          className={`${styles.badge} ${
            user.isAdmin ? styles.adminBadge : styles.userBadge
          }`}
        >
          {user.isAdmin ? "Admin" : "User"}
        </span>
      </td>
      <td className={styles.actionCell}>
        <button onClick={() => onMakeAdmin(user.id)} className={styles.adminButton}>
          <MdAdminPanelSettings size={20} />
        </button>
        <button onClick={() => onDelete(user.id)} className={styles.deleteButton}>
          <MdDelete size={20} />
        </button>
      </td>
    </tr>
  );
};

export default UserRow;
