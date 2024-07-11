import React, { useState } from 'react';
import styled from 'styled-components';
import { useStarred } from '../components/StarredContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const SidebarContainer = styled.div<{ visible: boolean; navigationBarHeight: number }>`
  position: fixed;
  right: 0;
  top: ${({ navigationBarHeight }) => navigationBarHeight + 10}px;
  height: 100%;
  width: 300px; /* Ensure sidebar has enough width */
  background-color: #f4f4f4;
  box-shadow: -2px 0 5px rgba(0, 0, 0, 0.1);
  transform: ${props => (props.visible ? 'translateX(0)' : 'translateX(100%)')};
  transition: transform 0.3s ease-in-out;
  padding: 20px;
  z-index: 1000;
  overflow-y: auto;
`;

const StarredItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  min-width: 260px;
  max-width: 260px;
  margin-bottom: 20px;
`;

const ItemDetails = styled.p`
  margin: 8px 0;
  color: #777;
`;

const UnstarButton = styled.button`
  background-color: #ff4d4f;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  cursor: pointer;
  &:hover {
    background-color: #d9363e;
  }
`;

const MoveButton = styled.button`
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 5px 10px;
  cursor: pointer;
  margin-top: 5px;
  &:hover {
    background-color: #0056b3;
  }
`;

const NavigationButton = styled(Link)`
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  margin-top: 20px;
  cursor: pointer;
  &:hover {
    background-color: #0056b3;
  }
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

interface SidebarProps {
  isTripSchedulerPage?: boolean;
  days?: string[];
  moveItemToDay?: (item: any, dayIndex: number) => void;
  visible: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ isTripSchedulerPage = false, days, moveItemToDay, visible }) => {
  const { starredItems, toggleStarredItem } = useStarred();
  const [selectedDayIndex, setSelectedDayIndex] = useState<number | null>(null);
  const navigationBarHeight = document.getElementById('navigation-bar')?.offsetHeight || 0;

  const handleMoveClick = (item: any) => {
    if (selectedDayIndex !== null && moveItemToDay) {
      moveItemToDay(item, selectedDayIndex);
    }
  };

  return (
    <SidebarContainer visible={visible} navigationBarHeight={navigationBarHeight}>
      <h2>Starred Items</h2>
      <div>
        {starredItems.map((item, index) => (
          <StarredItem key={index}>
            <ItemImage src={item.imageUrl || 'https://via.placeholder.com/300x150'} alt={item.name} />
            <ItemTitle>{item.name}</ItemTitle>
            <ItemDetails>{item.vicinity}</ItemDetails>
            <ItemDetails>Rating: {item.rating} / 5</ItemDetails>
            {!isTripSchedulerPage && (
              <UnstarButton onClick={() => toggleStarredItem(item)}>
                <FontAwesomeIcon icon={faTimes} /> Unstar
              </UnstarButton>
            )}
            {isTripSchedulerPage && (
              <div>
                <select
                  onChange={e => setSelectedDayIndex(parseInt(e.target.value))}
                  defaultValue=""
                  title="Select Day to Move Item To"
                >
                  <option value="" disabled>
                    Select Day
                  </option>
                  {days &&
                    days.map((day, i) => (
                      <option key={i} value={i}>
                        {day}
                      </option>
                    ))}
                </select>
                <MoveButton onClick={() => handleMoveClick(item)}>
                  <FontAwesomeIcon icon={faArrowRight} /> Move
                </MoveButton>
              </div>
            )}
          </StarredItem>
        ))}
      </div>
      {!isTripSchedulerPage && (
        <NavigationButton to="/trip-scheduler">Go to Trip Scheduler</NavigationButton>
      )}
    </SidebarContainer>
  );
};

export default Sidebar;
