import { useState, ChangeEvent } from 'react';
import { AutoComplete, Input } from 'antd';
import { BaseOptionType } from 'antd/es/select';
import { AxiosResponse } from 'axios';
import { debounce } from 'lodash';

import useAuth from '../hooks/useAuth';
import { search } from '../util/spotifyAPIHelper';
import { SpotifySearchResponse } from '../util/typings';

export default function SearchBar({
  className,
  onSelect,
}: {
  className?: string;
  onSelect: (value: string, option: BaseOptionType) => void;
}) {
  const [searchResults, setSearchResults] = useState<BaseOptionType[]>([]);
  const getSearchResults = useAuth<SpotifySearchResponse>((config, value) =>
    search(config, value),
  );
  const debouncedGetSearchResults = debounce(
    (value: string) =>
      getSearchResults(value).then(
        (response: AxiosResponse<SpotifySearchResponse>) => {
          const results = _transformData(response.data);
          setSearchResults(results);
        },
      ),
    250,
  );

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    // Don't kick off a search if input is empty
    if (!e.target.value) {
      setSearchResults([]);
      return;
    }
    debouncedGetSearchResults(e.target.value);
  };

  return (
    <AutoComplete
      className={className}
      options={searchResults}
      style={{
        width: 400,
      }}
      onSelect={onSelect}>
      <Input.Search
        onChange={handleChange}
        size="middle"
        placeholder="Search for an Playlist, Album, or Song"
      />
    </AutoComplete>
  );
}

function _transformData(
  searchResponse: SpotifySearchResponse,
): BaseOptionType[] {
  return [
    {
      label: 'Tracks',
      options:
        searchResponse.tracks?.items.map((track: any) => ({
          value: track.name,
          key: track.id,
          type: 'track',
          title: track.name,
          duration: track.duration_ms,
          album: track.album.name,
          uri: track.uri,
        })) || [],
    },
    {
      label: 'Albums',
      options:
        searchResponse.albums?.items.map((album: any) => ({
          value: album.name,
          key: album.id,
          type: 'album',
        })) || [],
    },
    {
      label: 'Playlists',
      options:
        searchResponse.playlists?.items.map((playlist: any) => ({
          value: playlist.name,
          key: playlist.id,
          type: 'playlist',
        })) || [],
    },
  ];
}
