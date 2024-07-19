import React, { useEffect, useRef } from 'react';

interface MapComponentProps {
  onLocationSelected: (location: string) => void;
  coordinates: { lat: number; lng: number };
  onMapLoad: (map: google.maps.Map) => void;
}

const MapComponent: React.FC<MapComponentProps> = ({ onLocationSelected, coordinates, onMapLoad }) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const markerRef = useRef<google.maps.Marker | null>(null);
  const map = useRef<google.maps.Map | null>(null);

  useEffect(() => {
    if (mapRef.current) {
      map.current = new google.maps.Map(mapRef.current, {
        center: coordinates,
        zoom: 10,
      });

      onMapLoad(map.current);

      map.current.addListener('click', (event: google.maps.MapMouseEvent) => {
        if (event.latLng) {
          const latLng = event.latLng;
          if (markerRef.current) {
            markerRef.current.setMap(null);
          }
          markerRef.current = new google.maps.Marker({
            position: latLng,
            map: map.current,
          });

          const geocoder = new google.maps.Geocoder();
          geocoder.geocode({ location: latLng }, (results, status) => {
            if (status === 'OK' && results && results[0]) {
              onLocationSelected(results[0].formatted_address);
            }
          });
        }
      });
    }
  }, [mapRef]);

  useEffect(() => {
    if (map.current) {
      map.current.setCenter(coordinates);
      if (markerRef.current) {
        markerRef.current.setPosition(coordinates);
      } else {
        markerRef.current = new google.maps.Marker({
          position: coordinates,
          map: map.current,
        });
      }
    }
  }, [coordinates]);

  return <div className="w-[1000px] h-[1000px] shadow-2xl" ref={mapRef}></div>;
};

export default MapComponent;
