import React from 'react';
import { useDrop } from 'react-dnd';
import styled from 'styled-components';
import DraggableItem from './DraggableItem';  // Ensure the path is correct
import { DragItem, ItemType } from '../types';

const ColumnContainer = styled.div`
  background-color: #f4f4f4;
  border-radius: 5px;
  padding: 10px;
  margin: 0 10px;
  width: 300px;
  min-height: 300px;
  display: flex;
  flex-direction: column;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
`;

const ColumnTitle = styled.h2`
  margin: 0;
  font-size: 1.5em;
  text-align: center;
  background-color: #007bff;
  color: white;
  padding: 10px;
  border-radius: 5px;
`;

const RemoveButton = styled.button`
  margin-top: 10px;
  padding: 5px 10px;
  background-color: #dc3545;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: #c82333;
  }
`;

const Column: React.FC<{
    id: number;
    items: { id: number }[];
    onRemove: () => void;
    moveItem: (dragIndex: number, hoverIndex: number, dragColumnId: number, hoverColumnId: number) => void;
    addItemToColumn: (columnId: number, item: DragItem) => void;
    title: string;
  }> = ({ id, items, onRemove, moveItem, addItemToColumn, title }) => {

    const [, drop] = useDrop({
      accept: ItemType.DUMMY_ITEM,
      drop: (item: DragItem) => {
        if (item.fromBucket) {
          addItemToColumn(id, item);
        }
      },
    });

    return (
      <ColumnContainer ref={drop}>
        <ColumnTitle>{title}</ColumnTitle>
        {items.map((item, index) => (
          <DraggableItem 
            key={item.id} 
            index={index} 
            id={item.id} 
            columnId={id} 
            moveItem={moveItem} 
          />
        ))}
        <RemoveButton onClick={onRemove}>Remove Column</RemoveButton>
      </ColumnContainer>
    );
  };

export default Column;