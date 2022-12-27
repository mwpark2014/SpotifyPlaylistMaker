import { AxiosResponse } from 'axios';
import { useContext } from 'react';

import { AuthContext } from '../services/authService';

export default function useAuth<T>(apiCall: Function, ...args: any[]) {
  const authTokens = useContext(AuthContext);
  if (!authTokens?.accessToken) {
    // TODO: Update with refresh logic and/or better error catching
    return () => Promise.reject('User is not authenticated');
  }
  const config = {
    headers: { Authorization: `Bearer ${authTokens.accessToken}` },
  };
  return (): Promise<AxiosResponse<T>> => apiCall(config, args);
}
