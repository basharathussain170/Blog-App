import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: { userData: null, allBlogs: null, authorBlogs: null },
  reducers: {
    setUserData: (state, action) => {
      state.userData = action.payload;
    },
    setAllBlogs: (state, action) => {
      state.allBlogs = action.payload;
    },
    setAuthorBlogs: (state, action) => {
      state.authorBlogs = action.payload;
    },
    removeAuthorBlog: (state, action) => {
      const blogId = action.payload;

      if (state.allBlogs) {
        state.allBlogs = state.allBlogs.filter((blog) => blog._id !== blogId);
      }

      if (state.authorBlogs) {
        state.authorBlogs = state.authorBlogs.filter(
          (blog) => blog._id !== blogId,
        );
      }
    },

    updateAuthorBlog: (state, action) => {
      const updatedBlog = action.payload;

      state.allBlogs = state.allBlogs.map((blog) =>
        blog._id == updatedBlog._id ? updatedBlog : blog,
      );

      state.authorBlogs = state.authorBlogs.map((blog) =>
        blog._id == updatedBlog._id ? updatedBlog : blog,
      );
    },

    addNewBlog: (state, action) => {
      const newBlog = action.payload;

      state.allBlogs = state.allBlogs
        ? [newBlog, ...state.allBlogs]
        : [newBlog];

      state.authorBlogs = state.authorBlogs
        ? [newBlog, ...state.authorBlogs]
        : [newBlog];
    },
  },
});

export const {
  setUserData,
  setAllBlogs,
  setAuthorBlogs,
  removeAuthorBlog,
  updateAuthorBlog,
  addNewBlog,
} = userSlice.actions;
export default userSlice.reducer;
