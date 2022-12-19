import React, { useCallback, useState } from 'react';
import update from 'immutability-helper';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import Playlist from './Playlist';
import PlaylistSelect from './PlaylistSelect';
import { TrackT, PlaylistT } from '../util/typings';
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

const trackData: TrackT[] = (testTracks as PlaylistReponse).items.map(
  (item, index) => ({
    key: index,
    dateAdded: item.added_at,
    title: item.track.name,
    album: item.track.album.name,
    duration: '' + item.track.duration_ms,
    uri: item.track.uri,
  }),
);

function PlaylistContainer({ userPlaylists }: { userPlaylists: PlaylistT[] }) {
  // Keep array of Playlists with the 0th one always pointing at the main
  // playlist being edited
  const [playlistData, setPlaylistData] = useState<TrackT[][]>([trackData]);
  // Memoize each change handler
  const changeHandlerFactory = useCallback(
    // Create a new change handler for each playlist index
    (playlistIndex: number) => {
      return (dragIndex: number, hoverIndex: number) => {
        const dragRow = playlistData[playlistIndex][dragIndex];
        setPlaylistData(
          update(playlistData, {
            [playlistIndex]: {
              $splice: [
                [dragIndex, 1],
                [hoverIndex, 0, dragRow],
              ],
            },
          }),
        );
      };
    },
    [playlistData, setPlaylistData],
  );

  const playlists = playlistData.map((td, index) => (
    <Playlist tracks={td} onPlaylistChange={changeHandlerFactory(index)} />
  ));

  return (
    <DndProvider backend={HTML5Backend}>
      <PlaylistSelect playlists={userPlaylists} />
      {playlists}
    </DndProvider>
  );
}

export default PlaylistContainer;
