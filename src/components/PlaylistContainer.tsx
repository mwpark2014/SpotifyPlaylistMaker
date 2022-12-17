import React from 'react';
import Playlist from './Playlist';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { testTracks } from '../tests/PlaylistContainer.test';

function PlaylistContainer() {
  return (
    <DndProvider backend={HTML5Backend}>
      <Playlist tracks={testTracks} />
    </DndProvider>
  );
}

export default PlaylistContainer;
