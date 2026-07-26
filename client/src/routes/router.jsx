import { createBrowserRouter } from "react-router-dom";
import { publicRoutes } from "./publicRoutes";
import { authRoutes } from "./authRoutes";
import { hostRoutes } from "./hostRoutes";
import { guestRoutes } from "./guestRoutes";
import { errorRoutes } from "./errorRoutes";

export const router = createBrowserRouter([
  publicRoutes,
  authRoutes,
  hostRoutes,
  guestRoutes,
  errorRoutes,
]);
