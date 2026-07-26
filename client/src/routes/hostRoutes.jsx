import HostLayout from "../layouts/HostLayout";
import HostHome, { getHostHomes } from "../pages/host/HostHome";
import AddHome, { addHomeAction } from "../pages/host/AddHome";
import EditHome, { editHomeAction, editHomeLoader } from "../pages/host/EditHome";
import HostHomeDetails from "../pages/host/HostHomeDetails";
import ManageBookings from "../pages/host/ManageBookings";
import { Navigate } from "react-router-dom";

export const hostRoutes = {
  path: "/host",
  element: <HostLayout />,
  children: [
    {
      index: true,
      element: <Navigate to="homes" replace />,
    },
    {
      path: "homes",
      element: <HostHome />,
    },
    {
      path: "bookings",
      element: <ManageBookings />,
    },
    {
      path: "add",
      element: <AddHome />,
      action: addHomeAction,
    },
    {
      path: "edit/:id",
      element: <EditHome />,
      loader: editHomeLoader,
      action: editHomeAction,
    },
    {
      path: "homes/:id",
      element: <HostHomeDetails />,
    },
  ],
};
