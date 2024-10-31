import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { getCookie } from "cookies-next";

const UserService = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const token = getCookie("loggedIn");

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/users/all", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const { message } = await response.json();
        throw new Error(message || "Failed to fetch users");
      }
      const { users } = await response.json();
      setUsers(users);
    } catch (error) {
      console.error("Error fetching users:", error);
      toast.error(error.message || "An error occurred while fetching users");
    } finally {
      setLoading(false);
    }
  };

  const deleteUser = async (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        const response = await fetch(`/api/users/delete`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ id }),
        });

        if (!response.ok) {
          const { message } = await response.json();
          throw new Error(message || "Failed to delete user");
        }

        setUsers(users.filter((user) => user.id !== id));
        toast.success("User deleted successfully!");
      } catch (error) {
        console.error("Error deleting user:", error);
        toast.error(error.message || "An error occurred while deleting user");
      }
    }
  };

  const makeAdmin = async (id) => {
    try {
      const response = await fetch(`/api/users/make-admin`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ id }),
      });

      if (!response.ok) {
        throw new Error("Failed to update user role");
      }

      const updatedUser = await response.json();
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === id ? { ...user, isAdmin: updatedUser.isAdmin } : user
        )
      );
      toast.success("User role updated successfully!");
    } catch (error) {
      console.error("Error making user admin:", error);
      toast.error(
        error.message || "An error occurred while updating user role"
      );
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [token]);

  return { users, loading, deleteUser, makeAdmin };
};

export default UserService;
