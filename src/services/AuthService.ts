import axios from 'axios';
import { Buffer } from 'buffer';
import { randomBytes, createHash } from 'crypto-browserify';
import { createContext } from 'react';
import { AuthConfig } from '../configs/AuthConfig';

export type AuthTokens = {
  accessToken: string;
  expiresIn: string;
  refreshToken: string;
};

type PKCECodePair = {
  codeVerifier: string;
  codeChallenge: string;
  createdAt: Date;
};

type TokenRequestBody = {
  code?: string;
  code_verifier?: string;
  grant_type: string;
  client_id: string;
  redirect_uri?: string;
  refresh_token?: string;
};

export const AuthContext = createContext<AuthTokens | undefined>(undefined);

// this will do a full page reload and to to the OAuth2 provider's login page and then redirect back to redirectUri
export function authorize(authConfig: AuthConfig): void {
  const { clientId, authorizeEndpoint, redirectUri, scopes } = authConfig;

  const pkce = createPKCECodes();
  const codeChallenge = pkce.codeChallenge;
  window.sessionStorage.setItem('code_verifier', pkce.codeVerifier);

  const query = {
    client_id: clientId,
    scope: scopes ? scopes.join(' ') : '',
    response_type: 'code',
    redirect_uri: redirectUri,
    code_challenge: codeChallenge,
    code_challenge_method: 'S256',
  };
  // Responds with a 302 redirect
  const url = `${authorizeEndpoint}?${new URLSearchParams(query)}`;
  window.location.replace(url);
}

export async function logout(authConfig: AuthConfig): Promise<boolean> {
  const { logoutEndpoint } = authConfig;
  window.location.replace(logoutEndpoint);
  return true;
}

export async function fetchToken(
  authConfig: AuthConfig,
  code: string,
  setAuthTokens: Function,
): Promise<void> {
  console.log('Fetching token');
  const { clientId, tokenEndpoint, redirectUri } = authConfig;
  const code_verifier = window.sessionStorage.getItem('code_verifier');
  if (code_verifier === null) {
    throw new Error('PKCE code verifier not found in session storage');
  }

  requestTokenAndUpdate(
    {
      code,
      code_verifier,
      grant_type: 'authorization_code',
      client_id: clientId,
      redirect_uri: redirectUri,
    },
    tokenEndpoint,
    setAuthTokens,
  );
  cleanQueryParams();
}

function cleanQueryParams(): void {
  window.history.replaceState({}, document.title, window.location.origin);
}

export async function refreshToken(
  authConfig: AuthConfig,
  refreshToken: string,
  setAuthTokens: Function,
) {
  const { clientId, tokenEndpoint } = authConfig;
  requestTokenAndUpdate(
    {
      client_id: clientId,
      grant_type: 'refresh_token',
      refresh_token: refreshToken,
    },
    tokenEndpoint,
    setAuthTokens,
  );
}

async function requestTokenAndUpdate(
  payload: TokenRequestBody,
  url: string,
  setAuthTokens: Function,
) {
  const requestOptions = {
    method: 'POST',
    url,
    headers: {
      'content-type': 'application/x-www-form-urlencoded',
    },
    data: payload,
  };

  try {
    const response = await axios(requestOptions);
    setAuthTokens({
      accessToken: response.data.access_token,
      expiresIn: response.data.expires_in,
      refreshToken: response.data.refresh_token,
    });
  } catch (error) {
    console.error(error);
  } finally {
    window.sessionStorage.removeItem('code_verifier');
  }
  // if (autoRefresh) {
  //   this.startTimer();
  // }
}

// function armRefreshTimer(refreshToken: string, timeoutDuration: number): void {
//   if (this.timeout) {
//     clearTimeout(this.timeout);
//   }
//   this.timeout = window.setTimeout(() => {
//     this.fetchToken(refreshToken, true)
//       .then(({ refresh_token: newRefreshToken, expires_at: expiresAt }) => {
//         if (!expiresAt) return;
//         const now = new Date().getTime();
//         const timeout = expiresAt - now;
//         if (timeout > 0) {
//           this.armRefreshTimer(newRefreshToken, timeout);
//         } else {
//           this.removeItem('auth');
//           this.removeCodeFromLocation();
//         }
//       })
//       .catch(e => {
//         this.removeItem('auth');
//         this.removeCodeFromLocation();
//         console.warn({ e });
//       });
//   }, timeoutDuration);
// }

// function startTimer(): void {
//   const authTokens = this.getAuthTokens();
//   if (!authTokens) {
//     return;
//   }
//   const { refresh_token: refreshToken, expires_at: expiresAt } = authTokens;
//   if (!expiresAt || !refreshToken) {
//     return;
//   }
//   const now = new Date().getTime();
//   const timeout = expiresAt - now;
//   if (timeout > 0) {
//     this.armRefreshTimer(refreshToken, timeout);
//   } else {
//     this.removeItem('auth');
//     this.removeCodeFromLocation();
//   }
// }

const base64URLEncode = (str: Buffer): string => {
  return str
    .toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=/g, '');
};

const sha256 = (buffer: Buffer): Buffer => {
  return createHash('sha256').update(buffer).digest();
};

function createPKCECodes(): PKCECodePair {
  const codeVerifier = base64URLEncode(randomBytes(64));
  const codeChallenge = base64URLEncode(sha256(Buffer.from(codeVerifier)));
  const createdAt = new Date();
  const codePair = {
    codeVerifier,
    codeChallenge,
    createdAt,
  };
  return codePair;
}
