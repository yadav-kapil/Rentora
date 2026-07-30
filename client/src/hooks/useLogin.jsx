import { useState } from "react";
import useAuth from "./useAuth";

export const useLogin = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [err, setErr] = useState(null);
  const { dispatch } = useAuth();

  const login = async (email, password) => {
    try {
      setIsLoading(true);
      setErr(null);
      const res = await fetch(
        "/api/user/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ email, password }),
        },
      );
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || "Login Failed");
      }
      dispatch({ type: "LOGIN", payload: data.user });
    } catch (error) {
      setErr(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return { login, err, isLoading };
};
