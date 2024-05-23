import React, { useState } from 'react';

interface LocationSelectorProps {
  onSelectLocation: (location: string) => void;
}

const LocationSelector: React.FC<LocationSelectorProps> = ({ onSelectLocation }) => {
  const [location, setLocation] = useState('');

  const handleSelect = () => {
    onSelectLocation(location);
  };

  return (
    <div>
      <input 
        type="text" 
        value={location} 
        onChange={(e) => setLocation(e.target.value)} 
        placeholder="Enter a location" 
      />
      <button onClick={handleSelect}>Search</button>
    </div>
  );
};

export default LocationSelector;
