import React, { useState, useEffect, useRef } from 'react';

interface LocationSelectorProps {
  onSelectLocation: (location: string) => void;
  map: google.maps.Map | null; // Change to map object
}

const LocationSelector: React.FC<LocationSelectorProps> = ({ onSelectLocation, map }) => {
  const [location, setLocation] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current && map) {
      const autocomplete = new google.maps.places.Autocomplete(inputRef.current, {
        types: ['(cities)'],
      });

      autocomplete.addListener('place_changed', () => {
        const place = autocomplete.getPlace();
        if (place.geometry) {
          setLocation(place.formatted_address || '');
          onSelectLocation(place.formatted_address || '');
        }
      });

      const searchBox = new google.maps.places.SearchBox(inputRef.current);
      map.controls[google.maps.ControlPosition.TOP_LEFT].push(inputRef.current); // Use map object

      searchBox.addListener('places_changed', () => {
        const places = searchBox.getPlaces();
        if (places?.length) {
          const place = places[0];
          if (place.geometry) {
            setLocation(place.formatted_address || '');
            onSelectLocation(place.formatted_address || '');
          }
        }
      });
    }
  }, [map, inputRef]);

  return (
    <div>
      <input 
        ref={inputRef}
        type="text"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        placeholder="Enter a location" 
      />
    </div>
  );
};

export default LocationSelector;
