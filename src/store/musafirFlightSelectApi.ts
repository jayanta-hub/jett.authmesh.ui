//MusafirFlightSelectApi.ts
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { APIversion, BaseURL } from "../utility/config";
import { getAuthHeader } from "../utility/config/oAuth";

export const musafirFlightSelectApi = createApi({
    reducerPath: "musafirFlightSelectApi",
    baseQuery: fetchBaseQuery({
        baseUrl: `${BaseURL}${APIversion}`
    }),

    endpoints: (builder) => ({
        flightSelectAdd: builder.mutation({
            async queryFn(patch, { getState }: any, _extraOptions, fetchWithBQ) {
                const authOdetails = getState()?.loginSlice?.token?.Response?.Auth1dot0;
                const authToken = getAuthHeader(`meta/flight/select/add`, 'POST', authOdetails,);
                const response = await fetchWithBQ({
                    url: `meta/flight/select/add`,
                    method: "POST",
                    body: patch,
                    headers: {
                        "Authorization": authToken?.Authorization,
                    },
                });
                return response;
            }
        }),
        flightSelectGet: builder.mutation({
            async queryFn(patch, { getState }: any, _extraOptions, fetchWithBQ) {
                const authOdetails = getState()?.loginSlice?.token?.Response?.Auth1dot0;
                const authToken = getAuthHeader(`meta/flight/select/get`, 'POST', authOdetails,);
                const response = await fetchWithBQ({
                    url: `meta/flight/select/get`,
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
    useFlightSelectAddMutation,
    useFlightSelectGetMutation
} = musafirFlightSelectApi;