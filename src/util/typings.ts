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
  [x: string]: unknown;
};
