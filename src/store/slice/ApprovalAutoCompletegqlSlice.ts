import { createApi } from "@reduxjs/toolkit/query/react";
import { gql } from "@apollo/client";
import AutoCompleteApiclient from "../AutoCompleteApiclient";

// Create API Slice using createApi but call Apollo Client manually
const AUTO_COMPLETE_TRIP_SEARCH = gql`
 query AutoCompleteApproversSearch($searchKey: String!) {
    AutoCompleteApproversSearch(
        Request: {
            Context: {
                UserAgent: "Mozilla/5.0",
                TrackingId: "de2ade5e6a0b4c75b44ab079f4f0b0cb",
                TransactionId: "3ddf1ed3414146e684c236b69a477b7d",
                IpAddress: "192.168.1.1",
                CountryCode: "IN"
        }
            Request: {
                SearchKey: $searchKey
                ProfileCount: 10
                PredefinedTagCount: 10
                CustomTagCount: 10
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
            Profiles {
                Id
                FirstName
                MiddleName
                LastName
            }
            PredefinedTags {
                Id
                Name
                Values {
    Id
    Name
                }
            }
            CustomTags {
                Id
                Name
      Values {
    Id
    Name
                }
            }
        }
    }
}
`;

export const tripReducerApi = createApi({
  reducerPath: "tripReducerApi",
  baseQuery: async ({ query, variables }, { getState }) => {
    try {
      const authOdetails = getState()?.loginSlice?.token?.Response?.Auth1dot0;
      const { data } = await AutoCompleteApiclient(authOdetails).query({
        query,
        variables,
      });
      return { data };
    } catch (error) {
      return { error: { status: "CUSTOM_GRAPHQL_ERROR", message: (error as Error).message } };
    }
  },

  endpoints: (builder) => ({
    getAutoCompleteTripSearch: builder.query({
      query: (args) => ({
        query: AUTO_COMPLETE_TRIP_SEARCH,
        variables: { searchKey: args.searchKey },
      }),
    }),
  }),
});

// Export the hook to call in components
export const { useGetAutoCompleteTripSearchQuery } = tripReducerApi;
