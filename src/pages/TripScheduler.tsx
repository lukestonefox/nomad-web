import React, { useState } from 'react';
import { useStarred } from '../components/StarredContext';
import Sidebar from '../components/Sidebar';
import NavigationBar from '../components/NavigationBar';
import RemoveIcon from '@mui/icons-material/Remove';
import { yellow } from '@mui/material/colors';
import StarIcon from '@mui/icons-material/Star';
import AddIcon from '@mui/icons-material/Add';

const TripScheduler: React.FC = () => {
  const { starredItems } = useStarred();
  const [days, setDays] = useState<string[]>(['Day 1', 'Day 2', 'Day 3']);
  const [dayItems, setDayItems] = useState<{ [key: string]: any[] }>({});
  const [isSidebarVisible, setSidebarVisible] = useState(false);

  const addDay = () => {
    setDays(prevDays => [...prevDays, `Day ${prevDays.length + 1}`]);
  };

  const removeDay = (index: number) => {
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

  const handleSidebarToggle = () => {
    setSidebarVisible(prevState => !prevState);
  };

  return (
    <div className='flex flex-col w-full bg-[#182833] h-screen'>
      <NavigationBar onSidebarToggle={handleSidebarToggle} />
      <div className='flex flex-row w-full h-full mt-16 overflow-y-hidden'>
        <Sidebar visible isTripSchedulerPage days={days} moveItemToDay={moveItemToDay} />
        <div className='h-full p-8 mb-10 pr-80'>
          <div className='flex flex-row h-full flex-nowrap gap-x-20 scroll'>
            {days.map((day, index) => (
              <div className='w-[300px] h-full p-4 flex flex-col items-center relative overflow-auto shadow-xl bg-black bg-opacity-10 rounded-lg text-white gap-y-3' key={index}>
                <div className='flex flex-row'>
                  <p className='text-xl font-semibold'>{day}</p>
                </div>
                {/* List of items moved to this day */}
                {dayItems[day]?.map((item, idx) => (
                  <div className='relative flex flex-col w-full p-3 bg-white rounded-md bg-opacity-10' key={idx}>
                    <div onClick={() => removeItemFromDay(item, day)} className='absolute items-center justify-center p-1 text-white bg-red-500 rounded-md cursor-pointer top-4 right-4 bg-red hover:bg-red-600'>
                      <RemoveIcon />
                    </div>
                    <img className='w-full h-[150px] object-cover rounded-md' src={item.imageUrl || 'https://via.placeholder.com/300x150'} alt={item.name} />
                    <div className='flex flex-col gap-y-1'>
                      <p className='mt-2 font-semibold text-md'>{item.name}</p>
                      <p className='text-sm font-light'>{item.vicinity}</p>
                      <div className='flex items-center gap-x-1'>
                        <StarIcon sx={{color: yellow[500]}} />
                        <p className='text-yellow-300 text-md'>{item.rating}</p>
                      </div>
                    </div>
                  </div>
                ))}
                <div className='items-center justify-end p-1 px-3 py-2 duration-100 bg-red-500 rounded-md cursor-pointer hover:bg-red-600' onClick={() => removeDay(index)}>
                    Remove Day
                </div>
              </div>
            ))}
            <div className='w-[300px] h-full p-4 flex flex-row gap-x-1 items-center relative overflow-auto shadow-xl justify-center bg-black bg-opacity-10 hover:bg-opacity-15 duration-200 cursor-pointer text-white text-opacity-15 font-bold text-xl' onClick={addDay}>
              <AddIcon />
              <p>Add Day</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TripScheduler;