import { useEffect, useState } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';

import { AuthContext, fetchToken } from './services/authService';
import authConfig from './configs/authConfig';
import AppContainer from './components/AppContainer';
import { AuthTokens } from './util/typings';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      cacheTime: Infinity,
      staleTime: Infinity,
      refetchIntervalInBackground: false,
    },
  },
});

function App() {
  const [authTokens, setAuthTokens] = useState<AuthTokens | undefined>(
    undefined,
  );

  // Detect redirect within Auth flow
  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const code = searchParams.get('code');
    const state = searchParams.get('state');

    if (code && state) {
      fetchToken(authConfig, code, state, setAuthTokens);
    }
  }, [setAuthTokens]);

  return (
    <AuthContext.Provider value={authTokens}>
      <QueryClientProvider client={queryClient}>
        <AppContainer />
      </QueryClientProvider>
    </AuthContext.Provider>
  );
}

export default App;
