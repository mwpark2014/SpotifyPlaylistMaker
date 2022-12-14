import React from 'react';
import { testTracks } from '../tests/PlaylistContainer.test';

type Item = {
  track: Track;
};

type Track = {
  name: string;
};

function PlaylistContainer() {
  const trackRows = testTracks.items.map(item => <div>{item.track.name}</div>);
  return <div>{trackRows}</div>;
}

export default PlaylistContainer;
