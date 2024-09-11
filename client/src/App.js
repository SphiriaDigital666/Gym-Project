import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Root from "./pages/user/Root";
import AdminRoot from "./pages/admin/AdminRoot";
import Home from "./pages/user/Home";
import Trainers from "./pages/user/Trainers";
import Contact from "./pages/user/Contact";
import Login from "./pages/user/Login";
import Profile from "./pages/user/Profile";
import Registration from "./pages/user/Registration";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminMembers from "./pages/admin/AdminMembers";
import AdminTrainers from "./pages/admin/AdminTrainers";
import AdminProfile from "./pages/admin/AdminProfile";
import AdminPayments from "./pages/admin/AdminPayments";
import Error from "./pages/Error";

import { action as logoutAction } from "./pages/Logout";
import { tokenLoader, checkAuthLoader } from "./util/auth";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <Error />,
    id: "root",
    loader: tokenLoader,
    children: [
      { index: true, element: <Home /> },
      { path: "trainers", element: <Trainers /> },
      { path: "contact", element: <Contact /> },
      { path: "login", element: <Login /> },
      { path: "profile", element: <Profile />, loader: checkAuthLoader },
      {
        path: "registration",
        element: <Registration />,
        loader: checkAuthLoader,
      },
      { path: "logout", action: logoutAction },
    ],
  },
  {
    path: "/admin",
    element: <AdminRoot />,
    errorElement: <Error />, //Not working
    children: [
      { index: true, element: <AdminDashboard /> },
      { path: "members", element: <AdminMembers /> },
      { path: "trainers", element: <AdminTrainers /> },
      { path: "profile", element: <AdminProfile /> },
      { path: "payments", element: <AdminPayments /> },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
