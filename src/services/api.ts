import axios from 'axios';
import { HotelData } from '../types';

const API_KEY = 'AIzaSyAYfyGWY6UShwkcFMKT8XbhENeVNt6Gj0s';

// export const fetchHotels = async (location: string) => {
//     const response = await axios.get(`/api/maps/api/place/nearbysearch/json`, {
//       params: {
//         location,
//         radius: 5000,
//         type: 'lodging',
//         key: API_KEY,
//       },
//     });
//     console.log(response.data);
//     console.log(response.data.results);
//     return response.data.results;
// };

export const fetchHotels = async (location: string): Promise<HotelData[]> => {
  try {
    const response = await axios.get(`/api/maps/api/place/nearbysearch/json`, {
      params: {
        location,
        radius: 5000,
        type: 'lodging',
        key: API_KEY,
      },
    });
    const data = await response.data.results;

    console.log('Fetched Hotels:', data);

    const hotels = data.map((hotel: any) => {
      const photoReference = hotel.photos && hotel.photos.length > 0 ? hotel.photos[0].photo_reference : '';
      const imageUrl = photoReference ? `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photoReference}&key=${API_KEY}` : '';

      return {
        imageUrl,
        name: hotel.name,
        vicinity: hotel.vicinity,
        rating: hotel.rating
      };
    });

    return hotels;
  } catch (error) {
    console.error('Error fetching hotels:', error);
    return [];
  }
};
  
export const fetchActivities = async (location: string) => {
  const response = await axios.get(`/api/maps/api/place/nearbysearch/json`, {
    params: {
      location,
      radius: 5000,
      type: 'tourist_attraction',
      key: API_KEY,
    },
  });
  return response.data.results;
};
  
export const fetchPlaces = async (location: string) => {
  const response = await axios.get(`/api/maps/api/place/nearbysearch/json`, {
    params: {
      location,
      radius: 5000,
      type: 'point_of_interest',
      key: API_KEY,
    },
  });
  return response.data.results;
};
  
export const getCoordinates = async (location: string) => {
  const response = await axios.get(`/api/maps/api/geocode/json`, {
    params: {
      address: location,
      key: API_KEY,
    },
  });

  if (response.data.status === 'OK') {
    const { lat, lng } = response.data.results[0].geometry.location;
    return { lat, lng };
  } else {
    throw new Error('Geocoding API failed');
  }
};
