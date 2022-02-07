import {
  createAsyncThunk,
  createSlice,
  SerializedError,
} from "@reduxjs/toolkit";
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { auth, firebaseConfig } from "./firebaseConfig";
import {
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  createUserWithEmailAndPassword,
} from "@firebase/auth";
import { async } from "@firebase/util";

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export interface AuthState {
  displayName?: string | null;
  email?: string | null;
  authenticated?: boolean;
  error?: SerializedError;
}

const initialState: AuthState = {
  displayName: undefined,
  email: undefined,
  authenticated: undefined,
  error: undefined,
};

const provider = new GoogleAuthProvider();

export const singWithPopup = createAsyncThunk(
  "users/google",
  async (userId, thunkAPI) => {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(auth, provider);
  }
);
export const Logout = createAsyncThunk("users/logout", async (_, thunkAPI) => {
  return signOut(auth);
});
export const signUp = createAsyncThunk(
  "users/signup",
  async (user: any, thunkAPI) => {
    const { email, password } = user;
    return createUserWithEmailAndPassword(auth, email, password);
  }
);

export const authSliceFirebase = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(singWithPopup.fulfilled, (state, action) => {
      state.authenticated;
    });
    builder.addCase(signUp.fulfilled, (state, action) => {
      state.email = state.email;
    });
    builder.addCase(Logout.fulfilled, (state) => {
      state.email = "";
      state.authenticated = false;
      state.displayName = "";

      localStorage.removeItem("user");
    });
  },
});
