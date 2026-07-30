import { createContext, useEffect, useReducer } from "react";
import { authReducer } from "./authReducer";
import LoadingScreen from "../../components/public/LoadingScreen";

// AUTH CONTEXT
export const AuthContext = createContext();

// AUTH CONTEXT PROVIDER
export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
    isLoggedin: false,
    isLoading: true,
  }); 


  useEffect(() => {
    const checkUser = async () => {
      try {
        const res = await fetch(
          "/api/user/me",
          {
            method: "GET",
            credentials: "include",
          },
        );

        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.message || "Unauthorized");
        }
        dispatch({ type: "LOGIN", payload: data.user });
      } catch (error) {
        dispatch({ type: "LOGOUT" });
        console.log(error);

      }
    };

    setTimeout(() => {
      checkUser();
    }, 2000);
  }, []);

  if (state.isLoading) {
    return <LoadingScreen />;
  }

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
