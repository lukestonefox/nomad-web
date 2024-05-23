import React from 'react';

interface ActivitiesListProps {
  activities: Array<{ name: string, description: string }>;
}

const ActivitiesList: React.FC<ActivitiesListProps> = ({ activities }) => {
  return (
    <div>
      <h2>Activities</h2>
      <ul>
        {activities.map((activity, index) => (
          <li key={index}>
            {activity.name} - {activity.description}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ActivitiesList;
