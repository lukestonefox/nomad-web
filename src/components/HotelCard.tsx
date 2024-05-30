// src/components/HotelCard.tsx
import React from 'react';
import styled from 'styled-components';

interface HotelCardProps {
  hotel: {
    imageUrl: string;
    name: string;
    vicinity: string;
    rating: number;
  };
}

const Card = styled.div`
  width: 300px;
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  margin: 16px;
`;

const CardImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
  background-color: #eee;
`;

const CardContent = styled.div`
  padding: 16px;
`;

const CardTitle = styled.h3`
  margin: 0;
  font-size: 1.2em;
  color: #333;
`;

const CardAddress = styled.p`
  margin: 8px 0;
  color: #777;
`;

const CardRating = styled.p`
  margin: 8px 0;
  color: #f39c12;
`;

const HotelCard: React.FC<HotelCardProps> = ({ hotel }) => {
  const defaultImage = 'https://via.placeholder.com/300x200'; // Default image URL
  const imageUrl = hotel.imageUrl || defaultImage;

  return (
    <Card>
      <CardImage src={imageUrl} alt={hotel.name} />
      <CardContent>
        <CardTitle>{hotel.name}</CardTitle>
        <CardAddress>{hotel.vicinity}</CardAddress>
        <CardRating>Rating: {hotel.rating} / 5</CardRating>
      </CardContent>
    </Card>
  );
};

export default HotelCard;
