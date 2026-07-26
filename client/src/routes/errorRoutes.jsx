import NotFoundPage from "../pages/errors/404Page";
import ErrorPage from "../pages/errors/ErrorPage";

export const errorRoutes = {
  path: "*",
  element: <NotFoundPage />,
  errorElement: <ErrorPage />,
};
