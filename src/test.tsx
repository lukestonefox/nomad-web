// Import fetchHotels function
import { fetchHotels } from './services/AmadeusAPI';

// Define a test function to call fetchHotels
const testFetchHotels = async () => {
  try {
    // Call fetchHotels with a sample location string
    const hotels = await fetchHotels('New York'); // You can replace 'New York' with any location
    console.log('Fetched Hotels:', hotels);
  } catch (error) {
    console.error('Error fetching hotels:', error);
  }
};

// Call the test function
testFetchHotels();
