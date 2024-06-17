// src/components/MapContext.tsx
import React, { createContext, useState, useContext, ReactNode } from 'react';
import { HotelData } from '../types'; // Import HotelData type

interface Coordinates {
  lat: number;
  lng: number;
}

interface MapContextType {
  coordinates: Coordinates;
  setCoordinates: (coords: Coordinates) => void;
  hotels: HotelData[];
  setHotels: (hotels: HotelData[]) => void;
  activities: any[];
  setActivities: (activities: any[]) => void;
  places: any[];
  setPlaces: (places: any[]) => void;
}

const MapContext = createContext<MapContextType | undefined>(undefined);

export const useMap = () => {
  const context = useContext(MapContext);
  if (!context) {
    throw new Error('useMap must be used within a MapProvider');
  }
  return context;
};

export const MapProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [coordinates, setCoordinates] = useState<Coordinates>({ lat: 40.7128, lng: -74.0060 }); // Default to New York
  const [hotels, setHotels] = useState<HotelData[]>([]);
  const [activities, setActivities] = useState<any[]>([]);
  const [places, setPlaces] = useState<any[]>([]);

  return (
    <MapContext.Provider value={{ coordinates, setCoordinates, hotels, setHotels, activities, setActivities, places, setPlaces }}>
      {children}
    </MapContext.Provider>
  );
};
