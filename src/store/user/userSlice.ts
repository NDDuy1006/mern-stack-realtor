/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { GoogleSignInPayload, ResolvedUserType, SignInPayload } from "../../types";
import { authService } from "../../services/auth.service";
import { ELoad } from "../../types/enum";
import { clearAccessToken, saveAccessToken, saveRefreshToken } from "../../utils/storage";
import { accountService } from "../../services/account.service";

export const signin = createAsyncThunk(
  "user/signin",
  async (payload: SignInPayload) => {
    const response = await authService.signin(payload)
    return response.data
  }
)

export const googleSignin = createAsyncThunk(
  "user/signin/google",
  async (payload: GoogleSignInPayload) => {
    const response = await authService.goggleSignin(payload)
    return response.data
  }
)

export const getMe = createAsyncThunk(
  "user/getMe",
  async () => {
    const response = await accountService.getMe()
    return response.data
  }
)

interface IUserType {
  currentUser: ResolvedUserType | null
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
    // signInStart: (state) => {
    //   state.loading = true
    // },
    // signInSuccess: (state, action) => {
    //   state.currentUser = action.payload
    //   state.loading = false
    //   state.error = null
    // },
    // signInFailure: (state, action) => {
    //   state.error = action.payload
    //   state.loading = false
    // }
    logout: (state) => {
      clearAccessToken()
      state.currentUser = null
    }
  },
  extraReducers: (builder) => {
    builder.addCase(signin.fulfilled, (state, action) => {
      const { payload } = action
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

    builder.addCase(googleSignin.fulfilled, (state, action) => {
      const { payload } = action
      if (payload?.accessToken) saveAccessToken(payload.accessToken)
      if (payload?.refreshToken) saveRefreshToken(payload.refreshToken)

      state.loading = false
    })
    builder.addCase(googleSignin.pending, (state) => {
      state.loading = true
    })
    builder.addCase(googleSignin.rejected, (state) => {
      state.loading = false
    })

    builder.addCase(getMe.fulfilled, (state, action) => {
      const { payload } = action
      state.currentUser = payload
    })
  }
})

// export const { signInFailure, signInStart, signInSuccess } = userSlice.actions
export const userSelector = (state: { userStore: IUserType }) => state.userStore
export default userSlice.reducer