import { GoogleAuthProvider } from "firebase/auth";
import { FacebookAuthProvider } from "firebase/auth";
import { getAuth, signInWithPopup } from "firebase/auth";

import facebookSvg from "@/assets/images/socialIcon/facebook.svg";
import googleSvg from "@/assets/images/socialIcon/google.svg";
import app from "@/firebase/firebaseConfig";
import { useToast } from "./ui/use-toast";
import { useSocialLoginMutation } from "@/redux/services/User";
import { Button } from "./ui/button";
import ProssingAnimation from "./ProssingAnimation";
import { setUser } from "@/redux/user/UserSlice";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

function SocialLogin() {
  const auth = getAuth(app);
  const toast = useToast();
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const from = location.state?.from?.pathname || "/";

  const facebookProvider = new FacebookAuthProvider();
  const googleProvider = new GoogleAuthProvider();

  const [socialLogin, { isLoading }] = useSocialLoginMutation();

  const handleGoogleSingin = async () => {
    try {
      const res = await signInWithPopup(auth, googleProvider);

      const data = {
        name: res.user.displayName,
        email: res.user.email,
        image: res.user.photoURL,
      };

      const DBres = await socialLogin(data).unwrap();
      if (DBres?.success) {
        dispatch(setUser(DBres?.payload));
        navigate(from, { replace: true });

        toast.toast({
          title: "logged in successfully",
        });
      }
    } catch (error: any) {
      toast.toast({
        variant: "destructive",
        title: "Error",
        description: error.message,
      });
    }
  };

  const handleFacebookSingin = async () => {
    try {
      const res = await signInWithPopup(auth, facebookProvider);

      const data = {
        name: res.user.displayName,
        email: res.user.email,
        image: res.user.photoURL,
      };

      const DBres = await socialLogin(data).unwrap();
      if (DBres?.success) {
        dispatch(setUser(DBres?.payload));
        navigate(from, { replace: true });

        toast.toast({
          title: "logged in successfully",
        });
      }
    } catch (error: any) {
      toast.toast({
        variant: "destructive",
        title: "Error",
        description: error.message,
      });
    }
  };

  return (
    <div className="mt-10 space-y-5">
      <div className="flex items-center">
        <div className="flex-1 border-t border-black dark:border-gray-300 my-4"></div>
        <div className="mx-4 border-black dark:text-gray-300">or</div>
        <div className="flex-1 border-t border-black dark:border-gray-300 my-4"></div>
      </div>

      <Button
        onClick={handleFacebookSingin}
        className="w-full space-x-3 cursor-pointer py-6 text-white bg-blue-600 hover:bg-blue-800"
      >
        {isLoading ? (
          <ProssingAnimation />
        ) : (
          <>
            <img src={facebookSvg} alt="facebookSvg" />
            <span>Login with Facebook</span>
          </>
        )}
      </Button>

      <Button
        onClick={handleGoogleSingin}
        className="w-full space-x-3 cursor-pointer py-6 bg-white text-black hover:bg-zinc-200 border border-zinc-300"
      >
        {isLoading ? (
          <ProssingAnimation />
        ) : (
          <>
            <img src={googleSvg} alt="googleSvg" />
            <span> Login with Google</span>
          </>
        )}
      </Button>
    </div>
  );
}

export default SocialLogin;
