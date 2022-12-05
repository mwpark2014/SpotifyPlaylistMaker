import { useEffect } from 'react';
import { AuthConfig } from '../configs/AuthConfig';
import { fetchToken } from '../services/AuthService';

export default function useAuth(
  authConfig: AuthConfig,
  setAuthTokens: Function,
) {
  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const code = searchParams.get('code');

    if (code) {
      fetchToken(authConfig, code, setAuthTokens);
    }
  }, [authConfig, setAuthTokens]);
}
