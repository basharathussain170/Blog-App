import axios from "axios";
import { Server_URL } from "../main";
import { useDispatch } from "react-redux";
import { setAuthorBlogs } from "../redux/userSlice";

function useGetAuthorBlogs() {
  const dispatch = useDispatch();
  const authorBlogs = async () => {
    try {
      const response = await axios.get(`${Server_URL}/blogs/author-blogs`, {
        withCredentials: true,
      });
      dispatch(setAuthorBlogs(response?.data?.payload));
    } catch (error) {
      console.log("error while get author blog", error);
    }
  };
  return authorBlogs;
}
export default useGetAuthorBlogs;
