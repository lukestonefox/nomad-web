import axios from 'axios';
import { HotelData } from '../types';
import { API_KEY } from '../apiKey';
import Amadeus from 'amadeus';

const amadeus = new Amadeus({
    clientId: '7wnPtijdpWOqputu9aAmhqRgHPnOhRKE',
    clientSecret: 'L2DrxNqvW7NM2UfZ'
});

export const fetchHotels = async (location: string): Promise<HotelData[]> => {
    try {
      const coordinates = await getCoordinates(location);
  
      const response = await amadeus.shopping.hotelOffers.get({
        latitude: coordinates.lat,
        longitude: coordinates.lng,
        radius: 5, // Radius in km
      });
  
      const data = response.data;
  
      console.log('Fetched Hotels:', data);
  
      const hotels = data.map((hotelOffer: any) => {
        const hotel = hotelOffer.hotel;
        const imageUrl = hotel.media && hotel.media.length > 0 ? hotel.media[0].uri : '';
        const rating = hotel.rating ? hotel.rating : 0;
        const price = hotelOffer.offers && hotelOffer.offers.length > 0 ? hotelOffer.offers[0].price.total : '';
  
        return {
          imageUrl,
          name: hotel.name,
          vicinity: hotel.address.lines.join(', '),
          rating,
          price
        };
      });
  
      return hotels;
    } catch (error) {
      console.error('Error fetching hotels:', error);
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