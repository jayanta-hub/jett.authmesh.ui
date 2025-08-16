/* eslint-disable @typescript-eslint/no-explicit-any */
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BaseURL, APIversion } from "../utility/config";
import { getAuthHeader } from "../utility/config/oAuth";

export const musafirBudgetsApi = createApi({
  reducerPath: "musafirBudgetsApi",
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
   * Defines the endpoints for the Musafir User API.
   *
   * @param {import("@reduxjs/toolkit/query/react").MutationBuilder} builder - The builder for creating mutations.
   * @returns {Record<string, import("@reduxjs/toolkit/query/react").MutationDefinition<any, any, any>>} 
   *          The object containing defined endpoints.
   *
   * This includes:
   * - fetchUsers: A mutation for fetching user data by sending a POST request to the '/api/v1/user/Users' endpoint with a request body.
   */
  endpoints: (builder) => ({

    fetchBudget: builder.mutation({
      async queryFn(patch, { getState }: any, _extraOptions, fetchWithBQ) {
        const authOdetails = getState()?.loginSlice?.token?.Response?.Auth1dot0;
        const authToken = getAuthHeader('budget/get', 'POST', authOdetails,);
        const response = await fetchWithBQ({
          url: `budget/get`,
          method: "POST",
          body: patch.patch,
          headers: {
            "Authorization": authToken?.Authorization,
          },
        });
        return response;
      }
    }),
    fetchProduct: builder.mutation({
      async queryFn(patch, { getState }: any, _extraOptions, fetchWithBQ) {
        const authOdetails = getState()?.loginSlice?.token?.Response?.Auth1dot0;
        const authToken = getAuthHeader('product/get', 'POST', authOdetails,);
        const response = await fetchWithBQ({
          url: `product/get`,
          method: "POST",
          body: patch.patch,
          headers: {
            "Authorization": authToken?.Authorization,
          },
        });
        return response;
      }
    }),
    fetchIntents: builder.mutation({
      async queryFn(patch, { getState }: any, _extraOptions, fetchWithBQ) {
        const authOdetails = getState()?.loginSlice?.token?.Response?.Auth1dot0;
        const authToken = getAuthHeader('travelintent/get', 'POST', authOdetails,);
        const response = await fetchWithBQ({
          url: `travelintent/get`,
          method: "POST",
          body: patch.patch,
          headers: {
            "Authorization": authToken?.Authorization,
          },
        });
        return response;
      }
    }),
    editBudget: builder.mutation({
      async queryFn(patch, { getState }: any, _extraOptions, fetchWithBQ) {
        const authOdetails = getState()?.loginSlice?.token?.Response?.Auth1dot0;
        const authToken = getAuthHeader('budget/edit', 'POST', authOdetails,);
        const response = await fetchWithBQ({
          url: `budget/edit`,
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
  useFetchBudgetMutation,
  useFetchProductMutation,
  useFetchIntentsMutation,
  useEditBudgetMutation
} = musafirBudgetsApi;