import { produce } from 'immer';
import { useCallback, useState } from 'react';
import { useQuery } from 'react-query';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import useAuth from '../hooks/useAuth';
import Playlist from './Playlist';
import PlaylistSelect from './PlaylistSelect';
import { getTracks } from '../util/spotifyAPIHelper';
import { TrackT, PlaylistT, SpotifyTracksResponse } from '../util/typings';

function PlaylistContainer({ userPlaylists }: { userPlaylists: PlaylistT[] }) {
  const [mainTracksData, setMainTracksData] = useState<TrackT[]>([]);
  const [playlistId, setPlaylistId] = useState<string>();

  useQuery(
    ['tracks', playlistId],
    useAuth<SpotifyTracksResponse>(config => getTracks(config, playlistId!)),
    {
      enabled: playlistId != null,
      onSuccess: data => {
        setMainTracksData(_getTrackDataFromResponse(data));
      },
    },
  );

  // Memoize the change handler
  const handleChange = useCallback(
    (dragIndex: number, hoverIndex: number) => {
      const newTracksData = produce(mainTracksData, draft => {
        const dragRow = mainTracksData[dragIndex];
        draft.splice(dragIndex, 1);
        draft.splice(hoverIndex, 0, dragRow);
      });
      setMainTracksData(newTracksData);
    },
    [mainTracksData, setMainTracksData],
  );

  const handleSelect = (value: string) => {
    setPlaylistId(value);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <PlaylistSelect playlists={userPlaylists} onSelect={handleSelect} />
      <Playlist tracks={mainTracksData} onPlaylistChange={handleChange} />
    </DndProvider>
  );
}

function _getTrackDataFromResponse(response: { data: SpotifyTracksResponse }) {
  return response.data.items.map((item, index) => ({
    key: index,
    dateAdded: item.added_at,
    title: item.track.name,
    album: item.track.album.name,
    duration: '' + item.track.duration_ms,
    uri: item.track.uri,
  }));
}

export default PlaylistContainer;
