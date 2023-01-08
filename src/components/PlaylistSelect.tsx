import { Select } from 'antd';
import { PlaylistT } from '../util/typings';

function PlaylistSelect({
  playlists,
  onSelect,
  className,
}: {
  playlists: PlaylistT[];
  onSelect: (value: string, option: any) => void;
  className?: string;
}) {
  const options = playlists.map(playlist => ({
    value: playlist.id,
    label: playlist.name,
  }));
  return (
    <Select
      className={className}
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
      onSelect={onSelect}
    />
  );
}

export default PlaylistSelect;
