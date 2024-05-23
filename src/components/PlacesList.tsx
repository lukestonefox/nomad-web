import React from 'react';

interface PlacesListProps {
  places: Array<{ name: string, address: string }>;
}

const PlacesList: React.FC<PlacesListProps> = ({ places }) => {
  return (
    <div>
      <h2>Places to See</h2>
      <ul>
        {places.map((place, index) => (
          <li key={index}>
            {place.name} - {place.address}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PlacesList;
