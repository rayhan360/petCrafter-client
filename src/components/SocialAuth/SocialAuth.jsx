import google from "../../assets/googleIcon.png";
import gitHub from "../../assets/githubIcon.png";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";
const SocialAuth = () => {
  const { googleSignIn, githubSignIn } = useAuth();

  const socialMediaSignIn = (media) => {
    media()
      .then((result) => {
        console.log(result.user);
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "user created successfull",
          showConfirmButton: false,
          timer: 1500,
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
        <button onClick={()=> socialMediaSignIn(googleSignIn)} className="btn">
          <img className="w-8" src={google} alt="" />
          Google
        </button>
        <button onClick={()=> socialMediaSignIn(githubSignIn)} className="btn">
          <img className="w-8" src={gitHub} alt="" />
          GitHub
        </button>
      </div>
    </div>
  );
};

export default SocialAuth;
