import React from 'react';
import { testTracks } from '../tests/PlaylistContainer.test';

type PlaylistReponse = {
  items: Item[];
};

type Item = {
  track: Track;
};

type Track = {
  name: string;
  uri: string;
};

function PlaylistContainer() {
  const trackRows = (testTracks as PlaylistReponse).items.map(item => (
    <div>
      <a href={item.track.uri}>{item.track.name}</a>
    </div>
  ));
  return <div>{trackRows}</div>;
}

export default PlaylistContainer;
