import React from 'react';
import styled from 'styled-components';
import { useDrag, useDrop } from 'react-dnd';
import { ItemType, DragItem } from '../types';

const DummyItem = styled.div<{ isDragging: boolean }>`
  width: 100px;
  height: 50px;
  background-color: ${props => (props.isDragging ? '#0056b3' : '#007bff')};
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 5px;
  border-radius: 5px;
  cursor: grab;
`;

interface DummyObjectProps {
  id: number;
  index: number;
  columnId: number;
  moveItem: (dragIndex: number, hoverIndex: number, dragColumnId: number, hoverColumnId: number) => void;
}

const DummyObject: React.FC<DummyObjectProps> = ({ id, index, columnId, moveItem }) => {
  const ref = React.useRef<HTMLDivElement>(null);

  const [, drop] = useDrop({
    accept: ItemType.DUMMY_ITEM,
    hover(item: DragItem, monitor) {
      if (!ref.current) return;
      const dragIndex = item.index!;
      const hoverIndex = index;
      const dragColumnId = item.columnId!;
      const hoverColumnId = columnId;

      if (dragIndex === hoverIndex && dragColumnId === hoverColumnId) return;

      const hoverBoundingRect = ref.current.getBoundingClientRect();
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset ? clientOffset.y - hoverBoundingRect.top : 0;

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) return;
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) return;

      moveItem(dragIndex, hoverIndex, dragColumnId, hoverColumnId);
      item.index = hoverIndex;
      item.columnId = hoverColumnId;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: ItemType.DUMMY_ITEM,
    item: { id, index, columnId, type: ItemType.DUMMY_ITEM },
    collect: monitor => ({
      isDragging: monitor.isDragging(),
    }),
  });

  drag(drop(ref));

  return (
    <DummyItem ref={ref} isDragging={isDragging}>
      Item {id}
    </DummyItem>
  );
};

export default DummyObject;