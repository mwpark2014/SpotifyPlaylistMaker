import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import {
  SpotifyPlaylistsResponse,
  SpotifyProfileResponse,
  SpotifyTracksResponse,
} from './typings';

const SPOTIFY_API_BASE_URL = 'https://api.spotify.com/v1';

export const SEARCH_ENDPOINT = `${SPOTIFY_API_BASE_URL}/search`;

export const getMyProfile = async (authToken: string | undefined) =>
  axios.get<SpotifyProfileResponse>(`${SPOTIFY_API_BASE_URL}/me`, {
    headers: { Authorization: `Bearer ${authToken}` },
  });

export const getMyPlaylists = async (authToken: string | undefined) =>
  axios.get<SpotifyPlaylistsResponse>(`${SPOTIFY_API_BASE_URL}/me/playlists`, {
    headers: { Authorization: `Bearer ${authToken}` },
  });

export const getPlaylists = async (
  authToken: string | undefined,
  userId: string | undefined,
) =>
  axios.get<SpotifyPlaylistsResponse>(
    `${SPOTIFY_API_BASE_URL}/users/${userId}/playlists`,
    {
      headers: { Authorization: `Bearer ${authToken}` },
    },
  );

export const getTracks = async (
  config: AxiosRequestConfig,
  playlistId: string,
): Promise<AxiosResponse<SpotifyTracksResponse>> => {
  const searchParams = new URLSearchParams({
    offset: '0',
    limit: '20',
    fields: 'items(added_at,track(name,album(name),uri,duration_ms))',
  });
  return axios.get<SpotifyTracksResponse>(
    `${SPOTIFY_API_BASE_URL}/playlists/${playlistId}/tracks?${searchParams}`,
    config,
  );
};
