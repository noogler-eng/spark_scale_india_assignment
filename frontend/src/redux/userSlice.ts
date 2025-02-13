import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  id: string | null;
  email: string | null;
  isAdmin: boolean;
}

const initialState: UserState = {
  id: null,
  email: null,
  isAdmin: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (
      state,
      action: PayloadAction<{ id: string; email: string; isAdmin: boolean }>
    ) => {
      state.id = action.payload.id;
      state.email = action.payload.email;
      state.isAdmin = action.payload.isAdmin;
      localStorage.setItem("user", JSON.stringify(action.payload));
    },
    logout: (state) => {
      state.id = null;
      state.email = null;
      state.isAdmin = false;
      localStorage.removeItem("user");
    },
    loadUser: (state) => {
      const savedUser = localStorage.getItem("user");
      if (savedUser) {
        const user = JSON.parse(savedUser);
        state.id = user.id;
        state.email = user.email;
        state.isAdmin = user.isAdmin;
      }
    },
  },
});

export const { login, logout, loadUser } = userSlice.actions;
export default userSlice.reducer;
