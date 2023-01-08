import { useState, ChangeEvent } from 'react';
import { AutoComplete, Input } from 'antd';
import { AxiosResponse } from 'axios';
import { debounce } from 'lodash';

import useAuth from '../hooks/useAuth';
import { search } from '../util/spotifyAPIHelper';
import { SpotifySearchResponse } from '../util/typings';
import { BaseOptionType } from 'antd/es/select';

export default function SearchBar({ className }: { className?: string }) {
  const [searchResults, setSearchResults] = useState<any>([]);
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
      }}>
      <Input.Search
        onChange={handleChange}
        size="middle"
        placeholder="Search for an Playlist, Album, or Song"
      />
    </AutoComplete>
  );
}

function _transformData(searchResponse: SpotifySearchResponse): any {
  return [
    {
      label: 'Tracks',
      options:
        searchResponse.tracks?.items.map((track: any) => ({
          label: track.name,
          value: track.id,
        })) || [],
    },
    {
      label: 'Albums',
      options:
        searchResponse.albums?.items.map((album: any) => ({
          label: album.name,
          value: album.id,
        })) || [],
    },
    {
      label: 'Playlists',
      options:
        searchResponse.playlists?.items.map((playlist: any) => ({
          label: playlist.name,
          value: playlist.id,
        })) || [],
    },
  ];
}
