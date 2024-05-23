import axios from 'axios';

const API_KEY = 'AIzaSyAYfyGWY6UShwkcFMKT8XbhENeVNt6Gj0s';

export const fetchHotels = async (location: string) => {
    const response = await axios.get(`/api/maps/api/place/nearbysearch/json`, {
      params: {
        location,
        radius: 5000,
        type: 'lodging',
        key: API_KEY,
      },
    });
    return response.data.results;
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
