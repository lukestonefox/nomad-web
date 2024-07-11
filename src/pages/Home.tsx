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
import { useMap } from '../components/MapContext';
import NavigationBar from '../components/NavigationBar';
import Sidebar from '../components/Sidebar';

const Container = styled.div<{ sidebarVisible: boolean }>`
  transform: ${props => (props.sidebarVisible ? 'translateX(-300px)' : 'translateX(0)')}; // Move content when sidebar appears
  transition: transform 0.3s ease-in-out; // Transition when sidebar appears
`;

const ListsContainer = styled.div`
  width: 80%;
  margin-top: 20px;
`;

const Home: React.FC = () => {
  const { starredItems } = useStarred();
  const { coordinates, setCoordinates, hotels, setHotels, activities, setActivities, places, setPlaces } = useMap();
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [isSidebarVisible, setSidebarVisible] = useState(false);

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

  const handleSidebarToggle = () => {
    setSidebarVisible(prevState => !prevState);
  };

  return (
    <>
      <div className='mx-7'>
        <NavigationBar onSidebarToggle={handleSidebarToggle} />
      </div>
      <Container sidebarVisible={isSidebarVisible} className='bg-[#182833] h-full flex flex-col items-center gap-y-32 text-white'>
        <LocationSelector onSelectLocation={handleSelectLocation} map={map} />
        <MapComponent onLocationSelected={handleSelectLocation} coordinates={coordinates} onMapLoad={setMap} />
        <ListsContainer className="h-screen pt-4 font-bold">
          <HotelsList id="hotels-list" hotels={hotels} />
          <ActivitiesList id="activities-list" activities={activities} />
          <PlacesList id="places-to-see-list" places={places} />
        </ListsContainer>
      </Container>
      <Sidebar visible={isSidebarVisible} />
    </>
  );
};

export default Home;
