import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { APIversion, BaseURL } from "../utility/config/index";



export const musafirOrgApi = createApi({
    reducerPath: "musafirOrgApi",
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
      * @param {import("@reduxjs/toolkit/query/react").MutationBuilder} builder - The builder for the mutation.
      * @returns {Record<string, import("@reduxjs/toolkit/query/react").MutationDefinition<any, any, any>>} The endpoints.
      */
    endpoints: (builder) => ({
        postOrg: builder.mutation({

            /**
             * Fetches the list of countries from the server.
             *
             * @returns {import("@reduxjs/toolkit/query/react").QueryDefinition<any, any, any>} The query definition.
             */
            query: (patch) => ({
                url: `organizationentity`,
                method: "POST",
                body: patch
            }),
        }),
        postFinanceMangerDetails: builder.mutation({

/**
 * Sends a POST request to create or update finance manager details.
 *
 * @param {object} patch - The data to be sent in the request body.
 * @returns {import("@reduxjs/toolkit/query/react").QueryDefinition<any, any, any>} The query definition.
 */
            query: (patch) => ({
                url: `organizationentity/financemanager`,
                method: "POST",
                body: patch
            }),
        }),
        postTravelMangerDetails: builder.mutation({

/**
 * Sends a POST request to create or update travel manager details.
 *
 * @param {object} patch - The data to be sent in the request body.
 * @returns {import("@reduxjs/toolkit/query/react").QueryDefinition<any, any, any>} The query definition.
 */
            query: (patch) => ({
                url: `organizationentity/travelmanager`,
                method: "POST",
                body: patch
            }),
        }),


    }),
});


export const {
    usePostOrgMutation,
    usePostFinanceMangerDetailsMutation,
    usePostTravelMangerDetailsMutation
} = musafirOrgApi;