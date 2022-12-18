import { useEffect } from 'react';
import { AuthConfig } from '../configs/authConfig';
import { fetchToken } from '../services/AuthService';

export default function useAuth(
  authConfig: AuthConfig,
  setAuthTokens: Function,
) {
  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const code = searchParams.get('code');
    const state = searchParams.get('state');

    if (code && state) {
      fetchToken(authConfig, code, state, setAuthTokens);
    }
  }, [authConfig, setAuthTokens]);
}
