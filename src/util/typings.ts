// Typings for objects used throughout application

export type TrackT = {
  key: number;
  title: string;
  duration: string;
  dateAdded: string;
  album: string;
  uri: string;
};

export type PlaylistT = {
  name: string;
  id: string;
  [x: string]: unknown;
};

export type SpotifyProfileResponse = {
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

export type SpotifyPlaylistsResponse = {
  href: string;
  items: SpotifyPlaylist[];
};

export type SpotifyPlaylist = {
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

export type SpotifyTrack = {
  name: string;
  album: SpotifyAlbum;
  uri: string;
  duration_ms: number;
};

type SpotifyAlbum = {
  name: string;
};

export type SpotifyUpdateResponse = {
  snapshot_id: string;
};

export type AuthTokens = {
  accessToken: string;
  expiresIn: string;
  refreshToken: string;
};
