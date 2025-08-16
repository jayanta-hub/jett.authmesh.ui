import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BaseURL, APIversion } from "../utility/config/index";



export const musafirLookupApi = createApi({
    reducerPath: "musafirLookupApi",
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
        fetchCountry: builder.mutation({

            /**
             * Fetches the list of countries from the server.
             *
             * @returns {import("@reduxjs/toolkit/query/react").QueryDefinition<any, any, any>} The query definition.
             */
            query: (patch) => ({
                url: `country/countries`,
                method: "POST",
                body: patch
            }),
        }),

        fetchIndustry: builder.mutation({

            /**
             * Fetches the list of countries from the server.
             *
             * @returns {import("@reduxjs/toolkit/query/react").QueryDefinition<any, any, any>} The query definition.
             */
            query: (patch) => ({
                url: `industrytype/industrytypes`,
                method: "POST",
                body: patch
            }),
        }),

    }),
});


export const {
    useFetchCountryMutation,
    useFetchIndustryMutation
} = musafirLookupApi;