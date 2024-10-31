import Link from "next/link";
import styles from "../styles/login.module.scss";
import useAuthForm from "../hooks/useAuthForm";
import { login } from "../services/authService";
import InputField from "./InputField";

const Login = () => {
  const { formData, handleChange, handleSubmit, loading } = useAuthForm(login);
  return (
    <div className={styles.signinWrapper}>
      <div className={styles.signinContainer}>
        <h1 className={styles.heading}>Login to Your Account</h1>
        <form className={styles.signinForm} onSubmit={handleSubmit}>
          <InputField
            label="Email"
            type="email"
            name="email"
            value={formData.email || ""}
            onChange={handleChange}
            placeholder="Enter your email"
          />
          <InputField
            label="Password"
            type="password"
            name="password"
            value={formData.password || ""}
            onChange={handleChange}
            placeholder="Enter your password"
          />
          <button
            type="submit"
            className={styles.loginButton}
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
        <p>
          Don't have an account? <Link href="/signup">Signup</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
