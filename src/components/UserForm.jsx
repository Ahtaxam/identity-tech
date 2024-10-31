import React, { useState } from "react";
import { toast } from "react-toastify";
import styles from "../styles/dashboard.module.scss";
import { getCookie } from "cookies-next";

const UserForm = ({ user, onUpdate }) => {
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    console.log("token:", getCookie("loggedIn"));

    try {
      const response = await fetch("/api/auth/update-user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getCookie("loggedIn")}`,
        },
        body: JSON.stringify({
          name: user.name,
          password,
        }),
      });

      if (response.ok) {
        const { user: updatedUser } = await response.json();

        onUpdate(updatedUser);
        sessionStorage.setItem(
          "user",
          JSON.stringify({
            id: updatedUser.id,
            name: updatedUser.name,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin,
          })
        );
        toast.success("User info updated successfully!");
      } else {
        const { user: updatedUser } = await response.json();
        console.log(updatedUser, "response from server");
        toast.error("Failed to update user info.");
      }
    } catch (error) {
      console.error("Error updating user info:", error);
      toast.error("An error occurred while updating user info.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className={styles.editForm} onSubmit={handleUpdate}>
      <div className={styles.formGroup}>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          value={user.name}
          onChange={(e) => onUpdate({ ...user, name: e.target.value })}
          required
        />
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="email">Email</label>
        <input type="email" id="email" value={user.email} readOnly />
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button type="submit" className={styles.submitButton} disabled={loading}>
        {loading ? "Updating..." : "Update Info"}
      </button>
    </form>
  );
};

export default UserForm;
