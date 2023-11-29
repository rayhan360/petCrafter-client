import { Outlet } from "react-router-dom";
import Navbar from "../Pages/Shared/Navbar/Navbar";
import Footer from "../Pages/Shared/Footer/Footer";
import { Toaster } from "react-hot-toast";

const MainLayout = () => {
    return (
        <div>
            <Navbar></Navbar>
            <div className="max-w-7xl mx-auto">
            <Outlet></Outlet>
            </div>
            <Footer></Footer>
            <Toaster></Toaster>
        </div>
    );
};

export default MainLayout;