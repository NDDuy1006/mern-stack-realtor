
import instance, { baseURL } from "../@axios/@axios";
import { GoogleSignInPayload, SignInPayload, SignUpPayload } from "../types";

interface AuthType {
  accessToken: string
  refreshToken: string
}

class AuthService {
  private apis = {
    auth: {
      signin: `${baseURL}/auth/signin`,
      googleSignin: `${baseURL}/auth/sigin/google`,
      signup: `${baseURL}/auth/signup/BUYER`,
      token: "",
      password: ""
    },
    user: {
      getMe: `${baseURL}users/me`
    }
  }

  signin(payload: SignInPayload) {
    return instance.post<AuthType>(this.apis.auth.signin, payload)
  }

  goggleSignin(payload: GoogleSignInPayload) {
    return instance.post<AuthType>(this.apis.auth.googleSignin, payload)
  }

  signup(payload: SignUpPayload) {
    return instance.post<AuthType>(this.apis.auth.signup, payload)
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  renewToken(payload: any) {
    return instance.post(this.apis.auth.token, payload)
  }
}

export const authService = new AuthService();