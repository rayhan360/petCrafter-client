import google from "../../assets/googleIcon.png";
import gitHub from "../../assets/githubIcon.png";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";
import useAxiosPublic from "../../hooks/useAxiosPublic";
const SocialAuth = () => {
  const { googleSignIn, githubSignIn } = useAuth();
  const axiosPublic = useAxiosPublic();

  const socialMediaSignIn = (media) => {
    media()
      .then((result) => {
        console.log(result.user);
        const userInfo = {
          name: result.user?.displayName,
          email: result.user?.email,
          photo: result.user?.photoURL,
          role: 'user'
        };
        axiosPublic.post("/users", userInfo).then((res) => {
          console.log(res.data);
          if (res.data.insertedId) {
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "user Log In successfull",
              showConfirmButton: false,
              timer: 1500,
            });
          }
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div>
      <div className="divider mx-6">Or</div>
      <div className="flex justify-center gap-4">
        <button onClick={() => socialMediaSignIn(googleSignIn)} className="btn">
          <img className="w-8" src={google} alt="" />
          Google
        </button>
        <button onClick={() => socialMediaSignIn(githubSignIn)} className="btn">
          <img className="w-8" src={gitHub} alt="" />
          GitHub
        </button>
      </div>
    </div>
  );
};

export default SocialAuth;
