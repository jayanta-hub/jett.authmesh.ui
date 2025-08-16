/* eslint-disable @typescript-eslint/no-explicit-any */
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { APIversion, BaseURL } from "../utility/config";


export const musafirUserApi = createApi({
  reducerPath: "musafirUserApi",
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
    fetchUsers: builder.mutation({
        query: ({ patch }) => ({
          url: `user/userlist`,
          method: "POST",
          body: patch,
        }),
      }),
      updateUsers: builder.mutation({
        query: ({ patch }) => ({
          url: `user/edituser`,
          method: "PUT",
          body: patch,
        }),
      }),
      addUser: builder.mutation({
        /**
         * Adds a user by sending a POST request to the '/api/v1/user/AddUser' endpoint with a request body.
         *
         * @param {object} patch - The data to be sent in the request body.
         * @returns {object} The configuration for the API request, including the URL, HTTP method, and request body.
         */
        query: ({ patch }) => ({
          url: `user/adduser`,
          method: "POST",
          body: patch,
        }),
      }),
      deleteUser: builder.mutation({
        /**
         * Deletes a user by sending a DELETE request to the '/api/v1/user/:id' endpoint.
         *
         * @param {object} id - The ID of the user to be deleted.
         * @returns {object} The configuration for the API request, including the URL, HTTP method, and request body.
         */
        query: ({ id }) => ({
          url: `user/${id}`,
          method: "DELETE",
          body: {}
        }),
      }),
  
  }),
});


export const {
  useFetchUsersMutation,
  useUpdateUsersMutation,
  useAddUserMutation,
  useDeleteUserMutation,
} = musafirUserApi;