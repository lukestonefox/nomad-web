declare module 'amadeus' {
    interface AmadeusClientOptions {
      clientId: string;
      clientSecret: string;
    }
  
    interface HotelOffer {
      hotel: {
        name: string;
        address: {
          lines: string[];
        };
        rating: number;
        media: {
          uri: string;
        }[];
      };
      offers: {
        price: {
          total: string;
        };
      }[];
    }
  
    class HotelOffers {
      get(params: { latitude: number; longitude: number; radius: number }): Promise<{ data: HotelOffer[] }>;
    }
  
    class Shopping {
      hotelOffers: HotelOffers;
    }
  
    class Amadeus {
      constructor(options: AmadeusClientOptions);
      shopping: Shopping;
    }
  
    export = Amadeus;
  }
  