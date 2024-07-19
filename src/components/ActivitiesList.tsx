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
}

const ActivitiesList: React.FC<ActivitiesListProps> = ({ activities, id }) => {
  return (
    <div id={id}>
      <h2 className='justify-end'>Activities</h2>
      <div className='flex flex-wrap justify-center gap-4'>
        {activities.map((activity, index) => (
          <ActivityCard key={index} activity={activity} />
        ))}
      </div>
    </div>
  );
};

export default ActivitiesList;
