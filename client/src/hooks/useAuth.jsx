import { useContext } from "react";
import { AuthContext } from "../context/auth/AuthContext";

const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw Error("useAuth must be used inside AuthContextProvider");
  }
  return context;
};

export default useAuth;
