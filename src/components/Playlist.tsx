import React from 'react';
import { Table } from 'antd';
import { ColumnsType } from 'antd/es/table';

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

type Track = {
  key: number;
  title: string;
  duration: string;
  dateAdded: string;
  album: string;
  uri: string;
};

const columns: ColumnsType<Track> = [
  {
    title: 'Title',
    dataIndex: 'title',
  },
  {
    title: 'Album',
    dataIndex: 'album',
  },
  {
    title: 'Date Added',
    dataIndex: 'dateAdded',
  },
  {
    title: 'Duration',
    dataIndex: 'duration',
  },
];

function Playlist({ tracks }: { tracks: PlaylistReponse }) {
  const trackData: Track[] = tracks.items.map((item, index) => ({
    key: index,
    dateAdded: item.added_at,
    title: item.track.name,
    album: item.track.album.name,
    duration: '' + item.track.duration_ms,
    uri: item.track.uri,
  }));

  return <Table columns={columns} dataSource={trackData} />;
}

export default Playlist;
