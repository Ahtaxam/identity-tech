import { useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { setCookie } from "cookies-next";

const useAuthForm = (submitFunction) => {
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { token, message } = await submitFunction(formData);

      toast.success(message);
      setCookie("loggedIn", token);
      router.push("/verify-account");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { formData, handleChange, handleSubmit, loading };
};

export default useAuthForm;
