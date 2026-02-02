import axios from "axios";
import { Server_URL } from "../main";
import { useDispatch } from "react-redux";
import { setAllBlogs } from "../redux/userSlice";

function useGetAllBlogs() {
  const dispatch = useDispatch();
  const getAllBlogs = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `${Server_URL}/blogs/all`,
        // {
        //   withCredentials: true,
        // },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      dispatch(setAllBlogs(response?.data?.payload));
    } catch (error) {
      console.log("error while geting blogs", error);
    }
  };
  return getAllBlogs;
}
export default useGetAllBlogs;
