import React, { ReactElement, useContext, useState } from 'react';
import {
  authorize,
  logout,
  AuthContext,
  AuthTokens,
} from './services/AuthService';
import authConfig from './configs/AuthConfig';
import useAuth from './hooks/useAuth';
import logo from './logo.svg';
import './App.css';

function App() {
  const [authTokens, setAuthTokens] = useState<AuthTokens | undefined>(
    undefined,
  );

  useAuth(authConfig, setAuthTokens);

  return (
    <AuthContext.Provider value={authTokens}>
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer">
            Learn React
          </a>
          <SpotifyLoginLink />
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
  const tokens = useContext(AuthContext);
  console.log(tokens);
  return <button onClick={() => logout(authConfig)}>Log out of Spotify</button>;
}

export default App;
