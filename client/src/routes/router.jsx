import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Home, { homeLoader } from "../pages/Home";
import Homes, { getHomes } from "../pages/Homes";
import AddHome, { addHomeAction } from "../pages/AddHome";
import EditHome, { editHomeAction, editHomeLoader } from "../pages/EditHome";
import AddReview from "../components/addReview";
import Review from "../components/Review";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Homes />,
        loader: getHomes,
      },
      {
        path: "homes/new",
        element: <AddHome />,
        action: addHomeAction,
      },
      {
        path: "homes/:id",
        element: <Home />,
        loader: homeLoader,
        children: [
          {
            index: true,
            element: <Review />,
          },
          {
            path: "addreview",
            element: <AddReview />
          }
        ],
      },
      {
        path: "homes/:id/edit",
        element: <EditHome />,
        loader: editHomeLoader,
        action: editHomeAction,
      },
    ],
  },
]);
