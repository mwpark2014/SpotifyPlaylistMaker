import React from 'react';
import { authorize } from './services/AuthService';
import authConfig from './configs/AuthConfig';
import logo from './logo.svg';
import './App.css';

function App() {
  return (
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
      </header>
      <SpotifyLoginLink />
    </div>
  );
}

function SpotifyLoginLink() {
  return null;
  <button onClick={() => authorize(authConfig)}>Login to Spotify</button>;
}

export default App;
