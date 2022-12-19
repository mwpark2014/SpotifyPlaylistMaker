import axios from 'axios';

const SPOTIFY_API_BASE_URL = 'https://api.spotify.com/v1';

type SpotifyProfile = {
  [x: string]: unknown;
};

type SpotifyPlaylist = {
  [x: string]: any;
};

export const SEARCH_ENDPOINT = `${SPOTIFY_API_BASE_URL}/search`;

export const getMyProfile = async (authToken: string | undefined) =>
  axios.get<SpotifyProfile>(`${SPOTIFY_API_BASE_URL}/me`, {
    headers: { Authorization: `Bearer ${authToken}` },
  });

export const getPlaylists = async (
  authToken: string | undefined,
  userId: string | undefined,
) =>
  axios.get<SpotifyPlaylist>(
    `${SPOTIFY_API_BASE_URL}/users/hyoriftw/playlists`,
    {
      headers: { Authorization: `Bearer ${authToken}` },
    },
  );
