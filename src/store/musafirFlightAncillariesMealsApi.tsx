import { createApi, fetchBaseQuery, RootState } from "@reduxjs/toolkit/query/react";
import { BaseURL, APIversion } from "../utility/config";
import { getAuthHeader } from "../utility/config/oAuth";

export const musafirFlightAncillariesMealsApi = createApi({
    reducerPath: "musafirFlightAncillariesMealsApi",
    baseQuery: fetchBaseQuery({
        baseUrl: `${BaseURL}${APIversion}`
    }),
    endpoints: (builder) => ({
        flightAncillariesMealsApi: builder.mutation({
            async queryFn(patch, { getState }: any, _extraOptions, fetchWithBQ) {
                const authOdetails = getState()?.loginSlice?.token?.Response?.Auth1dot0;
                const authToken = getAuthHeader('meta/flight/ancillary/meals', 'POST', authOdetails,);
                const response = await fetchWithBQ({
                    url: `meta/flight/ancillary/meals`,
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

export const { useFlightAncillariesMealsApiMutation } = musafirFlightAncillariesMealsApi;

