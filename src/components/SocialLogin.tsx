import { GoogleAuthProvider } from "firebase/auth";
import { FacebookAuthProvider } from "firebase/auth";
import { getAuth, signInWithPopup } from "firebase/auth";

import facebookSvg from "@/assets/images/socialIcon/facebook.svg";
import googleSvg from "@/assets/images/socialIcon/google.svg";
import app from "@/firebase/firebaseConfig";
import { useToast } from "./ui/use-toast";

function SocialLogin() {
  const auth = getAuth(app);
  const toast = useToast();

  const facebookProvider = new FacebookAuthProvider();
  const googleProvider = new GoogleAuthProvider();

  // TODO: add user in database after login

  const handleGoogleSingin = async () => {
    await signInWithPopup(auth, googleProvider)
      .then((result) => {
        console.log(result);
        toast.toast({
          title: "logged in successfully",
          description: "You can now login to your account",
        });
      })
      .catch(() => {
        toast.toast({
          title: "Uh oh! Something went wrong.",
          description: "There was a problem logging in with Facebook.",
        });
      });
  };

  const handleFacebookSingin = async () => {
    await signInWithPopup(auth, facebookProvider)
      .then((result) => {
        console.log(result);
        toast.toast({
          title: "logged in successfully",
          description: "You can now login to your account",
        });
      })
      .catch(() => {
        toast.toast({
          title: "Uh oh! Something went wrong.",
          description: "There was a problem logging in with Facebook.",
        });
      });
  };

  return (
    <div className="mt-10 space-y-5">
      <div className="flex items-center">
        <div className="flex-1 border-t border-black dark:border-gray-300 my-4"></div>
        <div className="mx-4 border-black dark:text-gray-300">or</div>
        <div className="flex-1 border-t border-black dark:border-gray-300 my-4"></div>
      </div>
      <div
        className=" flex items-center justify-center text-white bg-blue-600 hover:bg-blue-800 primary_button space-x-3"
        onClick={handleFacebookSingin}
      >
        <img src={facebookSvg} alt="" />
        <span>Login with Facebook</span>
      </div>

      <div
        className="flex items-center justify-center text-black bg-white primary_button space-x-3
         hover:bg-zinc-200 border border-zinc-300"
        onClick={handleGoogleSingin}
      >
        <img src={googleSvg} alt="" />
        <span> Login with Google</span>
      </div>
    </div>
  );
}

export default SocialLogin;
