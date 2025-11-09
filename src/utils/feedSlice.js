import { createSlice } from "@reduxjs/toolkit";

const feedSlice = createSlice({
  name: "feed",
  initialState: null,
  reducers: {
    addFeed: (state, action) => {
      return action.payload;
    },
    removeUserFromFeed: (state, action) => {
      if (!state) return state;
      // return a new array excluding the user with the given id
      return state.filter((user) => user._id !== action.payload);
    },
  },
});
export const { addFeed, removeUserFromFeed } = feedSlice.actions;
export default feedSlice.reducer;
