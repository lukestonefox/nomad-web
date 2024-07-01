import React from 'react';
import styled from 'styled-components';
import { useDrag } from 'react-dnd';
import { DragItem, ItemType } from '../types';

const BucketColumnContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const BucketTitle = styled.h2`
  font-size: 1.5em;
  margin-bottom: 10px;
`;

const DummyItem = styled.div`
  padding: 10px;
  margin: 10px 0;
  background-color: #ffc107;
  border-radius: 5px;
  cursor: grab;
  &:active {
    cursor: grabbing;
  }
`;

const BucketColumn: React.FC<{ items: DragItem[], addItemToColumn: (columnId: number, item: DragItem) => void }> = ({ items, addItemToColumn }) => {
  return (
    <BucketColumnContainer>
      <BucketTitle>Bucket</BucketTitle>
      {items.map((item) => (
        <BucketDummyItem key={item.id} item={item} addItemToColumn={addItemToColumn} />
      ))}
    </BucketColumnContainer>
  );
};

const BucketDummyItem: React.FC<{ item: DragItem, addItemToColumn: (columnId: number, item: DragItem) => void }> = ({ item, addItemToColumn }) => {
  const [, drag] = useDrag({
    type: ItemType.DUMMY_ITEM,
    item: { ...item, fromBucket: true },
  });

  return (
    <DummyItem ref={drag}>
      {item.content}
    </DummyItem>
  );
};

export default BucketColumn;