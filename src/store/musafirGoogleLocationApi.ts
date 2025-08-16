
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const GOOGLE_API_KEY = 'AIzaSyAqDTQeKd6Grf5iiJYqMS23HQT8eiryfLw';

export const musafirGoogleLocationApi = createApi({
  reducerPath: 'placesApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://places.googleapis.com/v1/',
    prepareHeaders: (headers) => {
      headers.set('Content-Type', 'application/json');
      headers.set('X-Goog-Api-Key', GOOGLE_API_KEY);
      return headers;
    },
  }),
  endpoints: (builder) => ({
    autocompletePlaces: builder.mutation({
      query: (input) => ({
        url: 'places:autocomplete',
        method: 'POST',
       
        body: {
          input,
          locationBias: {
            rectangle: {
              low: { latitude: 8.0, longitude: 68.0 },
              high: { latitude: 37.0, longitude: 97.0 },
            },
          },
        },
      }),
    }),

  placeDetails: builder.mutation({
  query: (placeId) => ({
    url: `places/${placeId}`,
    method: 'GET',
    headers: {
      'X-Goog-FieldMask': 'postalAddress,location,displayName',
    },
  }),
}),

  }),
});

export const {
  useAutocompletePlacesMutation,
  usePlaceDetailsMutation,
} = musafirGoogleLocationApi;
