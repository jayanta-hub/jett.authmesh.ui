import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { APIversion, BaseURL } from "../utility/config";
import { getAuthHeader } from "../utility/config/oAuth";

export const musafirFlightListApi = createApi({
    reducerPath: "musafirFlightListApi",
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
        fetchFlightList: builder.mutation({

            /**
             * Fetches the list of countries from the server.
             *
             * @returns {import("@reduxjs/toolkit/query/react").QueryDefinition<any, any, any>} The query definition.
             */
            async queryFn(patch, { getState }: any, _extraOptions, fetchWithBQ) {
                const authOdetails = getState()?.loginSlice?.token?.Response?.Auth1dot0;
                const authToken = getAuthHeader(`meta/flight/list/request`, 'POST', authOdetails,);
                const response = await fetchWithBQ({
                    url: `meta/flight/list/request`,
                    method: "POST",
                    body: patch,
                    headers: {
                        "Authorization": authToken?.Authorization,
                    },
                });
                return response;
            }
        }),

        fetchFlightListResult: builder.mutation({

            /**
             * Fetches the list of countries from the server.
             *
             * @returns {import("@reduxjs/toolkit/query/react").QueryDefinition<any, any, any>} The query definition.
             */
            async queryFn(patch, { getState }: any, _extraOptions, fetchWithBQ) {
                const authOdetails = getState()?.loginSlice?.token?.Response?.Auth1dot0;
                const authToken = getAuthHeader(`meta/flight/list/result`, 'POST', authOdetails,);
                const response = await fetchWithBQ({
                    url: `meta/flight/list/result`,
                    method: "POST",
                    body: patch,
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
    useFetchFlightListMutation,
    useFetchFlightListResultMutation
} = musafirFlightListApi;