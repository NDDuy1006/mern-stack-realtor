import axios from "axios";
import { SignInFormType } from "../types";

interface AuthType {
  accessToken: string;
  refreshToken: string
}

class AuthService {
  private apis = {
    auth: {
      signin: `${import.meta.env.VITE_API_ENDPOINT}/auth/signin`,
      signup: "auth/signup",
      token: "",
      password: ""
    }
  }

  signin(form: SignInFormType) {
    return axios.post<AuthType>(this.apis.auth.signin, form)
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  renewToken(form: any) {
    return axios.post(this.apis.auth.token, form)
  }
}

export const authService = new AuthService();