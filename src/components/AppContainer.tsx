import { ReactElement, useContext } from 'react';
import { useQuery } from 'react-query';

import PlaylistContainer from './PlaylistContainer';
import { AuthContext, authorize, logout } from '../services/authService';
import authConfig from '../configs/authConfig';
import { getMyPlaylists, getMyProfile } from '../util/spotifyAPIHelper';
import { PlaylistT } from '../util/typings';

function AppContainer() {
  const authTokens = useContext(AuthContext);
  const { data: profileResponse } = useQuery(
    'profile',
    () => getMyProfile(authTokens?.accessToken),
    { enabled: !!authTokens?.accessToken },
  );

  const { data: playlistsResponse } = useQuery(
    'playlists',
    () => getMyPlaylists(authTokens?.accessToken),
    { enabled: !!authTokens?.accessToken },
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
      {authTokens?.accessToken && (
        <h1>{`Welcome ${profileResponse?.data.display_name}`}</h1>
      )}
      {!authTokens?.accessToken && <SpotifyLoginLink />}
      {authTokens?.accessToken && (
        <PlaylistContainer userPlaylists={userPlaylists} />
      )}
      {authTokens?.accessToken && <SpotifyLogoutLink />}
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
