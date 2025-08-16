/* eslint-disable @typescript-eslint/no-explicit-any */
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BaseURL, APIversion } from "../utility/config";


export const musafirNotificationApi = createApi({
  reducerPath: "musafirNotificationApi",
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
    createEmailTemplate: builder.mutation({
        query: ({ patch }) => ({
          url: `notification/addemailtemplate`,
          method: "POST",
          body: patch,
        }),
      }),
      fetchEmailTemplates: builder.mutation({
        query: ({ patch }) => ({
          url: `notification/emailtemplates`,
          method: "POST",
          body: patch,
        }),
      }),
  }),
});


export const {
  useCreateEmailTemplateMutation,useFetchEmailTemplatesMutation
} = musafirNotificationApi;