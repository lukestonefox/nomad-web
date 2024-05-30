import React from 'react';
import styled from 'styled-components';
import HotelCard from './HotelCard';

interface HotelsListProps {
  hotels: {
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

const HotelsList: React.FC<HotelsListProps> = ({ hotels }) => {
  return (
    <div>
      <h2>Hotels</h2>
      <ListContainer>
        {hotels.map((hotel, index) => (
          <HotelCard key={index} hotel={hotel} />
        ))}
      </ListContainer>
    </div>
  );
};

export default HotelsList;