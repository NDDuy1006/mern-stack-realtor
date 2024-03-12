/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { SignInFormType } from "../../types";
import { authService } from "../../services/auth.service";
import { ELoad } from "../../types/enum";
import { saveAccessToken, saveRefreshToken } from "../../utils/storage";

export const signin = createAsyncThunk(
  "user/signin", async (form: SignInFormType) => {
    const response = await authService.signin(form)
    return response.data
  })

interface IUserType {
  currentUser: any
  error: null
  loading: boolean
  indicator: {
    create: ELoad;
    update: ELoad;
    auth: ELoad;
  };
}

const initialState: IUserType = {
  currentUser: null,
  error: null,
  loading: false,
  indicator: {
    create: ELoad.INIT,
    update: ELoad.INIT,
    auth: ELoad.INIT,
  }
}

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signInStart: (state) => {
      state.loading = true
    },
    signInSuccess: (state, action) => {
      state.currentUser = action.payload
      state.loading = false
      state.error = null
    },
    signInFailure: (state, action) => {
      state.error = action.payload
      state.loading = false
    }
  },
  extraReducers: (builder) => {
    builder.addCase(signin.fulfilled, (state, action) => {
      console.log("🚀🚀🚀 Oi oi oi ~ signin.fulfilled 🚀🚀🚀:", signin.fulfilled)
      const { payload } = action
      console.log("🚀🚀🚀 Oi oi oi ~ payload 🚀🚀🚀:", payload)
      if (payload?.accessToken) saveAccessToken(payload.accessToken)
      if (payload?.refreshToken) saveRefreshToken(payload.refreshToken)

      state.loading = false
    })
    builder.addCase(signin.pending, (state) => {
      state.loading = true
    })
    builder.addCase(signin.rejected, (state) => {
      state.loading = false
    })
  }
})

export const { signInFailure, signInStart, signInSuccess } = userSlice.actions
export const userSelector = (state: { userStore: IUserType }) => state.userStore
export default userSlice.reducer