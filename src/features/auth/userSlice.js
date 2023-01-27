import { createSlice } from "@reduxjs/toolkit";
import { addToLocal, getUser } from "../localStorage";




const initialState = {
  user: getUser()
};



export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    addUser: (state, action) => {
      state.user = action.payload;
      addToLocal(action.payload);
    }
  }
});
export const { addUser } = userSlice.actions;

export default userSlice.reducer;