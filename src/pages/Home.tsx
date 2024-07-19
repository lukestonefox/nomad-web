// src/pages/Home.tsx
import React, { useState } from 'react';
import styled from 'styled-components';
import LocationSelector from '../components/LocationSelector';
import HotelsList from '../components/HotelsList';
import ActivitiesList from '../components/ActivitiesList';
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
    <div className='bg-[#182833] h-full'>
      <div className=''>
        <NavigationBar onSidebarToggle={handleSidebarToggle} />
      </div>
      <Container sidebarVisible={isSidebarVisible} className='flex flex-col items-center h-full text-white gap-y-32'>
        <LocationSelector onSelectLocation={handleSelectLocation} map={map} />
        <MapComponent onLocationSelected={handleSelectLocation} coordinates={coordinates} onMapLoad={setMap} />
        <div className="flex flex-col w-4/5 h-full pt-4 font-bold">
          <ActivitiesList id="hotels-list" activities={hotels} />
          <ActivitiesList id="activities-list" activities={activities} />
          <ActivitiesList id="places-to-see-list" activities={places} />
        </div>
      </Container>
      <Sidebar visible={isSidebarVisible} />
    </div>
  );
};

export default Home;
