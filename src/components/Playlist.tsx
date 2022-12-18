import React, { useCallback, useRef } from 'react';
import { Table } from 'antd';
import { ColumnsType } from 'antd/es/table';
import {
  useDrag,
  useDrop,
  DragSourceMonitor,
  DropTargetMonitor,
} from 'react-dnd';

import { DRAGGABLE_TRACK_TYPE } from '../util/constants';

export type Track = {
  key: number;
  title: string;
  duration: string;
  dateAdded: string;
  album: string;
  uri: string;
};

const columns: ColumnsType<Track> = [
  {
    title: 'Title',
    dataIndex: 'title',
  },
  {
    title: 'Album',
    dataIndex: 'album',
  },
  {
    title: 'Date Added',
    dataIndex: 'dateAdded',
  },
  {
    title: 'Duration',
    dataIndex: 'duration',
  },
];

const components = {
  body: {
    row: DraggableBodyRow,
  },
};

function Playlist({
  tracks,
  onChange,
}: {
  tracks: Track[];
  onChange: Function;
}) {
  return (
    <Table
      columns={columns}
      dataSource={tracks}
      components={components}
      onRow={(_, index) => {
        return {
          index,
          onChange,
        } as any;
      }}
    />
  );
}

function DraggableBodyRow({
  index,
  onChange,
  className,
  style,
  ...restProps
}: any) {
  const ref = useRef<HTMLTableRowElement>(null);
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
      onChange(item.index, index);
    },
  });
  const [, drag] = useDrag({
    type: DRAGGABLE_TRACK_TYPE,
    item: { index },
    collect: (monitor: DragSourceMonitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });
  drop(drag(ref));

  return (
    <tr
      ref={ref}
      className={`${className}${isOver ? dropClassName : ''}`}
      style={{ cursor: 'move', ...style }}
      {...restProps}
    />
  );
}

export default Playlist;
