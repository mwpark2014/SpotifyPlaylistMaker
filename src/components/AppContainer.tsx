import { ReactElement, useContext } from 'react';
import { useQuery } from 'react-query';

import PlaylistContainer from './PlaylistContainer';
import { AuthContext, authorize, logout } from '../services/authService';
import authConfig from '../configs/authConfig';
import { getMyPlaylists, getMyProfile } from '../util/spotifyAPIHelper';
import {
  PlaylistT,
  SpotifyPlaylistsResponse,
  SpotifyProfileResponse,
} from '../util/typings';
import useAuth from '../hooks/useAuth';

function AppContainer() {
  const authTokens = useContext(AuthContext);
  const isLoggedIn = !!authTokens?.accessToken;

  const { data: profileResponse } = useQuery(
    'profile',
    useAuth<SpotifyProfileResponse>(config => getMyProfile(config)),
    {
      enabled: isLoggedIn,
    },
  );

  const { data: playlistsResponse } = useQuery(
    'playlists',
    useAuth<SpotifyPlaylistsResponse>(config => getMyPlaylists(config)),
    { enabled: isLoggedIn },
  );

  let userPlaylists: PlaylistT[] = [];
  if (playlistsResponse) {
    userPlaylists = playlistsResponse.data.items.map(playlist => ({
      name: playlist.name,
      id: playlist.id,
    }));
  }

  return (
    <div className="App">
      {isLoggedIn && <h1>{`Welcome ${profileResponse?.data.display_name}`}</h1>}
      {!isLoggedIn && <SpotifyLoginLink />}
      {isLoggedIn && <PlaylistContainer userPlaylists={userPlaylists} />}
      {isLoggedIn && <SpotifyLogoutLink />}
    </div>
  );
}

function SpotifyLoginLink(): ReactElement {
  return (
    <button onClick={() => authorize(authConfig)}>Login to Spotify</button>
  );
}

function SpotifyLogoutLink(): ReactElement {
  return <button onClick={() => logout(authConfig)}>Log out of Spotify</button>;
}

export default AppContainer;
