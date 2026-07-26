import { useState } from "react";
import useAuth from "./useAuth";

export const useSignup = () => {
  const [err, setErr] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { dispatch } = useAuth();

  const signup = async (name, email, password, role) => {
    try {
      setIsLoading(true);
      setErr(null);
      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/user/signup`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ name, email, password, role }),
        },
      );
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || "Signup failed");
      }
        
      dispatch({ type: "LOGIN", payload: data.user });
    } catch (error) {
      setErr(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return { signup, err, setErr, isLoading };
};
