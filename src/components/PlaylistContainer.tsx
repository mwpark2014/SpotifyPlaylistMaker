import { BaseOptionType } from 'antd/es/select';
import { produce } from 'immer';
import { useCallback, useState } from 'react';
import { useMutation, useQuery } from 'react-query';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import useAuth from '../hooks/useAuth';
import Playlist from './Playlist';
import PlaylistSelect from './PlaylistSelect';
import SearchBar from './SearchBar';
import {
  getTracksFromAlbum,
  getTracksFromPlaylist,
  updateTracks,
} from '../util/spotifyAPIHelper';
import {
  TrackT,
  PlaylistT,
  SpotifyAlbumTracksResponse,
  SpotifyPlaylistTracksResponse,
  SpotifyUpdateResponse,
  SpotifyUpdateTracksData,
} from '../util/typings';

type StagingSelection = {
  id: string;
  type: string;
  name: string;
};

function PlaylistContainer({ userPlaylists }: { userPlaylists: PlaylistT[] }) {
  const [mainTracksData, setMainTracksData] = useState<TrackT[]>([]);
  const [stagingTracksData, setStagingTracksData] = useState<TrackT[]>([]);
  const [playlistId, setPlaylistId] = useState<string>();
  const [stageSelection, setStageSelection] = useState<StagingSelection>();

  useQuery(
    ['playlistTracks', playlistId],
    useAuth<SpotifyPlaylistTracksResponse>(config =>
      getTracksFromPlaylist(config, playlistId!),
    ),
    {
      enabled: playlistId != null,
      cacheTime: 5 * 60 * 1000, // 5 minutes
      staleTime: 5 * 60 * 1000, // 5 minutes
      onSuccess: data => {
        setMainTracksData(_getTrackDataFromPlaylistResponse(data));
      },
    },
  );

  useQuery(
    ['playlistTracks', stageSelection && stageSelection.id],
    useAuth<SpotifyPlaylistTracksResponse>(config =>
      getTracksFromPlaylist(config, stageSelection!.id),
    ),
    {
      enabled: !!stageSelection && stageSelection.type === 'playlist',
      onSuccess: data => {
        setStagingTracksData(_getTrackDataFromPlaylistResponse(data));
      },
    },
  );

  useQuery(
    ['albumTracks', stageSelection && stageSelection.id],
    useAuth<SpotifyAlbumTracksResponse>(config =>
      getTracksFromAlbum(config, stageSelection!.id),
    ),
    {
      enabled: !!stageSelection && stageSelection.type === 'album',
      onSuccess: data => {
        setStagingTracksData(
          _getTrackDataFromAlbumResponse(data, stageSelection!.name),
        );
      },
    },
  );

  const mutation = useMutation(
    useAuth<SpotifyUpdateResponse>(
      (config, updateData: SpotifyUpdateTracksData) =>
        updateTracks(config, updateData, playlistId!),
    ),
  );

  // Memoize the change handler
  const handleChange = useCallback(
    (dragIndex: number, hoverIndex: number) => {
      mutation.mutate({
        range_start: dragIndex,
        insert_before: hoverIndex,
        snapshot_id: userPlaylists[0].snapshotId, // TODO: Find snapshot for each playlist
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

  const handleMainSelect = (value: string) => {
    setPlaylistId(value);
  };

  const handleStagingSelect = (value: string, option: BaseOptionType) => {
    if (option.type === 'album' || option.type === 'playlist') {
      setStageSelection({
        id: option.key,
        type: option.type,
        name: option.value,
      });
    }
    if (option.type === 'track') {
      setStagingTracksData([option as TrackT]);
    }
  };

  const stagingPlaylist = (
    <div className="flex flex-col basis-1/2">
      <div className="h-20">
        <SearchBar className="p-4" onSelect={handleStagingSelect} />
      </div>
      <Playlist tracks={stagingTracksData} onPlaylistChange={handleChange} />
    </div>
  );

  const mainPlaylist = (
    <div className="flex flex-col basis-1/2">
      <div className="h-20">
        <PlaylistSelect playlists={userPlaylists} onSelect={handleMainSelect} />
      </div>
      <Playlist tracks={mainTracksData} onPlaylistChange={handleChange} />
    </div>
  );

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="flex flex-row w-full">
        {stagingPlaylist}
        {mainPlaylist}
      </div>
    </DndProvider>
  );
}

function _getTrackDataFromPlaylistResponse(response: {
  data: SpotifyPlaylistTracksResponse;
}) {
  return response.data.items.map((item, index) => ({
    key: index,
    dateAdded: item.added_at,
    title: item.track.name,
    album: item.track.album.name,
    duration: '' + item.track.duration_ms,
    uri: item.track.uri,
  }));
}

function _getTrackDataFromAlbumResponse(
  response: {
    data: SpotifyAlbumTracksResponse;
  },
  albumName: string,
) {
  return response.data.items.map((item, index) => ({
    key: index,
    dateAdded: '',
    title: item.name,
    album: albumName,
    duration: '' + item.duration_ms,
    uri: item.uri,
  }));
}

export default PlaylistContainer;
