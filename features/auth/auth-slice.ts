import {
  createSlice,
  SerializedError,
  createAsyncThunk,
} from "@reduxjs/toolkit";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "../firebase/firebaseConfig";
import { auth } from "../firebase/firebaseConfig";
import axios from "axios";
import authHeader from "./auth-header";

import { GoogleAuthProvider, signInWithPopup } from "@firebase/auth";
import { Logout } from "../firebase/firebase-reducer";
import server from "../../utils/vars";
const app = initializeApp(firebaseConfig);
const provider = new GoogleAuthProvider();
let user = [];
let authenticated = false;
if (typeof window !== "undefined") {
  user = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user") || "{}")
    : null;
  user === null ? (authenticated = false) : (authenticated = true);
}

export interface AuthState {
  displayName: string | null;
  email: string | null;
  authenticated: boolean;
  error: SerializedError | null;
  user: any;
}
interface Payload {
  displayName?: any | null;
  email?: any | null;
  username?: any | null;
}

const initialState: AuthState = {
  displayName: null,
  email: null,
  authenticated,
  error: null,
  user: user,
};
export interface UserResponse {
  user: any;
  token: string;
}

export interface LoginRequest {
  username: string;
  password: string;
}

export const signIn = createAsyncThunk("signIn", async (req: any, thunkAPI) => {
  try {
    const { username, password } = req;

    const credential: any = {
      username,
      password,
    };

    const response = await axios({
      method: "post",
      url: `${server}/auth/login`,
      data: {
        username,
        password,
      },
    });
    const { data } = response;
    const token = data.token;
    const user = data.user;

    const userData = { token, user };
    localStorage.setItem("user", JSON.stringify(userData));
    const email = user.email;
    const displayName = user.firstname;

    return { email, displayName } as Payload;
  } catch (error: any) {
    return thunkAPI.rejectWithValue({ error: error.message });
  }
});

export const logOut = createAsyncThunk("logout", async (req, thunkAPI) => {
  localStorage.removeItem("user");
});
export const loginPopUp = createAsyncThunk(
  "login/firebase",
  async (req: any, thunkAPI) => {
    try {
      if (req.displayName === null) {
        const provider = new GoogleAuthProvider();
        const response = await signInWithPopup(auth, provider);
        const displayName = await response.user?.displayName;
        const email = response.user?.email;
        return { displayName, email } as Payload;
      } else {
        const displayName = req.displayName;
        const email = req.email;
        return { displayName, email } as Payload;
      }
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(loginPopUp.fulfilled, (state, action) => {
      state.displayName = action.payload.displayName;
      state.displayName = action.payload.displayName;
      state.authenticated = true;
    });
    builder.addCase(signIn.fulfilled, (state, action) => {
      state.authenticated = true;
      state.displayName = action.payload.displayName;
      state.email = action.payload.email;
    });

    builder.addCase(logOut.fulfilled, (state) => {
      state.authenticated = false;
      state.displayName = "";
      state.email = "";
      state.user = [];
    });
  },
});
