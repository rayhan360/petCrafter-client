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
        path: "/petListing",
        element: <PetListing></PetListing>
      },
      {
        path: '/petDetails/:id',
        element: <PetDetails></PetDetails>
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
    element: <Dashboard></Dashboard>,
    children: [
        {
            path: "add-pet",
            element: <AddAPet></AddAPet>
        },
        {
          path: "my-pets",
          element: <MyPet></MyPet>
        },
        {
          path: "create-donation-campaign",
          element: <CreateDonation></CreateDonation>
        },
        {
          path: "my-donation-campaigns",
          element: <MyDonationCampaing></MyDonationCampaing>
        },
        {
          path:"adoption-requests",
          element: <AdoptionRequest></AdoptionRequest>
        },
        {
          path: "updateItem/:id",
          element: <Update></Update>,
          loader: ({params}) => fetch(`http://localhost:3000/pets/${params.id}`)
        }
    ]
  }
]);
export default Router;
