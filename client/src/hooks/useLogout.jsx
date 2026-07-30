import { useState } from "react";
import useAuth from "./useAuth";

export const useLogout = () => {
  const { dispatch } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const logout = async () => {
    try {
      setIsLoading(true);
      const res = await fetch("/api/user/logout", {
        method: "POST",
        credentials: "include",
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Logout failed");
      }

      dispatch({ type: "LOGOUT" });

    } catch (error) {
      console.log(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return { logout, isLoading };
};
