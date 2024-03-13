import instance, { baseURL } from "../@axios/@axios";
import { ResolvedUserType } from "../types";

class AccountService {
  private defaultConfig = {
    headers: { isRequestAuthentication: true }
  }

  private apis = {
    getMe: `${baseURL}/users/me`
  };

  getMe() {
    return instance.get<ResolvedUserType>(this.apis.getMe, {
      ...this.defaultConfig
    })
  }
}

export const accountService = new AccountService();