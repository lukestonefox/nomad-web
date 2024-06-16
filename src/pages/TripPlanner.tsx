import React, { useState } from 'react';
import styled from 'styled-components';
import { useStarred } from '../components/StarredContext';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import moment, { Moment } from 'moment';

const TripPlannerContainer = styled.div`
  padding: 20px;
`;

const DateRangeContainer = styled.div`
  margin-bottom: 20px;
`;

const KanbanContainer = styled.div`
  display: flex;
  flex-direction: row;
  overflow-x: auto;
  width: 100%;
  padding: 10px;
  background-color: #f9f9f9;
  border-radius: 8px;
`;

const DayColumn = styled.div`
  background-color: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 8px;
  margin: 10px;
  padding: 10px;
  width: 300px;
  min-height: 500px;
  display: flex;
  flex-direction: column;
`;

const ColumnTitle = styled.h2`
  text-align: center;
`;

const ItemCard = styled.div`
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 10px;
  margin-bottom: 10px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
`;

const ItemImage = styled.img`
  width: 100%;
  height: 100px;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 10px;
`;

const ItemTitle = styled.h3`
  margin: 0;
  font-size: 1em;
  color: #333;
`;

const ItemDetails = styled.p`
  margin: 8px 0;
  color: #777;
`;

const SidebarContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 300px;
  margin-left: 20px;
`;

const SidebarItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin-bottom: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 10px;
  background-color: #fff;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
`;

const SidebarItemImage = styled.img`
  width: 100%;
  height: 150px;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 10px;
`;

const SidebarItemTitle = styled.h3`
  margin: 0;
  font-size: 1.2em;
  color: #333;
`;

const SidebarItemDetails = styled.p`
  margin: 8px 0;
  color: #777;
`;

const TripPlanner: React.FC = () => {
  const { starredItems } = useStarred();
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  const calculateDays = () => {
    if (startDate && endDate) {
      const days = [];
      let currentDay = moment(startDate);
      while (currentDay.isSameOrBefore(endDate)) {
        days.push(currentDay.format('MMMM Do YYYY'));
        currentDay = currentDay.add(1, 'days');
      }
      return days;
    }
    return [];
  };

  const days = calculateDays();

  const onDragEnd = (result: any) => {
    // Handle the drag and drop logic here
  };

  return (
    <TripPlannerContainer>
      <h1>Trip Planner</h1>
      <DateRangeContainer>
        <DatePicker
          selected={startDate}
          onChange={(date: Date | null) => setStartDate(date)}
          selectsStart
          startDate={startDate}
          endDate={endDate}
          minDate={new Date()}
          placeholderText="Start Date"
          className="datepicker"
        />
        <DatePicker
          selected={endDate}
          onChange={(date: Date | null) => setEndDate(date)}
          selectsEnd
          startDate={startDate}
          endDate={endDate}
          minDate={startDate}
          placeholderText="End Date"
          className="datepicker"
        />
      </DateRangeContainer>
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <DragDropContext onDragEnd={onDragEnd}>
          <KanbanContainer>
            {days.map((day, index) => (
              <Droppable key={index} droppableId={day}>
                {(provided) => (
                  <DayColumn ref={provided.innerRef} {...provided.droppableProps}>
                    <ColumnTitle>{day}</ColumnTitle>
                    {starredItems.map((item, idx) => (
                      <Draggable key={item.name} draggableId={item.name} index={idx}>
                        {(provided) => (
                          <ItemCard
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            <ItemImage src={item.imageUrl || 'https://via.placeholder.com/300x150'} alt={item.name} />
                            <ItemTitle>{item.name}</ItemTitle>
                            <ItemDetails>{item.vicinity}</ItemDetails>
                            <ItemDetails>Rating: {item.rating} / 5</ItemDetails>
                          </ItemCard>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </DayColumn>
                )}
              </Droppable>
            ))}
          </KanbanContainer>
        </DragDropContext>
        <SidebarContainer>
          <h2>Starred Items</h2>
          {starredItems.map((item, index) => (
            <SidebarItem key={index}>
              <SidebarItemImage src={item.imageUrl || 'https://via.placeholder.com/300x150'} alt={item.name} />
              <SidebarItemTitle>{item.name}</SidebarItemTitle>
              <SidebarItemDetails>{item.vicinity}</SidebarItemDetails>
              <SidebarItemDetails>Rating: {item.rating} / 5</SidebarItemDetails>
            </SidebarItem>
          ))}
        </SidebarContainer>
      </div>
    </TripPlannerContainer>
  );
};

export default TripPlanner;