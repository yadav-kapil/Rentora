import MainLayout from "../layouts/MainLayout";
import HomePage from "../pages/public/HomePage";
import HomeDetails from "../pages/public/HomeDetails";
import Categories from "../pages/public/Categories";
import Terms from "../pages/public/Terms";
import Privacy from "../pages/public/Privacy";
import About from "../pages/public/About";

export const publicRoutes = {
  element: <MainLayout />,
  children: [
    {
      path: "/",
      element: <HomePage />,
    },
    {
      path: "categories",
      element: <Categories />,
    },
    {
      path: "homes/:id",
      element: <HomeDetails />,
    },
    {
      path: "terms",
      element: <Terms />,
    },
    {
      path: "privacy",
      element: <Privacy />,
    },
    {
      path: "about",
      element: <About />,
    },
  ],
};
