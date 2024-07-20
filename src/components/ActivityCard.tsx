import React from 'react';
import { useStarred } from './StarredContext';
import AddIcon from '@mui/icons-material/Add';
import StarIcon from '@mui/icons-material/Star';
import RemoveIcon from '@mui/icons-material/Remove';
import { yellow } from '@mui/material/colors';

interface ActivityCardProps {
    activity: {
      imageUrl: string;
      name: string;
      vicinity: string;
      rating: number;
      price: number;
    };
  }

const ActivityCard: React.FC<ActivityCardProps> = ({ activity }) => {
  const { starredItems, toggleStarredItem } = useStarred();
  const isStarred = starredItems.some(item => item.name === activity.name);

  const handleToggleStar = () => {
    toggleStarredItem(activity);
  };

  const imageUrl = activity.imageUrl || 'https://via.placeholder.com/300x200'; // Default image if imageUrl is not provided
  const rating = activity.rating > 0 ? `${activity.rating}` : 'No Rating'
  const price = activity.price;

  return (
    <div className='w-[300px] overflow-hidden shadow-2xl relative rounded-lg'>
      <div onClick={handleToggleStar} className={'absolute top-2 right-2 items-center justify-center p-1 rounded-md cursor-pointer ' + (isStarred ? `bg-red-500 hover:bg-red-600` : 'bg-green-500 hover:bg-green-600')}>
        {isStarred ? <RemoveIcon /> : <AddIcon />}
      </div>
      <img className='object-cover w-full aspect-video' src={imageUrl} alt={activity.name} />
      <div className='flex flex-col w-full h-full p-4 bg-white bg-opacity-5 gap-y-2'>
        <div className='flex flex-col'>
          <p className='text-lg font-semibold truncate text-ellipsis'>{activity.name}</p>
          <p className='text-sm font-normal'>{activity.vicinity}</p>
        </div>
        <div className='flex items-center justify-between w-full'>
          <div className='flex items-center gap-x-1'>
            <StarIcon sx={{color: yellow[500]}} />
            <p className='text-yellow-300 text-md'>{rating}</p>
          </div>
          {price > 0 && <p className='text-green-500 text-md'> ${price}</p>}
        </div>
      </div>
    </div>
  );
};
  
  export default ActivityCard;