// src/pages/Home.tsx
import React, { useState } from 'react';
import styled from 'styled-components';
import LocationSelector from '../components/LocationSelector';
import ActivitiesList from '../components/ActivitiesList';
import MapComponent from '../components/MapComponent';
import { fetchHotels, fetchActivities, fetchPlaces, getCoordinates } from '../services/api';
import { useMap } from '../components/MapContext';
import NavigationBar from '../components/NavigationBar';
import Sidebar from '../components/Sidebar';

const Container = styled.div<{ sidebarVisible: boolean }>`
  transform: ${props => (props.sidebarVisible ? 'translateX(-300px)' : 'translateX(0)')}; // Move content when sidebar appears
  transition: transform 0.3s ease-in-out; // Transition when sidebar appears
`;

const Home: React.FC = () => {
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
    <div className='bg-[#182833] h-full no-scrollbar'>
      <NavigationBar onSidebarToggle={handleSidebarToggle} />
      <Container sidebarVisible={isSidebarVisible} className='flex flex-col items-center h-full text-white gap-y-32'>
        <LocationSelector onSelectLocation={handleSelectLocation} map={map}/>
        <div className='w-screen h-[740px] px-24'>
          <MapComponent onLocationSelected={handleSelectLocation} coordinates={coordinates} onMapLoad={setMap} />
        </div>
        <div className="flex flex-col w-4/5 h-auto pt-24 font-bold gap-y-4">
          <ActivitiesList title="Hotels" id="#hotels-list" activities={hotels} />
          <ActivitiesList title="Activities" id="#activities-list" activities={activities} />
          <ActivitiesList title="Places" id="#places-to-see-list" activities={places} />
        </div>
      </Container>
      <Sidebar visible={isSidebarVisible} />
    </div>
  );
};

export default Home;
