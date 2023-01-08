import { useState } from 'react';
import { AutoComplete, Input } from 'antd';
import { AxiosResponse } from 'axios';
import { debounce } from 'lodash';

import useAuth from '../hooks/useAuth';
import { search } from '../util/spotifyAPIHelper';
import { SpotifySearchResponse } from '../util/typings';

export default function SearchBar({ className }: { className?: string }) {
  const [searchResults, setSearchResults] = useState<any>([]);
  const getSearchResults = useAuth<SpotifySearchResponse>((config, value) =>
    search(config, value),
  );
  const debouncedGetSearchResults = debounce(
    (value: string) => getSearchResults(value),
    250,
    { leading: false },
  );

  // SyntheticEvent<HTMLInputElement>
  const handleChange = (e: any) => {
    const searchResultsResponse = debouncedGetSearchResults(e.target.value);
    if (searchResultsResponse) {
      searchResultsResponse.then((response: any) => {
        // debugger;
        const results = _transformData(response);
        setSearchResults(results);
      });
    }
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
