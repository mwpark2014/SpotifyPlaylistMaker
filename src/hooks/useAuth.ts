import { AxiosRequestConfig, AxiosResponse } from 'axios';
import { useContext, useMemo } from 'react';

import { AuthContext } from '../services/authService';

export default function useAuth<T>(
  apiRequest: (config: AxiosRequestConfig) => Promise<AxiosResponse<T>>,
) {
  const authTokens = useContext(AuthContext);
  return useMemo(() => {
    if (!authTokens?.accessToken) {
      // TODO: Update with refresh logic and/or better error catching
      return () => Promise.reject('User is not authenticated');
    }
    const config = {
      headers: { Authorization: `Bearer ${authTokens.accessToken}` },
    };

    return () => apiRequest(config);
  }, [authTokens, apiRequest]);
}
