//musafirFlightBookingDetailsApi.ts
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { APIversion, BaseURL } from "../utility/config";
import { getAuthHeader } from "../utility/config/oAuth";

export const musafirFlightBookingDetailsApi = createApi({
    reducerPath: "musafirFlightBookingDetailsApi",
    baseQuery: fetchBaseQuery({
        baseUrl: `${BaseURL}${APIversion}`
    }),

    endpoints: (builder) => ({
        flightBookingDetails: builder.mutation({
            async queryFn(patch, { getState }: any, _extraOptions, fetchWithBQ) {
                const authOdetails = getState()?.loginSlice?.token?.Response?.Auth1dot0;
                const authToken = getAuthHeader('meta/flight/book', 'POST', authOdetails,);
                const response = await fetchWithBQ({
                    url: `meta/flight/book`,
                    method: "POST",
                    body: patch,
                    headers: {
                        "Authorization": authToken?.Authorization,
                    },
                });
                return response;
            }
        }),
        flightAncillariesBookingDetails: builder.mutation({
            async queryFn(patch, { getState }: any, _extraOptions, fetchWithBQ) {
                const authOdetails = getState()?.loginSlice?.token?.Response?.Auth1dot0;
                const authToken = getAuthHeader('meta/flight/bookingdetail', 'POST', authOdetails,);
                const response = await fetchWithBQ({
                    url: `meta/flight/bookingdetail`,
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
    useFlightBookingDetailsMutation,
    useFlightAncillariesBookingDetailsMutation
} = musafirFlightBookingDetailsApi;