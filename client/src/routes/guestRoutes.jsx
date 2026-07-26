import GuestLayout from "../layouts/GuestLayout";
import HomePage from "../pages/public/HomePage";
import Categories from "../pages/public/Categories";
import HomeDetails from "../pages/public/HomeDetails";
import MyBookings from "../pages/guest/MyBookings";

export const guestRoutes = {
  path: "/guest",
  element: <GuestLayout />,
  children: [
    {
      path: "",
      element: <HomePage />,
    },
    {
      path: "home",
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
      path: "bookings",
      element: <MyBookings />,
    }
  ],
};
