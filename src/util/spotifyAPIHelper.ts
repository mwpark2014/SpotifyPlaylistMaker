import axios from 'axios';

const SPOTIFY_API_BASE_URL = 'https://api.spotify.com/v1';

type SpotifyProfile = {
  [x: string]: unknown;
};

type SpotifyPlaylist = {
  [x: string]: any;
};

export type PlaylistReponse = {
  items: SpotifyItem[];
  [x: string]: unknown; // Remove after getting rid of extra fields
};

type SpotifyItem = {
  added_at: string;
  track: SpotifyTrack;
  [x: string]: unknown; // Remove after getting rid of extra fields
};

type SpotifyTrack = {
  key?: string;
  name: string;
  album: SpotifyAlbum;
  uri: string;
  duration_ms: number;
  [x: string]: unknown; // Remove after getting rid of extra fields
};

type SpotifyAlbum = {
  name: string;
  [x: string]: unknown; // Remove after getting rid of extra fields
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
    `${SPOTIFY_API_BASE_URL}/users/${userId}/playlists`,
    {
      headers: { Authorization: `Bearer ${authToken}` },
    },
  );

export const getTracks = async (
  authToken: string | undefined,
  playlistId: string | undefined,
) =>
  axios.get<PlaylistReponse>(
    `${SPOTIFY_API_BASE_URL}/playlists/${playlistId}/tracks?offset=0&limit=20`,
    {
      headers: { Authorization: `Bearer ${authToken}` },
    },
  );
