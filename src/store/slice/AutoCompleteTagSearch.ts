import { createApi } from "@reduxjs/toolkit/query/react";
import { gql } from "@apollo/client";
import AutoCompleteApiTags from "./AutoCompleteApiTags";


const AUTO_COMPLETE_TAG_SEARCH = gql`
  query AutoCompleteTagSearchFilter($searchKey: String!) {
    AutoCompleteTagSearchFilter(
        Request: {
            Context: {
                UserAgent: "Mozilla/5.0"
                TrackingId: "de2ade5e6a0b4c75b44ab079f4f0b0cb"
                TransactionId: "3ddf1ed3414146e684c236b69a477b7d"
                IpAddress: "192.168.1.1"
                CountryCode: "IN"
            }
            Request: { 
                SearchKey: $searchKey, 
                TagCount: 10, 
                GroupCount: 10 
            }
        }
    ) {
        Context {
            StatusCode
            TrackingId
            Message
            TransactionId
        }
        Response {
            Tags {
                Id
                Name
            }
            Groups {
                Id
                Name
            }
        }
    }
}`


export const tagReducerApi = createApi({
  reducerPath: "tagReducerApi",
  baseQuery: async ({ query, variables }, { getState }) => {
    try {
     const authOdetails = getState()?.loginSlice?.token?.Response?.Auth1dot0;
      const { data } = await AutoCompleteApiTags(authOdetails).query({
        query,
        variables,
      });
      return { data };
    } catch (error) {
      return { error: { status: "CUSTOM_GRAPHQL_ERROR", message: error.message } };
    }
  },
  endpoints: (builder) => ({
    getAutoCompleteTagSearch: builder.query({
      query: (args) => ({
        query: AUTO_COMPLETE_TAG_SEARCH,
        variables: { searchKey: args.searchKey },
      }),
    }),
  }),
});

// Export the hook to call in components
export const { useGetAutoCompleteTagSearchQuery } = tagReducerApi;
 