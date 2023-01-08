import { memo, useRef } from 'react';
import { Table } from 'antd';
import { ColumnsType } from 'antd/es/table';
import {
  useDrag,
  useDrop,
  DragSourceMonitor,
  DropTargetMonitor,
} from 'react-dnd';

import { DRAGGABLE_TRACK_TYPE } from '../util/constants';
import { TrackT } from '../util/typings';
import './Playlist.css';

const COL_CLS = 'p-2';

const columns: ColumnsType<TrackT> = [
  {
    title: 'Title',
    dataIndex: 'title',
    className: COL_CLS,
  },
  {
    title: 'Album',
    dataIndex: 'album',
    className: COL_CLS,
  },
  {
    title: 'Date Added',
    dataIndex: 'dateAdded',
    className: COL_CLS,
  },
  {
    title: 'Duration',
    dataIndex: 'duration',
    className: COL_CLS,
  },
];

const components = {
  body: {
    row: DraggableTrack,
  },
};

function Playlist({
  tracks,
  onPlaylistChange,
}: {
  tracks: TrackT[];
  onPlaylistChange: Function;
}) {
  return (
    <Table
      className="mx-3 overflow-auto"
      columns={columns}
      dataSource={tracks}
      components={components}
      onRow={(_, index) => {
        return {
          index,
          onPlaylistChange,
        } as any;
      }}
      pagination={false}
    />
  );
}

function DraggableTrack({
  index,
  onPlaylistChange,
  className,
  style,
  ...restProps
}: any) {
  const ref = useRef<HTMLTableRowElement>(null);
  const [, drag] = useDrag({
    type: DRAGGABLE_TRACK_TYPE,
    item: { index },
    collect: (monitor: DragSourceMonitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });
  const [{ isOver, dropClassName }, drop] = useDrop({
    accept: DRAGGABLE_TRACK_TYPE,
    collect: (monitor: DropTargetMonitor) => {
      const { index: dragIndex } = monitor.getItem() || ({} as any);
      if (dragIndex === index) {
        return {};
      }
      return {
        isOver: monitor.isOver(),
        dropClassName:
          dragIndex < index ? ' drop-over-downward' : ' drop-over-upward',
      };
    },
    drop: (item: { index: number }) => {
      onPlaylistChange(item.index, index);
    },
  });
  drop(drag(ref));

  return (
    <tr
      ref={ref}
      className={`p-2 cursor-move ${className}${isOver ? dropClassName : ''}`}
      {...restProps}
    />
  );
}

export default memo(Playlist);
