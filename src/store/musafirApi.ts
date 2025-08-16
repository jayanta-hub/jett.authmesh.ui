/* eslint-disable @typescript-eslint/no-explicit-any */
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BaseURL, APIversion } from "../utility/config";

export const musafirApi = createApi({
  reducerPath: "musafirApi",
  
  baseQuery: fetchBaseQuery({
    baseUrl: `${BaseURL}${APIversion}`,
    
  /**
   * If we have a token set in state, let's assume that we should be passing it.
   * in the Authorization header.
   *
   * @param {Headers} headers - The headers we're going to mutate and return.
   * @param {{ getState: () => any }} api - The api object.
   * @returns {Headers} The mutated headers.
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
   * @param {import("@reduxjs/toolkit/query/react").MutationBuilder} builder - The builder for the mutation.
   * @returns {Record<string, import("@reduxjs/toolkit/query/react").MutationDefinition<any, any, any>>} The endpoints.
   */
  endpoints: (builder) => ({
    fetchUsers: builder.mutation({
      query: ({ patch }) => ({
        url: `user/users`,
        method: "POST",
        body: patch,
      }),
    }),
  }),
});

export const {
  useFetchUsersMutation,
} = musafirApi;