/* eslint-disable @typescript-eslint/no-explicit-any */
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BaseURL, APIversion } from "../utility/config";
import { getAuthHeader } from "../utility/config/oAuth";

export const musafirOrganizationApi = createApi({
  reducerPath: "musafirOrganizationApi",
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
    prepareHeaders: (headers) => {
      headers.set("Content-Type", "application/json");
      return headers;
    },
  }),

  /**
   * Defines the endpoints for the Musafir Organization API.
   *
   * @param {import("@reduxjs/toolkit/query/react").MutationBuilder} builder - The builder for creating mutations.
   * @returns {Record<string, import("@reduxjs/toolkit/query/react").MutationDefinition<any, any, any>>} 
   *          The object containing defined endpoints.
   *
   * This includes:
   * - fetchOrganizations: A mutation for fetching organization data by sending a POST request to the '/api/v1/Organization/list' endpoint with a request body.
   */
  endpoints: (builder) => ({
    fetchOrganizations: builder.mutation({
      async queryFn(patch, { getState }: any, _extraOptions, fetchWithBQ) {
        const authOdetails = getState()?.loginSlice?.token?.Response?.Auth1dot0;
        const authToken = getAuthHeader('organization/list', 'POST', authOdetails,);
        const response = await fetchWithBQ({
          url: `organization/list`,
          method: "POST",
          body: patch.patch,
          headers: {
            "Authorization": authToken?.Authorization,
          },
        });
        return response;
      }
    }),
    updateOrganizationStatus: builder.mutation({
      async queryFn(patch, { getState }: any, _extraOptions, fetchWithBQ) {
        const authOdetails = getState()?.loginSlice?.token?.Response?.Auth1dot0;
        const authToken = getAuthHeader('organization/statusupdate', 'POST', authOdetails,);
        const response = await fetchWithBQ({
          url: `organization/statusupdate`,
          method: "POST",
          body: patch.patch,
          headers: {
            "Authorization": authToken?.Authorization,
          },
        });
        return response;
      }
    }),
  }),
});

export const {
  useFetchOrganizationsMutation,
  useUpdateOrganizationStatusMutation,
} = musafirOrganizationApi; 