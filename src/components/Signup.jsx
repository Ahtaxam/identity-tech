import Link from "next/link";
import styles from "../styles/signup.module.scss";
import useAuthForm from "../hooks/useAuthForm";
import { signup } from "../services/authService";
import InputField from "./InputField";

const Signup = () => {
  const { formData, handleChange, handleSubmit, loading } = useAuthForm(signup);

  return (
    <div className={styles.signupWrapper}>
      <div className={styles.signupContainer}>
        <h1 className={styles.heading}>Create a free account</h1>
        <form className={styles.signupForm} onSubmit={handleSubmit}>
          <InputField
            label="Name"
            type="text"
            name="name"
            value={formData.name || ""}
            onChange={handleChange}
            placeholder="Enter your name"
          />
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
            className={styles.submitButton}
            disabled={loading}
          >
            {loading ? "Loading..." : "Sign Up"}
          </button>
        </form>
        <p>
          Already have an account? <Link href="/login">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
