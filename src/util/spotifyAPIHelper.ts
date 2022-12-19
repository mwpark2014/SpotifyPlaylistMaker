import axios from 'axios';

type SpotifyProfileResponse = {
  country: string;
  display_name: string;
  explicit_content: {
    filter_enabled: boolean;
    filter_locked: boolean;
  };
  external_urls: {
    spotify: string;
  };
  followers: {
    href: string;
    total: number;
  };
  href: string;
  id: string;
  images: [
    {
      height: number;
      url: string;
      width: number;
    },
  ];
  product: string;
  type: string;
  uri: string;
};

type SpotifyPlaylistsResponse = {
  href: string;
  items: SpotifyPlaylist[];
};

type SpotifyPlaylist = {
  collaborative: boolean;
  description: string;
  external_urls: {
    spotify: string;
  };
  href: string;
  id: string;
  images: [
    {
      height: number;
      url: string;
      width: number;
    },
  ];
  name: string;
  owner: {
    [key: string]: any;
  };
  primary_color: string;
  public: boolean;
  snapshot_id: string;
  tracks: {
    href: string;
    total: number;
  };
  type: string;
  uri: string;
};

export type SpotifyTracksResponse = {
  items: {
    added_at: string;
    track: SpotifyTrack;
  }[];
};

type SpotifyTrack = {
  name: string;
  album: SpotifyAlbum;
  uri: string;
  duration_ms: number;
};

type SpotifyAlbum = {
  name: string;
};

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
  authToken: string | undefined,
  playlistId: string | undefined,
) => {
  const searchParams = new URLSearchParams({
    offset: '0',
    limit: '20',
    fields: 'items(added_at,track(name,album(name),uri,duration_ms))',
  });
  return axios.get<SpotifyTracksResponse>(
    `${SPOTIFY_API_BASE_URL}/playlists/${playlistId}/tracks?${searchParams}`,
    {
      headers: { Authorization: `Bearer ${authToken}` },
    },
  );
};
