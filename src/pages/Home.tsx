// src/pages/Home.tsx
import React, { useState } from 'react';
import styled from 'styled-components';
import LocationSelector from '../components/LocationSelector';
import HotelsList from '../components/HotelsList';
import ActivitiesList from '../components/ActivitiesList';
import PlacesList from '../components/PlacesList';
import MapComponent from '../components/MapComponent';
// import { fetchHotels, fetchActivities, fetchPlaces, getCoordinates } from '../services/api';
import { fetchActivities, fetchPlaces, getCoordinates } from '../services/api';
import { fetchHotels } from '../services/AmadeusAPI'; // Import fetchHotels from AmadeusAPI file
import { HotelData } from '../types'; // Import the types
import { useStarred } from '../components/StarredContext';

const Container = styled.div<{ sidebarVisible: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  transform: ${props => (props.sidebarVisible ? 'translateX(-150px)' : 'translateX(0)')}; // Move content when sidebar appears
  transition: transform 0.3s ease-in-out; // Transition when sidebar appears
`;

const ListsContainer = styled.div`
  width: 80%;
  margin-top: 20px;
`;

const Home: React.FC = () => {
  const [hotels, setHotels] = useState<HotelData[]>([]);
  const [activities, setActivities] = useState([]);
  const [places, setPlaces] = useState([]);
  const [coordinates, setCoordinates] = useState<{ lat: number; lng: number }>({ lat: 40.7128, lng: -74.0060 });
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const { starredItems } = useStarred(); // Access starred items from context

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
    <Container sidebarVisible={starredItems.length > 0}>
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
