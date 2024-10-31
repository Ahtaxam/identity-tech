import styles from "../styles/login.module.scss";
const InputField = ({ label, type, name, value, onChange, placeholder }) => (
  <div className={styles.formGroup}>
    <label htmlFor={name}>{label}</label>
    <input
      type={type}
      id={name}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      required
    />
  </div>
);

export default InputField;
