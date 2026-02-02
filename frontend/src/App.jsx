import { Route, Routes, Outlet, Navigate } from "react-router-dom";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import Nav from "./components/Nav";
import AddBlog from "./pages/AddBlog";
import Blogs from "./components/Blogs";
import Home from "./pages/Home";
import Footer from "./components/Footer";
import OwnerBlogs from "./components/OwnerBlogs";
import EditBlog from "./pages/EditBlog";
import useGetCurrentUser from "./hooks/useGetCurrentUser";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import useGetAllBlogs from "./hooks/useGetAllBlogs";
import useGetAuthorBlogs from "./hooks/useGetAuthorBlogs";
import DetailBlog from "./pages/DetailBlog";

// Layout with Nav always visible

function MainLayout() {
  return (
    <div
      className="pt-16 min-h-screen flex flex-col overflow-y-auto main-scrollbar 
      bg-linear-to-br from-blue-50 via-pink-50 to-green-50"
    >
      <Nav />

      {/* Page Content */}
      <main className="flex-1">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}

function App() {
  const getCurrentUser = useGetCurrentUser();
  const getAllBlogs = useGetAllBlogs();
  const authorBlogs = useGetAuthorBlogs();
  const { userData } = useSelector((state) => state.user);
  useEffect(() => {
    getCurrentUser();
    getAllBlogs();
  }, []);

  useEffect(() => {
    if (userData?.role == "author" && userData?.blogs?.length > 0) {
      authorBlogs();
    }
  }, [userData]);

  return (
    <Routes>
      <Route
        path="/signup"
        element={!userData ? <Signup /> : <Navigate to={"/"} />}
      />
      <Route
        path="/signin"
        element={!userData ? <Signin /> : <Navigate to={"/"} />}
      />
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/get-blog/:id" element={<DetailBlog />} />
        <Route
          path="/add-blog"
          element={userData ? <AddBlog /> : <Navigate to={"/signin"} />}
        />
        <Route path="/blogs" element={<Blogs />} />
        <Route
          path="/edit-blog/:id"
          element={userData ? <EditBlog /> : <Navigate to={"/signin"} />}
        />
        <Route
          path="/total-blogs"
          element={userData ? <OwnerBlogs /> : <Navigate to={"/signin"} />}
        />
      </Route>
    </Routes>

    // <Routes>
    //   <Route element={<MainLayout />}>
    //     <Route path="/" element={<Home noNav />} />
    //     <Route path="/blogs" element={<Blogs />} />
    //     <Route path="/total-blogs" element={<OwnerBlogs />} />
    //     <Route path="/add-blog" element={<AddBlog />} />
    //     <Route path="/edit-blog/:id" element={<EditBlog />} />
    //   </Route>
    //   <Route path="/signup" element={<Signup />} />
    //   <Route path="/signin" element={<Signin />} />
    // </Routes>
  );
}

export default App;
