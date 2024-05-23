import React from 'react';

interface HotelsListProps {
  hotels: Array<{ name: string, address: string }>;
}

const HotelsList: React.FC<HotelsListProps> = ({ hotels }) => {
  return (
    <div>
      <h2>Hotels</h2>
      <ul>
        {hotels.map((hotel, index) => (
          <li key={index}>
            {hotel.name} - {hotel.address}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HotelsList;
