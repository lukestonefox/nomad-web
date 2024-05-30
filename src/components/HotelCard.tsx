// src/components/HotelCard.tsx
import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { useStarred } from './StarredContext';

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
  position: relative;
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
  color: #fff;
`;

const CardAddress = styled.p`
  margin: 8px 0;
  color: #777;
`;

const CardRating = styled.p`
  margin: 8px 0;
  color: #f39c12;
`;

const StarIconContainer = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
`;

const StarIcon = styled(FontAwesomeIcon)<{ starred: boolean }>`
  color: ${props => (props.starred ? 'gold' : 'gray')};
  font-size: 1.5em;
  stroke: black; /* Border color */
  stroke-width: 20px; /* Border thickness */
  stroke-opacity: 1; /* Ensure the border is fully opaque */
`;

const HotelCard: React.FC<HotelCardProps> = ({ hotel }) => {
  const { starredItems, toggleStarredItem } = useStarred();
  const isStarred = starredItems.some(item => item.name === hotel.name);

  const handleToggleStar = () => {
    toggleStarredItem(hotel);
  };

  const defaultImage = 'https://via.placeholder.com/300x200'; // Default image URL
  const imageUrl = hotel.imageUrl || defaultImage;

  const rating = hotel.rating > 0 ? `Rating: ${hotel.rating} / 5` : 'No Rating'

  return (
    <Card>
      <CardImage src={imageUrl} alt={hotel.name} />
      <StarIconContainer onClick={handleToggleStar}>
        <StarIcon icon={faStar} starred={isStarred} />
      </StarIconContainer>
      <CardContent>
        <CardTitle>{hotel.name}</CardTitle>
        <CardAddress>{hotel.vicinity}</CardAddress>
        <CardRating>{rating}</CardRating>
      </CardContent>
    </Card>
  );
};

export default HotelCard;
