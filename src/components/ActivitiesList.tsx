import React from 'react';
import ActivityCard from './ActivityCard';

interface ActivitiesListProps {
  activities: {
    imageUrl: string;
    name: string;
    vicinity: string;
    rating: number;
    price: number;
  }[];
  id?: string;
  title: string;
}

const ActivitiesList: React.FC<ActivitiesListProps> = ({ activities, id, title }) => {
  return (
    <div className='flex flex-col items-center gap-y-4' id={id}>
      <h2 className='text-3xl'>{title}</h2>
      <div className='flex flex-wrap justify-center gap-4'>
        {activities.map((activity, index) => (
          <ActivityCard key={index} activity={activity} />
        ))}
      </div>
    </div>
  );
};

export default ActivitiesList;
