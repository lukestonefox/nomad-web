import React, { useState } from 'react';
import styled from 'styled-components';
import { useStarred } from '../components/StarredContext';
import { Link } from 'react-router-dom';
import RemoveIcon from '@mui/icons-material/Remove';
import TrendingFlatIcon from '@mui/icons-material/TrendingFlat';

const SidebarContainer = styled.div<{visible: boolean}>`
  transform: ${props => (props.visible ? 'translateX(0)' : 'translateX(100%)')};
  transition: transform 0.3s ease-in-out;
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

interface SidebarProps {
  isTripSchedulerPage?: boolean;
  days?: string[];
  moveItemToDay?: (item: any, dayIndex: number) => void;
  visible: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ isTripSchedulerPage = false, days, moveItemToDay, visible }) => {
  const { starredItems, toggleStarredItem } = useStarred();
  const [selectedDayIndex, setSelectedDayIndex] = useState<number | null>(null);

  const handleMoveClick = (item: any) => {
    if (selectedDayIndex !== null && moveItemToDay) {
      moveItemToDay(item, selectedDayIndex);
    }
  };

  return (
    <SidebarContainer visible={visible} className='fixed top-0 right-0 z-10 flex flex-col items-center justify-center h-full px-5 pt-24 shadow-2xl bg-[#121E26] w-80'>
      <h2 className='text-2xl font-bold text-white'>Starred Items</h2>
      <div className='overflow-y-auto'>
        {starredItems.map((item, index) => (
          <div className='relative flex flex-col items-center w-full p-4 text-white bg-white rounded-md bg-opacity-15' key={index}>
            <img className='object-cover w-full rounded-md' src={item.imageUrl || 'https://via.placeholder.com/300x150'} alt={item.name} />
            <div className='flex flex-col gap-y-1'>
              <p className='font-semibold text-white'>{item.name}</p>
              <p className='text-sm'>{item.vicinity}</p>
              <p>Rating: {item.rating} / 5</p>
            </div>
            {!isTripSchedulerPage && (
            <div onClick={() => toggleStarredItem(item)} className='absolute items-center justify-center p-1 text-white bg-red-500 rounded-md cursor-pointer top-6 right-6 bg-red hover:bg-red-600'>
              <RemoveIcon />
            </div>
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
                  <TrendingFlatIcon /> Move
                </MoveButton>
              </div>
            )}
          </div>
        ))}
      </div>
      {!isTripSchedulerPage && (
        <NavigationButton to="/trip-scheduler">Go to Trip Scheduler</NavigationButton>
      )}
    </SidebarContainer>
  );
};

export default Sidebar;
