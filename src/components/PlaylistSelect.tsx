import React from 'react';
import { Select } from 'antd';
import { PlaylistT } from '../util/typings';

function PlaylistSelect({ playlists }: { playlists: PlaylistT[] }) {
  const options = playlists.map(playlist => ({
    value: '',
    label: playlist.name,
  }));
  return (
    <Select
      showSearch
      style={{
        width: 200,
        margin: '16px',
      }}
      placeholder="Edit a playlist"
      optionFilterProp="children"
      filterOption={(input, option) => (option?.label ?? '').includes(input)}
      filterSort={(optionA, optionB) =>
        (optionA?.label ?? '')
          .toLowerCase()
          .localeCompare((optionB?.label ?? '').toLowerCase())
      }
      options={options}
    />
  );
}

export default PlaylistSelect;
