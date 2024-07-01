import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Column from '../components/Column';
import BucketColumn from '../components/BucketColumn';
import { DragItem } from '../types';

const TripPlannerContainer = styled.div`
  display: flex;
  height: 100vh;
`;

const LeftSidebar = styled.div`
  width: 20%;
  background-color: #f8f9fa;
  padding: 20px;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
`;

const MainContent = styled.div`
  width: 80%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;

const TripPlannerTitle = styled.h1`
  font-size: 2em;
  margin-top: 20px;
`;

const PlannerBoard = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-grow: 1;
  width: 100%;
  margin: 20px 0;
`;

const AddColumnButton = styled.button`
  margin-top: 10px;
  padding: 5px 10px;
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: #218838;
  }
`;

const BackButton = styled(Link)`
  display: inline-block;
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  text-align: center;
  border-radius: 5px;
  text-decoration: none;
  margin-bottom: 20px;
  &:hover {
    background-color: #0056b3;
  }
`;

const LOCAL_STORAGE_KEY = 'tripPlannerState';

const dummyItems: DragItem[] = [
  { id: 201, content: 'Dummy Item 1', fromBucket: true },
  { id: 202, content: 'Dummy Item 2', fromBucket: true },
  { id: 203, content: 'Dummy Item 3', fromBucket: true },
];

const TripPlanner: React.FC = () => {
  const [columns, setColumns] = useState<{ id: number, items: { id: number }[], title: string }[]>(() => {
    const savedColumns = localStorage.getItem(LOCAL_STORAGE_KEY);
    return savedColumns ? JSON.parse(savedColumns) : [{ id: 1, items: [], title: "Day 1" }]; // No initial items
  });

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(columns));
  }, [columns]);

  const addColumn = useCallback(() => {
    setColumns(columns => [
      ...columns, 
      { id: columns.length + 1, items: [], title: `Day ${columns.length + 1}` }
    ]);
  }, [columns.length]);

  const removeColumn = useCallback((id: number) => {
    setColumns(columns => columns.filter(column => column.id !== id));
  }, []);

  const moveItem = useCallback((dragIndex: number, hoverIndex: number, dragColumnId: number, hoverColumnId: number) => {
    setColumns(columns => {
      const newColumns = [...columns];
      const dragColumn = newColumns.find(column => column.id === dragColumnId);
      const hoverColumn = newColumns.find(column => column.id === hoverColumnId);
      if (dragColumn && hoverColumn) {
        const dragItem = dragColumn.items[dragIndex];
        dragColumn.items.splice(dragIndex, 1);
        hoverColumn.items.splice(hoverIndex, 0, dragItem);
      }
      return newColumns;
    });
  }, []);

  const addItemToColumn = useCallback((columnId: number, item: DragItem) => {
    setColumns(columns => {
      const newColumns = [...columns];
      const targetColumn = newColumns.find(column => column.id === columnId);
      if (targetColumn) {
        targetColumn.items.push(item);  // Add the item with all properties
      }
      return newColumns;
    });
  }, []);

  return (
    <TripPlannerContainer>
      <LeftSidebar>
        <BucketColumn items={dummyItems} addItemToColumn={addItemToColumn} />
      </LeftSidebar>
      <MainContent>
        <TripPlannerTitle>Trip Planner</TripPlannerTitle>
        <PlannerBoard>
          {columns.map(column => (
            <Column 
              key={column.id} 
              id={column.id} 
              items={column.items} 
              onRemove={() => removeColumn(column.id)} 
              moveItem={moveItem}
              addItemToColumn={addItemToColumn}
              title={column.title}
            />
          ))}
          <AddColumnButton onClick={addColumn}>Add Column</AddColumnButton>
        </PlannerBoard>
        <BackButton to="/">Back to Main Page</BackButton>
      </MainContent>
    </TripPlannerContainer>
  );
};

export default TripPlanner;