import React from 'react';
import styled from 'styled-components';
import ActivityCard from './ActivityCard';

interface ActivitiesListProps {
  activities: {
    imageUrl: string;
    name: string;
    vicinity: string;
    rating: number;
  }[];
}

const ListContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const ActivitiesList: React.FC<ActivitiesListProps> = ({ activities }) => {
  return (
    <div>
      <h2>Activities</h2>
      <ListContainer>
        {activities.map((activity, index) => (
          <ActivityCard key={index} activity={activity} />
        ))}
      </ListContainer>
    </div>
  );
};

export default ActivitiesList;
