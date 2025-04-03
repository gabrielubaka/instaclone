import { createBrowserRouter, RouterProvider } from "react-router";
import { lazy, Suspense } from "react";
import Register from "../pages/register/Register";
import Login from "../pages/login/Login";
import { LazySpinner } from "../components/Spinner";
import Home from "../pages/home/Home";
import ForgottenPassWord from "../pages/forgotpassword/ForgottenPassword";

const AuthLayout = lazy(() => import("../layouts/AuthLayout"));
const RootLayouts = lazy(() => import("../layouts/RootLayouts"));

export default function AppRoutes() {
  const routes = [
    {
      path: "auth",
      element: (
        <Suspense fallback={<LazySpinner />}>
          <AuthLayout />
        </Suspense>
      ),
      children: [
        {
          path: "register",
          element: <Register />,
        },
        {
          path: "login",
          element: <Login />,
        },
        {
          path: "forgottenpassword",
          element: <ForgottenPassWord />,
        },
      ],
    },
    {
      path: "/",
      element: (
        <Suspense fallback={<LazySpinner />}>
          <RootLayouts />
        </Suspense>
      ),
      children: [
        {
          index: true,
          element: <Home />,
        },
      ],
    },
  ];
  const router = createBrowserRouter(routes);
  return <RouterProvider router={router} />;
}
