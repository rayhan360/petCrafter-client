import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../MainLayuot/MainLayout";
import Home from "../Pages/Home/Home";
import SignIn from "../Pages/Authentication/SignIn/SignIn";
import SignUP from "../Pages/Authentication/SignUp/SignUP";
import Dashboard from "../MainLayuot/Dashboard";
import AddAPet from "../Pages/Dashboard/AddAPet/AddAPet";
import MyPet from "../Pages/Dashboard/MyPet/MyPet";
import Update from "../components/Update/Update";
import CreateDonation from "../Pages/Dashboard/CreateDonation/CreateDonation";
import MyDonationCampaing from "../Pages/Dashboard/MyDonationCampaing/MyDonationCampaing";
import PetListing from "../Pages/PetListing/PetListing";
import PetDetails from "../Pages/PetListing/PetDetails";
import AdoptionRequest from "../Pages/Dashboard/AdoptionRequest/AdoptionRequest";
import DonationCampaign from "../Pages/DonationCampaign/DonationCampaign";
import DonationDetails from "../Pages/DonationCampaign/DonationDetails";
import MyDonation from "../Pages/Dashboard/MyDonation/MyDonation";
import UpdateDonation from "../components/UpdateDonation/UpdateDonation";
import PrivateRoute from "./PrivateRoute";
import AllUsers from "../Pages/Dashboard/AllUsers/AllUsers";
import AllPets from "../Pages/Dashboard/AllPets/AllPets";
import AllDonation from "../Pages/Dashboard/AllDonation/AllDonation";
import CategoryPet from "../components/CategoryPet/CategoryPet";
import ErrorPage from "../components/Error/ErrorPage";
import AdminRoute from "./AdminRoute";

const Router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/petListing",
        element: <PetListing></PetListing>
      },
      {
        path: '/petDetails/:id',
        element: <PrivateRoute><PetDetails></PetDetails></PrivateRoute>
      },
      {
        path: "/donation-campaign",
        element: <DonationCampaign></DonationCampaign>
      },
      {
        path: "/donationDetails/:id",
        element: <PrivateRoute><DonationDetails></DonationDetails></PrivateRoute>
      },
      {
        path: "/category/:categoryName",
        element: <CategoryPet></CategoryPet>
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
  {
    path: "dashboard",
    element: <PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
    errorElement:<ErrorPage></ErrorPage>,
    children: [
      // admin route
      {
        path: "all-users",
        element: <AdminRoute><AllUsers></AllUsers></AdminRoute>
      },
      {
        path: "all-pets",
        element: <AdminRoute><AllPets></AllPets></AdminRoute>
      },
      {
        path: "all-donations",
        element: <AdminRoute><AllDonation></AllDonation></AdminRoute>
      },

      // normal user can this route
        {
            path: "add-pet",
            element: <PrivateRoute><AddAPet></AddAPet></PrivateRoute>
        },
        {
          path: "my-pets",
          element: <PrivateRoute><MyPet></MyPet></PrivateRoute>
        },
        {
          path: "create-donation-campaign",
          element: <PrivateRoute><CreateDonation></CreateDonation></PrivateRoute>
        },
        {
          path: "my-donation-campaigns",
          element: <PrivateRoute><MyDonationCampaing></MyDonationCampaing></PrivateRoute>
        },
        {
          path:"adoption-requests",
          element: <PrivateRoute><AdoptionRequest></AdoptionRequest></PrivateRoute>
        },
        {
          path: "my-donations",
          element: <PrivateRoute><MyDonation></MyDonation></PrivateRoute>
        },
        {
          path: "updateDonation/:id",
          element: <PrivateRoute><UpdateDonation></UpdateDonation></PrivateRoute>,
          loader: ({params}) => fetch(`https://pet-crafter-backend.vercel.app/donation/request/${params.id}`)
        },
        {
          path: "updateItem/:id",
          element: <PrivateRoute><Update></Update></PrivateRoute>,
          loader: ({params}) => fetch(`https://pet-crafter-backend.vercel.app/pets/${params.id}`)
        }
    ]
  }
]);
export default Router;
