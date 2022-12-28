import axios from 'axios';
import { produce } from 'immer';
import { useCallback, useContext, useState } from 'react';
import { useMutation, useQuery } from 'react-query';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import useAuth from '../hooks/useAuth';
import Playlist from './Playlist';
import PlaylistSelect from './PlaylistSelect';
import { getTracks } from '../util/spotifyAPIHelper';
import {
  TrackT,
  PlaylistT,
  SpotifyTracksResponse,
  SpotifyUpdateResponse,
} from '../util/typings';
import { AuthContext } from '../services/authService';

function PlaylistContainer({ userPlaylists }: { userPlaylists: PlaylistT[] }) {
  const [mainTracksData, setMainTracksData] = useState<TrackT[]>([]);
  const [playlistId, setPlaylistId] = useState<string>();
  const authTokens = useContext(AuthContext);

  useQuery(
    ['tracks', playlistId],
    useAuth<SpotifyTracksResponse>(config => getTracks(config, playlistId!)),
    {
      enabled: playlistId != null,
      cacheTime: 5 * 60 * 1000, // 5 minutes
      staleTime: 5 * 60 * 1000, // 5 minutes
      onSuccess: data => {
        setMainTracksData(_getTrackDataFromResponse(data));
      },
    },
  );

  // const updateTracks = useAuth<SpotifyUpdateResponse>(config =>
  // updateTracks(config, playlistId));
  const mutation = useMutation((newOrder: any) => {
    return axios.put<SpotifyUpdateResponse>(
      `https://api.spotify.com/v1/playlists/${playlistId}/tracks`,
      newOrder,
      {
        headers: { Authorization: `Bearer ${authTokens?.accessToken}` },
      },
    );
  });

  // Memoize the change handler
  const handleChange = useCallback(
    (dragIndex: number, hoverIndex: number) => {
      mutation.mutate({
        range_start: dragIndex,
        insert_before: hoverIndex,
        snapshot_id: userPlaylists[0].snapshotId,
      });
      const newTracksData = produce(mainTracksData, draft => {
        const dragRow = mainTracksData[dragIndex];
        draft.splice(dragIndex, 1);
        draft.splice(hoverIndex, 0, dragRow);
      });
      setMainTracksData(newTracksData);
    },
    [mainTracksData, setMainTracksData, mutation, userPlaylists],
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
