import MainLayout from "../layouts/MainLayout";
import Login from "../pages/auth/Login";
import Signup from "../pages/auth/Signup";

export const authRoutes = {
  element: <MainLayout />,
  children: [
    {
      path: "login",
      element: <Login />,
    },
    {
      path: "signup",
      element: <Signup />,
    },
  ],
};
