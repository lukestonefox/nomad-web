import axios from 'axios';
import { AMADEUS_API_KEY, AMADEUS_API_SECRET } from '../apiKey';

// Uses your Amadeus API key and secret to fetch access token
export const fetchAccessToken = async (): Promise<string> => {
  try {
    const clientId = AMADEUS_API_KEY;
    const clientSecret = AMADEUS_API_SECRET;
    
    if (!clientId || !clientSecret) {
      throw new Error("Error: The Amadeus API Key or Secret is not defined!");
    }
  
    const response = await axios.post('/amadeus-api/v1/security/oauth2/token', new URLSearchParams({
      'grant_type': 'client_credentials',
      'client_id': clientId,
      'client_secret': clientSecret
    }), {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });
  
    if (response.status !== 200) {
      throw new Error(`Failed to fetch access token: ${response.statusText}`);
    }
  
    return response.data.access_token;
    
  } catch (error) {
    console.log(error)
    return "";
  }
};
  
  
// Takes in lat/long for a hotel and returns price of hotel (or 0 if price of hotel is not found)
export const fetchHotelPrices = async (location: any, accessToken: any): Promise<number> => {
  try {
      
    // This API is used to get the hotelID using the latitude and longitude
    const hotelResponse = await axios.get('/amadeus-api/v1/reference-data/locations/hotels/by-geocode', {
      headers: {
        'Authorization': `Bearer ${accessToken}`
      },
      params: {
        latitude: location.lat,
        longitude: location.lng
      }
    });
    const hotelID = hotelResponse.data.data[0].hotelId;
    // console.log("hotelID:", hotelID); 
  
    // This API is used to get the price of a hotel using its hotelID and other parameters
    const priceResponse = await axios.get('/amadeus-api/v3/shopping/hotel-offers', { // issue here is that the Amadeus server is getting too many requests too soon. Throws Error 429
      headers: {
        'Authorization': `Bearer ${accessToken}`
      },
      params: {
        hotelIds: hotelID,
        adults: "2",
        checkInDate: '2024-12-07', 
        checkOutDate:'2024-12-10'
      }
    })
    const hotelPrice = priceResponse.data.data[0].offers[0].price.total;
  
    return hotelPrice;
    
  } catch (error: any) {
  if (error.response.status === 400 || axios.isAxiosError(error)) {
    console.log(`Price for hotel in ${location.lat},${location.lng} not found`);
  }
    return 0;
  }
};

