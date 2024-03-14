/* eslint-disable @typescript-eslint/no-explicit-any */
import { ReactElement, useEffect } from 'react';
import { loadAccessToken, loadRefreshToken, saveAccessToken } from '../utils/storage';
import { useAppDispatch } from '../store/store';
import { getMe, logout, renewToken } from '../store/user/userSlice';

const AuthProvider = ({ children }: { children: ReactElement }) => {
  const accessToken = loadAccessToken()
  const refreshToken = loadRefreshToken()
  const dispatch = useAppDispatch()

  let isRefreshing = false

  const handleRefreshToken = (token: string) => {
    if (!isRefreshing) {
      isRefreshing = true
      dispatch(renewToken(token))
        .then((res: any) => {
          isRefreshing = false
          saveAccessToken(res.token)
        })
        .catch(() => {
          dispatch(logout())
        })
    }
  }

  useEffect(() => {
    if (accessToken)
      dispatch(getMe())
  }, [accessToken, dispatch])

  useEffect(() => {
    if (refreshToken && accessToken) {
      const parseAccessTokenGlobal = JSON.parse(
          window.atob(accessToken.split('.')[1].replace('-', '+').replace('_', '/'))
      );
      const tokenExpiration = parseAccessTokenGlobal?.exp;
      const currentTime = Math.floor(Date.now() / 1000);
      
      if (tokenExpiration <= currentTime) {
        handleRefreshToken(refreshToken)
      }
    }
  }, [accessToken, refreshToken])

  return children
}

export default AuthProvider