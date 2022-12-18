import React, { ReactElement, useState } from 'react';
import {
  authorize,
  logout,
  AuthContext,
  AuthTokens,
} from './services/AuthService';
import authConfig from './configs/authConfig';
import useAuth from './hooks/useAuth';
import './App.css';
import PlaylistContainer from './components/PlaylistContainer';

function App() {
  const [authTokens, setAuthTokens] = useState<AuthTokens | undefined>(
    undefined,
  );

  useAuth(authConfig, setAuthTokens);

  return (
    <AuthContext.Provider value={authTokens}>
      <div className="App">
        <header className="App-header">
          {!authTokens?.accessToken && <SpotifyLoginLink />}
          {authTokens?.accessToken && <PlaylistContainer />}
          {authTokens?.accessToken && <SpotifyLogoutLink />}
        </header>
      </div>
    </AuthContext.Provider>
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

export default App;
