import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import {
  SpotifyAlbumTracksResponse,
  SpotifyPlaylistsResponse,
  SpotifyPlaylistTracksResponse,
  SpotifyProfileResponse,
  SpotifySearchResponse,
  SpotifyUpdateResponse,
  SpotifyUpdateTracksData,
} from './typings';

const SPOTIFY_API_BASE_URL = 'https://api.spotify.com/v1';

export const SEARCH_ENDPOINT = `${SPOTIFY_API_BASE_URL}/search`;

export const getMyProfile = async (config: AxiosRequestConfig) =>
  axios.get<SpotifyProfileResponse>(`${SPOTIFY_API_BASE_URL}/me`, config);

export const getMyPlaylists = async (config: AxiosRequestConfig) =>
  axios.get<SpotifyPlaylistsResponse>(
    `${SPOTIFY_API_BASE_URL}/me/playlists`,
    config,
  );

export const getPlaylists = async (
  config: AxiosRequestConfig,
  userId: string,
) =>
  axios.get<SpotifyPlaylistsResponse>(
    `${SPOTIFY_API_BASE_URL}/users/${userId}/playlists`,
    config,
  );

export const getTracksFromPlaylist = async (
  config: AxiosRequestConfig,
  playlistId: string,
): Promise<AxiosResponse<SpotifyPlaylistTracksResponse>> => {
  const searchParams = new URLSearchParams({
    offset: '0',
    limit: '20',
    fields: 'items(added_at,track(name,album(name),uri,duration_ms))',
  });
  return axios.get<SpotifyPlaylistTracksResponse>(
    `${SPOTIFY_API_BASE_URL}/playlists/${playlistId}/tracks?${searchParams}`,
    config,
  );
};

export const getTracksFromAlbum = async (
  config: AxiosRequestConfig,
  albumId: string,
): Promise<AxiosResponse<SpotifyAlbumTracksResponse>> => {
  const searchParams = new URLSearchParams({
    offset: '0',
    limit: '20',
  });
  return axios.get<SpotifyAlbumTracksResponse>(
    `${SPOTIFY_API_BASE_URL}/albums/${albumId}/tracks?${searchParams}`,
    config,
  );
};

export const updateTracks = async (
  config: AxiosRequestConfig,
  updateData: SpotifyUpdateTracksData,
  playlistId: string,
) =>
  axios.put<SpotifyUpdateResponse>(
    `${SPOTIFY_API_BASE_URL}/playlists/${playlistId}/tracks`,
    updateData,
    config,
  );

export const search = async (config: AxiosRequestConfig, query: string) => {
  const searchParams = new URLSearchParams(
    Object.assign({
      offset: '0',
      limit: '4',
      q: query,
      type: 'album,playlist,track',
    }),
  );
  return axios.get<SpotifySearchResponse>(
    `${SPOTIFY_API_BASE_URL}/search?${searchParams}`,
    config,
  );
};
