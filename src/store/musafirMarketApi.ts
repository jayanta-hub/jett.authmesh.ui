/* eslint-disable @typescript-eslint/no-explicit-any */
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BaseURL, APIversion } from "../utility/config";


export const musafirMarketApi = createApi({
  reducerPath: "musafirMarketApi",
  baseQuery: fetchBaseQuery({
     baseUrl: `${BaseURL}${APIversion}`,
  /**
   * Prepares the headers for the API requests by checking if the loginSlice
   * contains a valid access token and adding it to the headers if it does.
   * Also sets the Content-Type to application/json.
   * @param {Headers} headers - The headers to be modified.
   * @param {{ getState: () => any }} api - The api object.
   * @returns {Headers} The modified headers.
   */
    prepareHeaders: (headers, { getState }: any) => {
      const token = getState()?.loginSlice?.userLoginInfo?.auth?.accessToken;
      if (token) {
        headers.set("authorization", `${token}`);
      }
      headers.set("Content-Type", "application/json");
      return headers;
    },
  }),


/**
 * Defines the endpoints for the Musafir Market API.
 *
 * @param {import("@reduxjs/toolkit/query/react").MutationBuilder} builder - The builder for creating mutations.
 * @returns {Record<string, import("@reduxjs/toolkit/query/react").MutationDefinition<any, any, any>>} The object containing defined endpoints.
 *
 * This includes:
 * - fetchMarket: A mutation for fetching market data by sending a POST request to the '/api/v1/market/markets' endpoint with a request body.
 */
  endpoints: (builder) => ({
    fetchMarket: builder.mutation({
        /**
         * Fetches the market data from the server.
         *
         * @param {object} patch - The data to be sent in the request body.
         * @returns {import("@reduxjs/toolkit/query/react").QueryDefinition<any, any, any>} The query definition.
         */
          query: (patch) => ({
            url: 'market/markets',
            method: "POST",
            body:patch
          })
        }),

        fetchMarketById: builder.mutation({
        /**
         * Fetches the market data by market id from the server.
         *
         * @param {number} marketId - The id of the market to be fetched.
         * @returns {import("@reduxjs/toolkit/query/react").QueryDefinition<any, any, any>} The query definition.
         */
          query: (marketId) => ({
            url: `/market/market/${marketId}`, 
            method: "GET",
          }),
        }),

  }),
});


export const {
  useFetchMarketMutation,
  useFetchMarketByIdMutation
} = musafirMarketApi;