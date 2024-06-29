import { RootState } from "@/redux/Store";
import { useSelector } from "react-redux";

function useUser() {
  const user = useSelector((state: RootState) => state.user.currentUser);

  // @return {object} user

  return user;
}

export default useUser;
