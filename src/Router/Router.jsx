import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../MainLayuot/MainLayout";
import Home from "../Pages/Home/Home";
import SignIn from "../Pages/Authentication/SignIn/SignIn";
import SignUP from "../Pages/Authentication/SignUp/SignUP";

const Router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/signIn",
        element: <SignIn></SignIn>,
      },
      {
        path: "/signUp",
        element: <SignUP></SignUP>
      },
    ],
  },
]);
export default Router;
