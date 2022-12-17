import React, { useCallback, useState } from 'react';
// import update from 'immutability-helper';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import Playlist, { Track } from './Playlist';
import { testTracks } from '../tests/PlaylistContainer.test';

type PlaylistReponse = {
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

const trackData: Track[] = (testTracks as PlaylistReponse).items.map(
  (item, index) => ({
    key: index,
    dateAdded: item.added_at,
    title: item.track.name,
    album: item.track.album.name,
    duration: '' + item.track.duration_ms,
    uri: item.track.uri,
  }),
);

function PlaylistContainer() {
  // Keep array of Playlists with the 0th one always pointing at the main
  // playlist being edited
  const [playlistData, setPlaylistData] = useState<Track[][]>([trackData]);
  const changeHandlerFactory = useCallback(() => {
    return () => {
      return () => {
        setPlaylistData(playlistData);
      };
    };
  }, [setPlaylistData]);

  playlistData.map((td, index) => (
    <Playlist tracks={td} onChange={changeHandlerFactory()} />
  ));

  return <DndProvider backend={HTML5Backend}></DndProvider>;
}

export default PlaylistContainer;
