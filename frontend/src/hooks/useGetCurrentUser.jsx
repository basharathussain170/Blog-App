
import { useDispatch } from "react-redux";
import { Server_URL } from "../main";
import axios from "axios";
import { setUserData } from "../redux/userSlice";

function useGetCurrentUser() {
  const dispatch = useDispatch();

  const getCurrentUser = async () => {
    try {
      const response = await axios.get(`${Server_URL}/users/current-user`, {
        withCredentials: true,
      });
      dispatch(setUserData(response?.data?.payload));
    } catch (err) {
      dispatch(setUserData(null));
    }
  };

  return getCurrentUser;
}
export default useGetCurrentUser;
