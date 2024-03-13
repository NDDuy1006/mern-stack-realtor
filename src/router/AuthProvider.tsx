import { ReactElement, useEffect } from 'react';
import { loadAccessToken } from '../utils/storage';
import { useAppDispatch } from '../store/store';
import { getMe } from '../store/user/userSlice';

const AuthProvider = ({ children }: { children: ReactElement }) => {
  const accessToken = loadAccessToken()
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (accessToken)
      dispatch(getMe())
  }, [accessToken, dispatch])

  return children
}

export default AuthProvider