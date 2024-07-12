// src/pages/Home.tsx
import React, { useState } from 'react';
import styled from 'styled-components';
import LocationSelector from '../components/LocationSelector';
import HotelsList from '../components/HotelsList';
import ActivitiesList from '../components/ActivitiesList';
import PlacesList from '../components/PlacesList';
import MapComponent from '../components/MapComponent';
import { fetchHotels, fetchActivities, fetchPlaces, getCoordinates } from '../services/api';
import { useStarred } from '../components/StarredContext';
import { useMap } from '../components/MapContext'; // Import useMap
import NavigationBar from '../components/NavigationBar';

const Container = styled.div<{ sidebarVisible: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  transform: ${props => (props.sidebarVisible ? 'translateX(-149px)' : 'translateX(0)')}; // Move content when sidebar appears
  transition: transform 0.3s ease-in-out; // Transition when sidebar appears
`;

const ListsContainer = styled.div`
  width: 80%;
  margin-top: 20px;
`;

const Home: React.FC = () => {
  const { starredItems } = useStarred(); // Access starred items from context
  const { coordinates, setCoordinates, hotels, setHotels, activities, setActivities, places, setPlaces } = useMap(); // Use values from MapContext
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
    <Container sidebarVisible={starredItems.length > 0}>
      <NavigationBar />
      <LocationSelector onSelectLocation={handleSelectLocation} map={map} />
      <MapComponent onLocationSelected={handleSelectLocation} coordinates={coordinates} onMapLoad={setMap} />
      <ListsContainer>
        <HotelsList id="hotels-list" hotels={hotels} />
        <ActivitiesList id="activities-list" activities={activities} />
        <PlacesList id="places-to-see-list" places={places} />
      </ListsContainer>
    </Container>
  );
};

export default Home;
