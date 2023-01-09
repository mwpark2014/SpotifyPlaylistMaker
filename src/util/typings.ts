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
  snapshotId: string;
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

export type SpotifyPlaylistTracksResponse = {
  items: {
    added_at: string;
    track: SpotifyPlaylistTrack;
  }[];
};

export type SpotifyPlaylistTrack = {
  artists: SpotifyArtist[];
  name: string;
  album: SpotifyAlbum;
  uri: string;
  duration_ms: number;
};

export type SpotifyAlbumTracksResponse = {
  items: SpotifyAlbumTrack[];
};

type SpotifyAlbumTrack = {
  artists: SpotifyArtist[];
  disc_number: number;
  duration_ms: number;
  explicit: boolean;
  external_urls: {
    spotify: string;
  };
  href: string;
  id: string;
  is_local: boolean;
  name: string;
  preview_url: string;
  track_number: number;
  type: string;
  uri: string;
};

type SpotifyAlbum = {
  name: string;
};

type SpotifyArtist = {
  id: string;
  name: string;
};

export type SpotifyUpdateTracksData = {
  uris?: string;
  range_start: number;
  insert_before: number;
  range_length?: number;
  snapshot_id: string;
};

export type SpotifyUpdateResponse = {
  snapshot_id: string;
};

export type SpotifySearchResponse = {
  tracks?: SpotifySearchResult;
  artists?: SpotifySearchResult;
  albums?: SpotifySearchResult;
  playlists?: SpotifySearchResult;
};

type SpotifySearchResult = {
  href: string;
  items: any[];
  limit: number;
  next: string;
  offset: number;
  previous: string;
  total: number;
};

export type AuthTokens = {
  accessToken: string;
  expiresIn: string;
  refreshToken: string;
};
