/* eslint-disable @typescript-eslint/no-explicit-any */
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { APIversion, BaseURL } from "../utility/config";
import { getAuthHeader } from "../utility/config/oAuth";


export const musafirPaymentApi = createApi({
    reducerPath: "musafirPaymentApi",
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
            headers.set("OrganizationId", "67626ef1b63c66c4ab2710c6");
            headers.set("Scope", "ORG");
            return headers;
        },
    }),

    /**
     * Defines the endpoints for the API.
     *
     * @param {import("@reduxjs/toolkit/query/react").MutationBuilder} builder - The builder for creating mutations.
     * @returns {Record<string, import("@reduxjs/toolkit/query/react").MutationDefinition<any, any, any>>} The endpoints.
     *
     * This includes:
     * - tokenize: A mutation for fetching a payment token from the server.
     * - fetchMarketById: A mutation for fetching market data by market id from the server.
     */
    endpoints: (builder) => ({
        tokenize: builder.mutation({
            async queryFn(patch, { getState }: any, _extraOptions, fetchWithBQ) {
                const authOdetails = getState()?.loginSlice?.token?.Response?.Auth1dot0;
                const authToken = getAuthHeader('payment/tokenize', 'POST', authOdetails,);
                const response = await fetchWithBQ({
                    url: `payment/tokenize`,
                    method: "POST",
                    body: patch,
                    headers: {
                        "Authorization": authToken?.Authorization,
                    },
                });
                return response;
            }
        }),

        getSubscriptionDetails: builder.mutation({
            /**
             * Fetches the market data by market id from the server.
             *
             * @param {number} marketId - The id of the market to be fetched.
             * @returns {import("@reduxjs/toolkit/query/react").QueryDefinition<any, any, any>} The query definition.
             */
            async queryFn(patch, { getState }: any, _extraOptions, fetchWithBQ) {
                const authOdetails = getState()?.loginSlice?.token?.Response?.Auth1dot0;
                const authToken = getAuthHeader(`payment/getsubscriptiondetails`, 'POST', authOdetails,);
                const response = await fetchWithBQ({
                    url: `payment/getsubscriptiondetails`,
                    method: "POST",
                    body: patch,
                    headers: {
                        "Authorization": authToken?.Authorization,
                    },
                });
                return response;
            }
        }),
        viewPaymentDetails: builder.mutation({
            async queryFn(patch, { getState }: any, _extraOptions, fetchWithBQ) {
                const authOdetails = getState()?.loginSlice?.token?.Response?.Auth1dot0;
                const authToken = getAuthHeader(`paymenttokenization/viewpayment/${patch}`, 'GET', authOdetails,);
                const response = await fetchWithBQ({
                    url: `paymenttokenization/viewpayment/${patch}`,
                    method: "GET",
                    headers: {
                        "Authorization": authToken?.Authorization,
                    },
                });
                return response;
            }
        }),
        encryptData: builder.mutation({
            async queryFn(patch, { getState }: any, _extraOptions, fetchWithBQ) {
                const authOdetails = getState()?.loginSlice?.token?.Response?.Auth1dot0;
                const authToken = getAuthHeader(`paymentprocessing/test_encryptdata`, 'POST', authOdetails,);
                const response = await fetchWithBQ({
                    url: `paymentprocessing/test_encryptdata`,
                    method: "POST",
                    body: patch,
                    headers: {
                        "Authorization": authToken?.Authorization,
                    },
                });
                return response;
            }
        }),
        processPayment: builder.mutation({
            async queryFn(patch, { getState }: any, _extraOptions, fetchWithBQ) {
                const authOdetails = getState()?.loginSlice?.token?.Response?.Auth1dot0;
                const authToken = getAuthHeader(`paymentprocessing/processpayment`, 'POST', authOdetails,);
                const response = await fetchWithBQ({
                    url: `paymentprocessing/processpayment`,
                    method: "POST",
                    body: patch,
                    headers: {
                        "Authorization": authToken?.Authorization,
                    },
                });
                return response;
            }
        }),
        getFlightAvailability: builder.mutation({
            async queryFn(patch, { getState }: any, _extraOptions, fetchWithBQ) {
                const authOdetails = getState()?.loginSlice?.token?.Response?.Auth1dot0;
                const authToken = getAuthHeader(`meta/flight/availability`, 'POST', authOdetails,);
                const response = await fetchWithBQ({
                    url: `meta/flight/availability`,
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
    useTokenizeMutation,
    useGetSubscriptionDetailsMutation,
    useViewPaymentDetailsMutation,
    useEncryptDataMutation,
    useProcessPaymentMutation,
    useGetFlightAvailabilityMutation
} = musafirPaymentApi;