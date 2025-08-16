import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { APIversion, BaseURL } from "../utility/config";


export const musafirRolesApi = createApi({
  reducerPath: "musafirRolesApi",
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
   * Defines the endpoints for the API.
   *
   * @param {import("@reduxjs/toolkit/query/react").MutationBuilder} builder - The builder for creating mutations.
   * @returns {Record<string, import("@reduxjs/toolkit/query/react").MutationDefinition<any, any, any>>} The object containing defined endpoints.
   *
   * This includes:
   * - roles: A mutation for fetching roles by sending a POST request to the '/api/v1/role/Roles' endpoint with a request body.
   */
  endpoints: (builder) => ({
    roles: builder.mutation({

      /**
       * Fetches the roles from the server.
       *
       * @param {object} patch - The data to be sent in the request body.
       * @returns {object} The configuration for the API request, including the URL,
       *                   HTTP method, and request body.
       */
      query: (patch) => ({
        url: `role/roles`,
        method: "POST",
        body: patch,
      }),
    }),

    fetchRoleById: builder.mutation({
      /**
       * Fetches the role by role id from the server.
       *
       * @param {number} roleId - The id of the role to be fetched.
       * @returns {import("@reduxjs/toolkit/query/react").QueryDefinition<any, any, any>} The query definition.
       */
      query: (roleId) => ({
        url: `/role/role/${roleId}`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useRolesMutation,
  useFetchRoleByIdMutation
} = musafirRolesApi;