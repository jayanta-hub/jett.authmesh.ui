/* eslint-disable @typescript-eslint/no-explicit-any */
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BaseURL, APIversion } from "../utility/config";


export const musafirAclApi = createApi({
    reducerPath: "musafirAclApi",

    baseQuery: fetchBaseQuery({
         baseUrl: `${BaseURL}${APIversion}`,
        /**
         * If we have a token set in state, let's assume that we should be passing it.
         * in the Authorization header.
         *
         * @param {Headers} headers - The headers we're going to mutate and return.
         * @param {{ getState: () => any }} api - The api object.
         * @returns {Headers} The mutated headers.
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
     *
     * This includes:
     * - fetchACL: A mutation for fetching ACL data from the server.
     * - fetchACLById: A mutation for fetching ACL data by ID from the server.
     */
    endpoints: (builder) => ({

        fetchACL: builder.mutation({
            /**
             * Fetches the ACL data from the server.
             *
             * @param {object} patch - The data to be sent in the request body.
             * @returns {object} The configuration for the API request, including the URL,
             *                   HTTP method, and request body.
             */

            query: (patch) => ({
                url: `acl/accesscontrols`,
                method: "POST",
                body: patch,
            }),
        }),

        fetchACLById: builder.mutation({
            /**
             * Fetches the ACL data by ID from the server.
             *
             * @param {string} aclId - The ID of the ACL to be fetched.
             * @returns {object} The configuration for the API request, including the URL,
             *                   HTTP method, and request body.
             */
            query: (aclId) => ({
                url: `/acl/accesscontrol/${aclId}`,
                method: "GET",
            }),
        }),
    }),
});

export const {
    useFetchACLMutation,
    useFetchACLByIdMutation
} = musafirAclApi;