import { AxiosRequestConfig, AxiosResponse } from 'axios';
import { useContext, useMemo } from 'react';

import { AuthContext } from '../services/authService';

/**
 *
 * @param apiRequest A function that makes an API request through axios
 *   @param config An AxiosRequestConfig object
 *   @param additionalParams an abritrary number of unnamed parameters
 *   @returns a promise containing the API response
 * @returns the apiRequest function wrapped with added parameters
 */
export default function useAuth<T>(
  apiRequest: (
    config: AxiosRequestConfig,
    ...additionalParams: any
  ) => Promise<AxiosResponse<T>>,
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

    return (...additionalParams: any[]) =>
      apiRequest(config, ...additionalParams);
  }, [authTokens, apiRequest]);
}
