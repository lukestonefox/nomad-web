import React from 'react';
import styled from 'styled-components';
import { useStarred } from './StarredContext';

interface PlaceCardProps {
    place: {
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

const StarButton = styled.button<{ starred: boolean }>`
  background-color: ${props => (props.starred ? '#ffcc00' : '#ccc')};
  color: white;
  border: none;
  border-radius: 5px;
  padding: 5px 10px;
  cursor: pointer;
  position: absolute;
  top: 10px;
  right: 10px;
  &:hover {
    background-color: ${props => (props.starred ? '#ffb700' : '#999')};
  }
`;

const PlaceCard: React.FC<PlaceCardProps> = ({ place }) => {
  const { starredItems, toggleStarredItem } = useStarred();
  const isStarred = starredItems.some(item => item.name === place.name);

  const handleToggleStar = () => {
    toggleStarredItem(place);
  };

  const defaultImage = 'https://via.placeholder.com/300x200'; // Default image URL
  const imageUrl = place.imageUrl || defaultImage;

  const rating = place.rating > 0 ? `Rating: ${place.rating} / 5` : 'No Rating'

  return (
    <Card>
      <CardImage src={imageUrl} alt={place.name} />
      <StarButton starred={isStarred} onClick={handleToggleStar}>
        {isStarred ? 'Unadd' : 'Add to Trip'}
      </StarButton>
      <CardContent>
        <CardTitle>{place.name}</CardTitle>
        <CardAddress>{place.vicinity}</CardAddress>
        <CardRating>{rating}</CardRating>
      </CardContent>
    </Card>
  );
};
  
  export default PlaceCard;