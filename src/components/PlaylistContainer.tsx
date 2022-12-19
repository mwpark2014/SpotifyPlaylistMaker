import React, { useCallback, useContext, memo, useState } from 'react';
import { useQuery } from 'react-query';
import update from 'immutability-helper';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import Playlist from './Playlist';
import PlaylistSelect from './PlaylistSelect';
import { getTracks, SpotifyTracksResponse } from '../util/spotifyAPIHelper';
import { TrackT, PlaylistT } from '../util/typings';
import { AuthContext } from '../services/authService';

function PlaylistContainer({ userPlaylists }: { userPlaylists: PlaylistT[] }) {
  // Keep array of Playlists with the 0th one always pointing at the main
  // playlist being edited
  const [playlistData, setPlaylistData] = useState<TrackT[][]>([]);
  const [playlistId, setPlaylistId] = useState<string>();
  const authTokens = useContext(AuthContext);
  const { data: trackResponse, refetch } = useQuery(
    'tracks',
    () => getTracks(authTokens?.accessToken, playlistId),
    { enabled: false },
  );
  if (trackResponse && playlistData.length === 0) {
    setPlaylistData(
      update(playlistData, {
        0: { $set: getTrackDataFromResponse(trackResponse) },
      }),
    );
  }

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

  const handleSelect = (value: string, option: any) => {
    setPlaylistId(value);
    refetch();
  };

  const playlists = playlistData.map((td, index) => (
    <Playlist tracks={td} onPlaylistChange={changeHandlerFactory(index)} />
  ));

  return (
    <DndProvider backend={HTML5Backend}>
      <PlaylistSelect playlists={userPlaylists} onSelect={handleSelect} />
      {playlists}
    </DndProvider>
  );
}

function getTrackDataFromResponse(response: { data: SpotifyTracksResponse }) {
  return response.data.items.map((item, index) => ({
    key: index,
    dateAdded: item.added_at,
    title: item.track.name,
    album: item.track.album.name,
    duration: '' + item.track.duration_ms,
    uri: item.track.uri,
  }));
}

export default memo(PlaylistContainer);
