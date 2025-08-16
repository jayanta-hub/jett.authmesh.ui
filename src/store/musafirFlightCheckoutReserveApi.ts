//musafirFlightCheckoutReserveApi.ts
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { APIversion, BaseURL } from "../utility/config";
import { getAuthHeader } from "../utility/config/oAuth";

export const musafirFlightCheckoutReserveApi = createApi({
    reducerPath: "musafirFlightCheckoutReserveApi",
    baseQuery: fetchBaseQuery({
        baseUrl: `${BaseURL}${APIversion}`
    }),

    endpoints: (builder) => ({
        flightCheckoutReserve: builder.mutation({
            async queryFn(patch, { getState }: any, _extraOptions, fetchWithBQ) {
                const authOdetails = getState()?.loginSlice?.token?.Response?.Auth1dot0;
                const authToken = getAuthHeader('meta/flight/reserve', 'POST', authOdetails,);
                const response = await fetchWithBQ({
                    url: `meta/flight/reserve`,
                    method: "POST",
                    body: patch,
                    headers: {
                        "Authorization": authToken?.Authorization,
                    },
                });
                return response;
            }
        }),
        flightAncillaryReserve: builder.mutation({
            async queryFn(patch, { getState }: any, _extraOptions, fetchWithBQ) {
                const authOdetails = getState()?.loginSlice?.token?.Response?.Auth1dot0;
                const authToken = getAuthHeader('meta/flight/ancillary/reserve', 'POST', authOdetails,);
                const response = await fetchWithBQ({
                    url: `meta/flight/ancillary/reserve`,
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
    useFlightCheckoutReserveMutation,
    useFlightAncillaryReserveMutation
} = musafirFlightCheckoutReserveApi;