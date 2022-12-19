import React, { ReactElement, useContext } from 'react';
import { useQuery } from 'react-query';

import PlaylistContainer from './PlaylistContainer';
import { AuthContext, authorize, logout } from '../services/authService';
import authConfig from '../configs/authConfig';
import { getMyProfile, getPlaylists } from '../util/spotifyAPIHelper';

function AppContainer() {
  const authTokens = useContext(AuthContext);
  const { data: profileResponse } = useQuery(
    'profile',
    () => getMyProfile(authTokens?.accessToken),
    { enabled: !!authTokens?.accessToken },
  );

  const { data: playlistResponse } = useQuery(
    'playlists',
    () =>
      getPlaylists(authTokens?.accessToken, (profileResponse as any)?.data.id),
    { enabled: !!profileResponse },
  );

  let userPlaylists = [];
  if (playlistResponse) {
    userPlaylists = (playlistResponse.data.items as any).map(
      (playlist: any) => ({
        name: playlist.name,
      }),
    );
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
