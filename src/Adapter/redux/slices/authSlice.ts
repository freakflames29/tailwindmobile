import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Session, User } from "@supabase/supabase-js";

interface AuthState {
  user: User | null;
  session: Session | null;
}

const initialState: AuthState = {
  user: null,
  session: null,
};

const authSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {
    setAuth: (state, action: PayloadAction<AuthState>) => {
      state.user = action.payload.user;
      state.session = action.payload.session;
    },
    clearAuth: (state, action: PayloadAction<AuthState>) => {
      state.user = null;
      state.session = null;
    },
  },
});

export const authActions = authSlice.actions;
export default authSlice;
