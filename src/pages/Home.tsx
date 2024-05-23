import React, { useState } from 'react';
import LocationSelector from '../components/LocationSelector';
import HotelsList from '../components/HotelsList';
import ActivitiesList from '../components/ActivitiesList';
import PlacesList from '../components/PlacesList';
import { fetchHotels, fetchActivities, fetchPlaces, getCoordinates } from '../services/api';

const Home: React.FC = () => {
  const [hotels, setHotels] = useState([]);
  const [activities, setActivities] = useState([]);
  const [places, setPlaces] = useState([]);

  const handleSelectLocation = async (location: string) => {
    try {
      const coordinates = await getCoordinates(location);
      const locationString = `${coordinates.lat},${coordinates.lng}`;

      const fetchedHotels = await fetchHotels(locationString);
      const fetchedActivities = await fetchActivities(locationString);
      const fetchedPlaces = await fetchPlaces(locationString);

      setHotels(fetchedHotels);
      setActivities(fetchedActivities);
      setPlaces(fetchedPlaces);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div>
      <LocationSelector onSelectLocation={handleSelectLocation} />
      <div>
        <HotelsList hotels={hotels} />
        <ActivitiesList activities={activities} />
        <PlacesList places={places} />
      </div>
    </div>
  );
};

export default Home;
