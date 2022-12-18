export type AuthConfig = {
  clientId: string;
  authorizeEndpoint: string;
  tokenEndpoint: string;
  logoutEndpoint: string;
  redirectUri: string;
  scopes?: string[];
  state?: string;
};

const authConfig: AuthConfig = {
  clientId: '70cd45ebb41f48b0a582a6a6ecf23f72',
  authorizeEndpoint: 'https://accounts.spotify.com/authorize',
  tokenEndpoint: 'https://accounts.spotify.com/api/token',
  logoutEndpoint: 'https://accounts.spotify.com/en/logout',
  redirectUri: `${window.location.origin}/callback`,
  scopes: [
    'user-read-private',
    'playlist-read-private',
    'playlist-read-collaborative',
    'playlist-modify-private',
    'playlist-modify-public',
    'user-modify-playback-state',
  ],
};

export default authConfig;
