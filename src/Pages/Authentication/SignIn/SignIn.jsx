import Lottie from "lottie-react";
import { useState } from "react";
import signInImg from "../../../assets/AnimationLogin.json";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import SocialAuth from "../../../components/SocialAuth/SocialAuth";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import Swal from "sweetalert2";
import toast, { Toaster } from "react-hot-toast";

const SignIn = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { signIn } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const from = location.state?.from?.pathname || "/";

  const handleSignIn = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    signIn(email, password).then((result) => {
      console.log(result.user);
      Swal.fire({
        title: "Login Successfull",
        showClass: {
          popup: `
                animate__animated
                animate__fadeInUp
                animate__faster
              `,
        },
        hideClass: {
          popup: `
                animate__animated
                animate__fadeOutDown
                animate__faster
              `,
        },
      });
      navigate(from, { replace: true })
    }).catch((error) => {
      console.log(error);
      if (error.code === "auth/wrong-password") {
        toast.error("Incorrect password. Please try again.");
      } else if (error.code === "auth/user-not-found") {
        toast.error("User not found. Please check your email.");
      } else if (error.code === "auth/invalid-login-credentials") {
        toast.error(
          "Invalid email or password. Please double-check your email and password."
        );
      } else {
        toast.error("please provide valid password and email");
        console.log(error);
      }
    });
  };
  return (
    <div>
      <div className="hero min-h-screen">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="flex-1">
            <Lottie animationData={signInImg} />;
          </div>
          <div className="flex-1">
            <div className="flex justify-center mb-5">
              <div className="mt-20 flex flex-col bg-white p-10 rounded-xl bg-clip-border text-gray-700 shadow-none">
                <h4 className="block font-sans text-2xl font-semibold leading-snug tracking-normal text-blue-gray-900 antialiased">
                  Sign In
                </h4>
                <p className="mt-1 block font-sans text-base font-normal leading-relaxed text-gray-700 antialiased">
                  Entry your email password to login.
                </p>
                <form
                  onSubmit={handleSignIn}
                  className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96"
                >
                  <div className="mb-4 flex flex-col gap-6">
                    <div className="relative h-11 w-full min-w-[200px]">
                      <input
                        type="email"
                        name="email"
                        className="peer h-full w-full rounded-md border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-[#f6425f] focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                        placeholder=" "
                        required
                      />
                      <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-[#f6425f] peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-[#f6425f] peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-[#f6425f] peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                        Email
                      </label>
                    </div>

                    <div className="relative h-11 w-full min-w-[200px]">
                      <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        className="peer h-full w-full rounded-md border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-[#f6425f] focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                        placeholder=" "
                        required
                      />
                      <span
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-5 top-3 cursor-pointer"
                      >
                        {showPassword ? (
                          <FaEyeSlash></FaEyeSlash>
                        ) : (
                          <FaEye></FaEye>
                        )}
                      </span>
                      <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-[#f6425f] peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-[#f6425f] peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-[#f6425f] peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                        Password
                      </label>
                    </div>
                  </div>

                  <button
                    className="mt-6 block w-full select-none rounded-lg bg-[#f6425f] py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-[#f6425f]/20 transition-all hover:shadow-lg hover:shadow-[#f6425f]/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                    type="submit"
                    data-ripple-light="true"
                  >
                    Sign in
                  </button>
                </form>
                <SocialAuth></SocialAuth>
                <div className="text-center mt-5">
                  <h1 className="text-[#f6425f] mb-2">
                    new here?{" "}
                    <Link to="/signUp">
                      <span className="font-bold">create a account</span>
                    </Link>
                  </h1>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Toaster></Toaster>
    </div>
  );
};

export default SignIn;
