/* eslint-disable @typescript-eslint/no-explicit-any */
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BaseURL, APIversion } from "../utility/config";
import { getAuthHeader } from "../utility/config/oAuth";

const objectToBase64 = (obj: any): string => {
  try {
    const jsonString = JSON.stringify(obj); // Convert to JSON string
    return btoa(jsonString); // Encode to base64 directly
  } catch (error) {
    console.error("Error encoding to Base64:", error);
    return "";
  }
};

const staticHeaderData = {
  TaasId: "67612bd9cd58ac147c2710bf",
  TmcId: "67612bd9cd59ac147c2710bf",
  OrganizationId: "67612bd9cd59ac14890710bf",
  OrganizationName: "Sample Organization",
  UserId: "user123",
  ProfileId: "67c56bacf5f1e77f59718083",
  EmailId: "user@example.com",
  FirstName: "John",
  LastName: "Doe",
  AccessLevel: "Admin",
  Scope: "Full",
};

export const musafirGroupTest = createApi({
  reducerPath: "musafirGroupTest",
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
      // const token = getState()?.loginSlice?.userLoginInfo?.auth?.accessToken;
      // if (token) {
      //   headers.set("authorization", `${token}`);
      // }
      // const encodedHeaders = objectToBase64(staticHeaderData);

      // if (encodedHeaders) {
      //   headers.set("X-Authorized-Identity", "eyJUYWFzSWQiOiI2N2EyZmNkM2FhMGI1ZjA2MTk2MzhjM2QiLCJUbWNJZCI6IjY3NjI2Y2JkYjYzYzY2YzRhYjI3MTBjNSIsIk9yZ2FuaXphdGlvbklkIjoiNjdiNDhjNTdjZmE5YThkYzIyYTJmYWY2IiwiT3JnYW5pemF0aW9uTmFtZSI6IlBhaSBtb2JpbGUiLCJVc2VySWQiOiI2Nzg4Yzg1NTI5MDI2ZDQzYzI5ZTNhMGYiLCJQcm9maWxlSWQiOiI2N2M1NmJhY2Y1ZjFlNzdmNTk3MTgwODMiLCJFbWFpbElkIjoic3VtYW50aEBtYWlsLmNvbSIsIkZpcnN0TmFtZSI6IkpvaG4iLCJMYXN0TmFtZSI6IkRvZSIsIkFjY2Vzc0xldmVsIjoiQWRtaW4iLCJTY29wZSI6IkZ1bGwifQ==");
      // }
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
    fetchGroupsTest: builder.mutation({
      async queryFn(patch, { getState }: any, _extraOptions, fetchWithBQ) {
        const authOdetails = getState()?.loginSlice?.token?.Response?.Auth1dot0;
        const authToken = getAuthHeader('platformsearch/groups', 'POST', authOdetails,);
        const response = await fetchWithBQ({
          url: `platformsearch/groups`,
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
  useFetchGroupsTestMutation
} = musafirGroupTest;