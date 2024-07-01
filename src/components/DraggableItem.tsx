import React, { useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import styled from 'styled-components';
import { DragItem, ItemType } from '../types';

const ItemContainer = styled.div<{ isDragging: boolean }>`
  background-color: ${props => (props.isDragging ? '#0056b3' : '#ffffff')};
  border: 1px solid #ddd;
  border-radius: 3px;
  padding: 10px;
  margin: 5px 0;
  cursor: move;
  opacity: ${props => (props.isDragging ? 0.5 : 1)};
`;

interface DraggableItemProps {
  id: number;
  index: number;
  columnId: number;
  moveItem: (dragIndex: number, hoverIndex: number, dragColumnId: number, hoverColumnId: number) => void;
}

const DraggableItem: React.FC<DraggableItemProps> = ({ id, index, columnId, moveItem }) => {
  const ref = useRef<HTMLDivElement>(null);

  const [, drop] = useDrop({
    accept: ItemType.DUMMY_ITEM,
    hover(item: DragItem) {
      if (!ref.current) return;
      
      const dragIndex = item.index !== undefined ? item.index : -1;
      const hoverIndex = index;
      const dragColumnId = item.columnId;
      const hoverColumnId = columnId;

      const dragIndexValue = dragIndex ?? -1;
      const hoverIndexValue = hoverIndex ?? -1;
      if (dragIndex === hoverIndex && dragColumnId === hoverColumnId) return;

      const hoverBoundingRect = ref.current.getBoundingClientRect();
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = item.monitor?.getClientOffset();
      const hoverClientY = clientOffset ? clientOffset.y - hoverBoundingRect.top : 0;

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) return;
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) return;

      moveItem(dragIndex, hoverIndex, dragColumnId, hoverColumnId);
      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: ItemType.DUMMY_ITEM,
    item: { id, index, columnId, type: ItemType.DUMMY_ITEM },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  drag(drop(ref));

  return (
    <ItemContainer ref={ref} isDragging={isDragging}>
      Item {id}
    </ItemContainer>
  );
};

export default DraggableItem;