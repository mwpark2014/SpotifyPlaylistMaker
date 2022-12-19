import React, { useState } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';

import { AuthContext, AuthTokens } from './services/authService';
import authConfig from './configs/authConfig';
import useAuth from './hooks/useAuth';
import AppContainer from './components/AppContainer';
import './App.css';

const queryClient = new QueryClient();

function App() {
  const [authTokens, setAuthTokens] = useState<AuthTokens | undefined>(
    undefined,
  );
  useAuth(authConfig, setAuthTokens);

  return (
    <AuthContext.Provider value={authTokens}>
      <QueryClientProvider client={queryClient}>
        <AppContainer />
      </QueryClientProvider>
    </AuthContext.Provider>
  );
}

export default App;
