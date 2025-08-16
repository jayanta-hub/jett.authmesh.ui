// musafirFlightAncillariesBaggagesApi

//musafirAncillariesBaggageApi.ts
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { APIversion, BaseURL } from "../utility/config";
import { getAuthHeader } from "../utility/config/oAuth";

export const musafirAncillariesBaggageApi = createApi({
    reducerPath: "musafirAncillariesBaggageApi",
    baseQuery: fetchBaseQuery({
        baseUrl: `${BaseURL}${APIversion}`
    }),

    endpoints: (builder) => ({
        flightAncillariesBaggageApi: builder.mutation({
            async queryFn(patch, { getState }: any, _extraOptions, fetchWithBQ) {
                const authOdetails = getState()?.loginSlice?.token?.Response?.Auth1dot0;
                const authToken = getAuthHeader('meta/flight/ancillary/baggages', 'POST', authOdetails,);
                const response = await fetchWithBQ({
                    url: `meta/flight/ancillary/baggages`,
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
    useFlightAncillariesBaggageApiMutation
} = musafirAncillariesBaggageApi
