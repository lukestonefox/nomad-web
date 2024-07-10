import React, { useState } from 'react';
import styled from 'styled-components';
import { useStarred } from '../components/StarredContext';
import Sidebar from '../components/Sidebar';
import { Link } from 'react-router-dom';

const Container = styled.div`
  display: flex;
  height: 100vh;
  flex-direction: column;
`;

const Header = styled.div`
  background-color: #007bff;
  color: white;
  padding: 20px;
  text-align: center;
  font-size: 1.5em;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`;

const HomeButton = styled(Link)`
  position: absolute;
  left: 20px;
  color: #007bff;
  background-color: white;
  padding: 10px;
  border-radius: 5px;
  text-decoration: none;
  &:hover {
    background-color: #f0f0f0;
  }
`;

const MainContent = styled.div`
  display: flex;
  flex: 1;
`;

const SchedulerContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 20px;
`;

const DayColumnsWrapper = styled.div`
  display: flex;
  flex: 1;
  margin-right: 20px; /* Space between the columns and sidebar */
  padding-bottom: 20px; /* Space for potential scroll bar */
  overflow-y: auto; /* Enable vertical scrolling if needed */
`;

const DayColumnsContainer = styled.div`
  display: flex;
  flex-wrap: nowrap; /* Keep columns in a single row */
  background-color: #f4f4f4; /* Light color for better definition */
  box-shadow: -2px 0 5px rgba(0, 0, 0, 0.1);
  border-radius: 10px; /* Rounded corners for a softer look */
  max-height: 1135px; /* Set maximum height */
  overflow-y: auto; /* Enable vertical scrolling */
`;

const AddDayButton = styled.button`
  width: 120px;
  height: 40px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5em;
  margin-right: 10px; /* Space between the button and the day columns */
  &:hover {
    background-color: #0056b3;
  }
`;

const DayColumn = styled.div`
  width: 365px;
  min-height: 600px; /* Minimum height of the column */
  height: auto;
  border: 1px solid #ddd;
  margin: 10px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative; /* Needed for positioning the remove button */
  background-color: white;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1); /* Subtle shadow for better definition */
  overflow: auto; /* Allow vertical scrolling inside the column if needed */
`;

const DayTitle = styled.h3`
  text-align: center;
  font-size: 1.5em;
  padding-bottom: 5px;
  font-weight: bold; /* Make text bold */
  text-decoration: underline; /* Underline text */
`;

const RemoveButton = styled.button`
  background-color: #ff4d4f;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  cursor: pointer;
  position: absolute;
  bottom: 10px; /* Center button vertically */
  left: 50%; /* Center horizontally */
  transform: translateX(-50%); /* Center horizontally */
  &:hover {
    background-color: #d9363e;
  }
`;

const ItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  min-width: 260px;
  max-width: 260px;
  margin-bottom: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 10px;
  background-color: #fff;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  position: relative; /* Needed for positioning the remove button */
`;

const ItemImage = styled.img`
  width: 100%;
  height: 150px;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 10px;
`;

const ItemTitle = styled.h3`
  margin: 0;
  font-size: 1.2em;
  color: #333;
`;

const ItemDetails = styled.p`
  margin: 8px 0;
  color: #777;
`;

const RemoveItemButton = styled.button`
  background-color: #ff4d4f;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 10px;
  cursor: pointer;
  position: absolute;
  top: 10px; /* Position at the top right */
  right: 10px; /* Position at the top right */
  &:hover {
    background-color: #d9363e;
  }
`;

const TripScheduler: React.FC = () => {
  const { starredItems } = useStarred();
  const [days, setDays] = useState<string[]>(['Day 1', 'Day 2', 'Day 3']);
  const [dayItems, setDayItems] = useState<{ [key: string]: any[] }>({});

  const addDay = () => {
    setDays(prevDays => [...prevDays, `Day ${prevDays.length + 1}`]);
  };

  const removeDay = (index: number) => {
    const dayToRemove = days[index];
    const newDays = days.filter((_, i) => i !== index);
    const newDayItems: { [key: string]: any[] } = {};

    newDays.forEach((day, i) => {
      newDayItems[`Day ${i + 1}`] = dayItems[`Day ${i + 1}`] || [];
    });

    setDays(newDays);
    setDayItems(newDayItems);
  };

  const moveItemToDay = (item: any, dayIndex: number) => {
    const dayName = `Day ${dayIndex + 1}`;
    setDayItems(prevDayItems => {
      // Check if the item already exists in the target day column
      if (prevDayItems[dayName]?.some(i => i === item)) {
        return prevDayItems; // Do nothing if item already exists
      }
      return {
        ...prevDayItems,
        [dayName]: [...(prevDayItems[dayName] || []), item],
      };
    });
  };

  const removeItemFromDay = (item: any, day: string) => {
    setDayItems(prevDayItems => ({
      ...prevDayItems,
      [day]: prevDayItems[day].filter(i => i !== item),
    }));
  };

  return (
    <Container>
      <Header>
        <HomeButton to="/">Home</HomeButton>
        Trip Planner
      </Header>
      <MainContent>
        <Sidebar isTripSchedulerPage days={days} moveItemToDay={moveItemToDay} />
        <SchedulerContainer>
          <DayColumnsWrapper>
            <DayColumnsContainer>
              {days.map((day, index) => (
                <DayColumn key={index}>
                  <DayTitle>{day}</DayTitle>
                  {/* List of items moved to this day */}
                  {dayItems[day]?.map((item, idx) => (
                    <ItemContainer key={idx}>
                      <ItemImage src={item.imageUrl || 'https://via.placeholder.com/300x150'} alt={item.name} />
                      <ItemTitle>{item.name}</ItemTitle>
                      <ItemDetails>{item.vicinity}</ItemDetails>
                      <ItemDetails>Rating: {item.rating} / 5</ItemDetails>
                      <RemoveItemButton onClick={() => removeItemFromDay(item, day)}>Remove</RemoveItemButton>
                    </ItemContainer>
                  ))}
                  <RemoveButton onClick={() => removeDay(index)}>Remove Day</RemoveButton>
                </DayColumn>
              ))}
              <AddDayButton onClick={addDay}>Add Day</AddDayButton>
            </DayColumnsContainer>
          </DayColumnsWrapper>
        </SchedulerContainer>
      </MainContent>
    </Container>
  );
};

export default TripScheduler;