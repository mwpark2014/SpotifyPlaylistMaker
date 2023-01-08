import { useState } from 'react';
import { AutoComplete, Input } from 'antd';
import { AxiosResponse } from 'axios';

import useAuth from '../hooks/useAuth';
import { search } from '../util/spotifyAPIHelper';
import { SpotifySearchResponse } from '../util/typings';

export default function SearchBar({ className }: { className?: string }) {
  const [searchResults, setSearchResults] = useState<any>([]);
  const getSearchResults = useAuth<SpotifySearchResponse>((config, value) =>
    search(config, value),
  );
  // SyntheticEvent<HTMLInputElement>
  const handleChange = (e: any) => {
    getSearchResults(e.target.value).then(response => {
      debugger;
      const results = _transformData(response);
      setSearchResults(results);
    });
  };

  return (
    <AutoComplete className={className} options={searchResults}>
      <Input.Search
        onChange={handleChange}
        size="large"
        placeholder="Search for an Playlist, Album, or Song"
      />
    </AutoComplete>
  );
}

function _transformData(
  searchResponse: AxiosResponse<SpotifySearchResponse>,
): any {
  return searchResponse.data.tracks?.items.map((track: any) => ({
    label: track.name,
    value: track.name,
  }));
}
