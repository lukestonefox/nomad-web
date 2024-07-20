import React, { useState } from 'react';
import styled from 'styled-components';
import { useStarred } from '../components/StarredContext';
import { Link } from 'react-router-dom';
import RemoveIcon from '@mui/icons-material/Remove';
import TrendingFlatIcon from '@mui/icons-material/TrendingFlat';
import StarIcon from '@mui/icons-material/Star';
import { yellow } from '@mui/material/colors';

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
    <SidebarContainer visible={visible} className='fixed top-0 right-0 z-10 flex flex-col items-center justify-center h-full px-4 pt-24 shadow-2xl bg-[#121E26] w-80'>
      <h2 className='text-2xl font-bold text-white'>Starred Items</h2>
      <div className='flex flex-col mt-3 mb-3 overflow-y-auto rounded-md gap-y-4 no-scrollbar'>
        {starredItems.map((item, index) => (
          <div className='relative flex flex-col items-center w-full p-4 gap-y-2 text-white rounded-md duration-200 hover:bg-[#182833] shadow-xl px-2' key={index}>
            <img className='object-cover w-full rounded-md aspect-video' src={item.imageUrl || 'https://via.placeholder.com/300x150'} alt={item.name} />
            <div className='flex flex-col w-full px-2 gap-y-1'>
              <p className='font-semibold'>{item.name}</p>
              <p className='text-sm'>{item.vicinity}</p>
              <div className='flex items-center justify-between w-full'>
                <div className='flex items-center gap-x-1'>
                  <StarIcon sx={{color: yellow[500]}} />
                  <p className='text-yellow-300 text-md'>{item.rating}</p>
                </div>
                {item.price > 0 && <p className='text-green-500 text-md'> ${item.price}</p>}
              </div>
            </div>
            <div onClick={() => toggleStarredItem(item)} className='absolute items-center justify-center p-1 text-white bg-red-500 rounded-md cursor-pointer top-6 right-6 bg-red hover:bg-red-600'>
              <RemoveIcon />
            </div>
            {isTripSchedulerPage && (
              <div className='flex flex-row gap-x-2'>
                <select
                  onChange={e => setSelectedDayIndex(parseInt(e.target.value))}
                  defaultValue=""
                  title="Select Day to Move Item To"
                  className='px-3 py-2 text-white duration-200 bg-blue-500 rounded-md cursor-pointer hover:bg-blue-600'
                >
                  {days &&
                    days.map((day, i) => (
                      <option key={i} className='text-white duration-200 bg-blue-600 hover:bg-blue-500' value={i}>
                        {day}
                      </option>
                    ))}
                </select>
                <div className='px-3 py-2 text-white duration-200 bg-blue-500 rounded-md cursor-pointer hover:bg-blue-600' onClick={() => handleMoveClick(item)}>
                  <TrendingFlatIcon />
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
      {!isTripSchedulerPage && (
        <Link className='px-3 py-2 mb-4 text-white bg-blue-500 rounded-sm' to="/trip-scheduler">Go to Trip Scheduler</Link>
      )}
    </SidebarContainer>
  );
};

export default Sidebar;
