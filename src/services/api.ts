import axios from 'axios';
import { HotelData } from '../types';
import { API_KEY } from '../apiKey';
import { fetchAccessToken, fetchHotelPrices } from './amadeus-api';

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

export const fetchHotels = async (location: string): Promise<HotelData[]> => { // !!!
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

    // fetch the access token needed for amadeus api calls
    const accessToken = await fetchAccessToken();

    const hotels = await Promise.all(
      data.map(async (hotel: any): Promise<HotelData> => {
        const photoReference = hotel.photos && hotel.photos.length > 0 ? hotel.photos[0].photo_reference : '';
        const imageUrl = photoReference ? `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photoReference}&key=${API_KEY}` : '';

        const rating = hotel.rating ? hotel.rating : 0; // fallback in case a hotel does not having a rating

        const price = await fetchHotelPrices(hotel.geometry.location, accessToken);

        return {
          imageUrl,
          name: hotel.name,
          vicinity: hotel.vicinity,
          rating,
          price
        };
      })
    );

    return hotels;
  } catch (error) {
    console.error('Error fetching hotels:', error);
    return [];
  }
};
  
export const fetchActivities = async (location: string) => {
  try {
    const response = await axios.get(`/api/maps/api/place/nearbysearch/json`, {
      params: {
        location,
        radius: 5000,
        type: 'tourist_attraction',
        key: API_KEY,
      },
    });
  
    const data = await response.data.results;
    // console.log('Fetched Activities:', data);
  
    const activities = data.map((activity: any) => {
      const photoReference = activity.photos && activity.photos.length > 0 ? activity.photos[0].photo_reference : '';
      const imageUrl = photoReference ? `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photoReference}&key=${API_KEY}` : '';
  
      const rating = activity.rating ? activity.rating : 0; // Fallback in case an activity does not having a rating

      return {
        imageUrl,
        name: activity.name,
        vicinity: activity.vicinity,
        rating
      };
    })
  
    return activities;
  } catch (error) {
    console.error('Error fetching activities:', error);
    return [];
  }
};
  
export const fetchPlaces = async (location: string) => { 
  try {
    const response = await axios.get(`/api/maps/api/place/nearbysearch/json`, {
      params: {
        location,
        radius: 5000,
        type: 'point_of_interest',
        key: API_KEY,
      },
    });
  
    const data = await response.data.results;
    // console.log('Fetched Places:', data);

    const places = data.map((place: any) => {
      const photoReference = place.photos && place.photos.length > 0 ? place.photos[0].photo_reference : '';
      const imageUrl = photoReference ? `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photoReference}&key=${API_KEY}` : '';
  
      const rating = place.rating ? place.rating : 0; // Fallback in case a place does not having a rating

      return {
        imageUrl,
        name: place.name,
        vicinity: place.vicinity,
        rating
      };
    })
  
    return places;
  } catch (error) {
    console.error('Error fetching places:', error);
    return [];
  }
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
