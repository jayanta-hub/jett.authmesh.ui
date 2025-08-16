import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { APIversion, BaseURL } from "../utility/config";
import { getAuthHeader } from "../utility/config/oAuth";


export const musafirFlightAncillariesSeatsApi = createApi({
    reducerPath: "musafirFlightAncillariesSeatsApi",
    baseQuery: fetchBaseQuery({
        baseUrl: `${BaseURL}${APIversion}`
    }),
    endpoints: (builder) => ({
        flightAncillariesSeatsApi: builder.mutation({
            async queryFn(patch, { getState }: any, _extraOptions, fetchWithBQ) {
                const authOdetails = getState()?.loginSlice?.token?.Response?.Auth1dot0;
                const authToken = getAuthHeader('meta/flight/ancillary/seats', 'POST', authOdetails,);
                const response = await fetchWithBQ({
                    url: `meta/flight/ancillary/seats`,
                    method: "POST",
                    body: patch,
                    headers: {
                        "Authorization": authToken?.Authorization,
                    },
                });
                return response;
            }
        })
    }),
});

export const { useFlightAncillariesSeatsApiMutation } = musafirFlightAncillariesSeatsApi;

