import React, { useState } from 'react';
import styled from 'styled-components';
import LocationSelector from '../components/LocationSelector';
import HotelsList from '../components/HotelsList';
import ActivitiesList from '../components/ActivitiesList';
import PlacesList from '../components/PlacesList';
import MapComponent from '../components/MapComponent';
import { fetchHotels, fetchActivities, fetchPlaces, getCoordinates } from '../services/api';
import { HotelData } from '../types'; // Import the types

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const ListsContainer = styled.div`
  width: 80%;
  margin-top: 20px;
`;

const Home: React.FC = () => {
  const [hotels, setHotels] = useState<HotelData[]>([]); // Specify the type for hotels
  const [activities, setActivities] = useState([]); // You should also specify the type if needed
  const [places, setPlaces] = useState([]); // You should also specify the type if needed
  const [coordinates, setCoordinates] = useState<{ lat: number; lng: number }>({ lat: 40.7128, lng: -74.0060 }); // Default to NYC
  const [map, setMap] = useState<google.maps.Map | null>(null);

  const handleSelectLocation = async (location: string) => {
    try {
      const coords = await getCoordinates(location);
      setCoordinates(coords);

      const locationString = `${coords.lat},${coords.lng}`;

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
    <Container>
      <LocationSelector onSelectLocation={handleSelectLocation} map={map} />
      <MapComponent onLocationSelected={handleSelectLocation} coordinates={coordinates} onMapLoad={setMap} />
      <ListsContainer>
        <HotelsList hotels={hotels} />
        <ActivitiesList activities={activities} />
        <PlacesList places={places} />
      </ListsContainer>
    </Container>
  );
};

export default Home;
