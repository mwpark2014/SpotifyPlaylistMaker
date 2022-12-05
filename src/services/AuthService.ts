import axios from 'axios';
import { Buffer } from 'buffer';
import { randomBytes, createHash } from 'crypto-browserify';
import { AuthConfig } from '../configs/AuthConfig';

type TokenRequestBody = {
  clientId: string;
  grantType: string;
  redirectUri?: string;
  refresh_token?: string;
  clientSecret?: string;
  code?: string;
  codeVerifier?: string;
};

type PKCECodePair = {
  codeVerifier: string;
  codeChallenge: string;
  createdAt: Date;
};

// this will do a full page reload and to to the OAuth2 provider's login page and then redirect back to redirectUri
export function authorize(authConfig: AuthConfig): boolean {
  const { clientId, authorizeEndpoint, redirectUri, scopes } = authConfig;

  const pkce = createPKCECodes();
  const codeChallenge = pkce.codeChallenge;

  const query = {
    clientId,
    scope: scopes ? scopes.join(' ') : '',
    responseType: 'code',
    redirectUri,
    codeChallenge,
    codeChallengeMethod: 'S256',
  };
  // Responds with a 302 redirect
  const url = `${authorizeEndpoint}?${new URLSearchParams(query)}`;
  window.location.replace(url);
  return true;
}

export async function logout(authConfig: AuthConfig): Promise<boolean> {
  const { logoutEndpoint } = authConfig;
  window.location.replace(logoutEndpoint);
  return true;
}

// function restoreUri(): void {
//   const uri = window.localStorage.getItem('preAuthUri');
//   window.localStorage.removeItem('preAuthUri');
//   console.log({ uri });
//   if (uri !== null) {
//     window.location.replace(uri);
//   }
//   this.removeCodeFromLocation();
// }

// async function fetchToken(
//   code: string,
//   isRefresh = false,
// ): Promise<AuthTokens> {
//   const {
//     clientId,
//     clientSecret,
//     contentType,
//     provider,
//     tokenEndpoint,
//     redirectUri,
//     autoRefresh = true,
//   } = this.props;
//   const grantType = 'authorization_code';

//   let payload: TokenRequestBody = {
//     clientId,
//     ...(clientSecret ? { clientSecret } : {}),
//     redirectUri,
//     grantType,
//   };
//   if (isRefresh) {
//     payload = {
//       ...payload,
//       grantType: 'refresh_token',
//       refresh_token: code,
//     };
//   } else {
//     const pkce: PKCECodePair = this.getPkce();
//     const codeVerifier = pkce.codeVerifier;
//     payload = {
//       ...payload,
//       code,
//       codeVerifier,
//     };
//   }

//   const response = await fetch(`${tokenEndpoint || `${provider}/token`}`, {
//     headers: {
//       'Content-Type': contentType || 'application/x-www-form-urlencoded',
//     },
//     method: 'POST',
//     body: toUrlEncoded(payload),
//   });
//   this.removeItem('pkce');
//   let json = await response.json();
//   if (isRefresh && !json.refresh_token) {
//     json.refresh_token = payload.refresh_token;
//   }
//   this.setAuthTokens(json as AuthTokens);
//   if (autoRefresh) {
//     this.startTimer();
//   }
//   return this.getAuthTokens();
// }

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

// ===================================

// const code = this.getCodeFromLocation(window.location)
//   if (code !== null) {
//     this.fetchToken(code)
//       .then(() => {
//         this.restoreUri()
//       })
//       .catch((e) => {
//         this.removeItem('pkce')
//         this.removeItem('auth')
//         this.removeCodeFromLocation()
//         console.warn({ e })
//       })
//   } else if (this.props.autoRefresh) {
//     this.startTimer()
//   }

// setAuthTokens(auth: AuthTokens): void {
//   const { refreshSlack = 5 } = this.props
//   const now = new Date().getTime()
//   auth.expires_at = now + (auth.expires_in + refreshSlack) * 1000
//   window.localStorage.setItem('auth', JSON.stringify(auth))
// }

// getAuthTokens(): AuthTokens {
//   return JSON.parse(window.localStorage.getItem('auth') || '{}')
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
