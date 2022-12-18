// Typings for objects used throughout application

export type Track = {
  key: number;
  title: string;
  duration: string;
  dateAdded: string;
  album: string;
  uri: string;
};

export type Playlist = Track[];
