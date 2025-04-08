import { createBrowserRouter, RouterProvider } from "react-router";
import { lazy, Suspense } from "react";
import Register from "../pages/register/Register";
import Login from "../pages/login/Login";
import { LazySpinner } from "../components/Spinner";
import Home from "../pages/home/Home";
import ForgottenPassWord from "../pages/forgotpassword/ForgottenPassword";
import { useAuth } from "../store";
import { PrivateRoutes, PublicRoutes, VerifyRoutes } from "./ProtectedRoutes";
import SendVerifyMail from "../pages/VerifyAccount/SendVerifyAccount";
import VerifyAccount from "../pages/VerifyAccount/VerifyAccount";
import ResetPassword from "../pages/forgotpassword/ResetPassword";

const AuthLayout = lazy(() => import("../layouts/AuthLayout"));
const RootLayouts = lazy(() => import("../layouts/RootLayouts"));
const VerifyAccountLayouts = lazy(() =>
  import("../layouts/VerifyAccountLayouts")
);

export default function AppRoutes() {
  const { accessToken, isCheckingAuth, user } = useAuth();
  if (isCheckingAuth) {
    return <LazySpinner />;
  }

  const routes = [
    {
      path: "auth",
      element: (
        <Suspense fallback={<LazySpinner />}>
          <PublicRoutes accessToken={accessToken}>
            <AuthLayout />
          </PublicRoutes>
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
          path: "forgotten-password",
          element: <ForgottenPassWord />,
        },
        {
          path:"reset-password/:userId/:passwordToken",
          element: <ResetPassword />,
        }
      ],
    },
    {
      path: "/",
      element: (
        <Suspense fallback={<LazySpinner />}>
          <PrivateRoutes accessToken={accessToken} user={user}>
            <RootLayouts />
          </PrivateRoutes>
        </Suspense>
      ),
      children: [
        {
          index: true,
          element: <Home />,
        },
      ],
    },
    {
      element: (
        <Suspense fallback={<LazySpinner />}>
          <VerifyRoutes accessToken={accessToken} user={user}>
            <VerifyAccountLayouts />
          </VerifyRoutes>
        </Suspense>
      ),
      children: [
        {
          path: "verify-email",
          element: <SendVerifyMail />,
        },
        {
          path: "verify-email/:userId/:verificationToken",
          element: <VerifyAccount />,
        },
      ],
    },
  ];
  const router = createBrowserRouter(routes);
  return <RouterProvider router={router} />;
}
