import React, { useState } from "react";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { getCookie } from "cookies-next";
import InputField from "./InputField";
import { verifyAccount, resendVerificationCode } from "../services/authService";
import styles from "../styles/verifyAccount.module.scss";

const VerifyAccountForm = () => {
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [sending, setSending] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = getCookie("loggedIn");

    if (!token) {
      toast.error("Session expired! Please login again.");
      return;
    }

    try {
      setLoading(true);
      const response = await verifyAccount(token, code);

      if (response.ok) {
        const { data } = await response.json();
        toast.success("Account verified successfully!");

        sessionStorage.setItem(
          "user",
          JSON.stringify({
            id: data.id,
            name: data.name,
            email: data.email,
            isAdmin: data.isAdmin,
          })
        );
        router.push("/dashboard");
      } else {
        const { message } = await response.json();
        toast.error(message || "Verification failed. Please try again.");
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
      console.error("Error during account verification:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleResendCode = async () => {
    const token = getCookie("loggedIn");

    if (!token) {
      toast.error("Session expired! Please login again.");
      return;
    }

    try {
      setSending(true);
      const response = await resendVerificationCode(token);

      if (response.ok) {
        toast.success("Verification code sent again!");
      } else {
        const { message } = await response.json();
        toast.error(message || "Failed to resend verification code.");
      }
    } catch (error) {
      toast.error(
        "An error occurred while resending the code. Please try again."
      );
      console.error("Error during code resend:", error);
    } finally {
      setSending(false);
    }
  };

  return (
    <form className={styles.verifyForm} onSubmit={handleSubmit}>
      <InputField
        label="Verification Code"
        id="code"
        name="code"
        type="text"
        placeholder="Enter the verification code"
        value={code}
        onChange={(e) => setCode(e.target.value)}
        required
      />
      <div className={styles.buttonGroup}>
        <button
          type="submit"
          className={styles.submitButton}
          disabled={loading}
        >
          {loading ? "Verifying..." : "Verify Account"}
        </button>
        <button
          type="button"
          className={styles.sendAgainLink}
          onClick={handleResendCode}
          disabled={sending}
        >
          {sending ? "Sending..." : "Send Again"}
        </button>
      </div>
    </form>
  );
};

export default VerifyAccountForm;
