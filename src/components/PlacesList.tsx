import React from 'react';
import styled from 'styled-components';
import PlaceCard from './PlaceCard';

interface PlacesListProps {
  places: {
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

const PlacesList: React.FC<PlacesListProps> = ({ places }) => {
  return (
    <div>
      <h2>Places to See</h2>
      <ListContainer>
        {places.map((place, index) => (
          <PlaceCard key={index} place={place} />
        ))}
      </ListContainer>
    </div>
  );
};

export default PlacesList;
