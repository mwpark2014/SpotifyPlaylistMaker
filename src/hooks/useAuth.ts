import { AxiosResponse } from 'axios';
import { useContext } from 'react';

import { AuthContext } from '../services/authService';

export default function useAuth(apiCall: Function, ...args: any[]) {
  const authTokens = useContext(AuthContext);
  if (!authTokens?.accessToken) {
    // TODO: Update with refresh logic and/or better error catching
    throw new Error('User is not authenticated');
  }
  const config = {
    headers: { Authorization: `Bearer ${authTokens.accessToken}` },
  };
  return (): Promise<AxiosResponse> => apiCall(config, args);
}
