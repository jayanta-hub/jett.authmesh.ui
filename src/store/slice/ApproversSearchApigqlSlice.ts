import { gql } from "@apollo/client";
import { createApi } from "@reduxjs/toolkit/query/react";
import ApproversSearchAutoCompleteApiclient from "../ApproversSearchAutoCompleteApiclient";

// Define the GraphQL query
const AUTO_COMPLETE_GRAPH_QUERY = gql`
  query AutoCompleteApproversSearch($SearchKey: String!) {
    AutoCompleteApproversSearch(
      Request: {
        Context: {
          UserAgent: "Mozilla/5.0"
          TrackingId: "de2ade5e6a0b4c75b44ab079f4f0b0cb"
          TransactionId: "3ddf1ed3414146e684c236b69a477b7d"
          IpAddress: "192.168.1.1"
          CountryCode: "IN"
        }
        Request: {
          SearchKey: $SearchKey
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

// Create API slice using createApi but call Apollo Client manually
export const approversSearchAutoCompletegqlReducerApi = createApi({
  reducerPath: "approversSearchAutoCompletegqlReducerApi",
  baseQuery: async ({ query, variables }, { getState }) => {
    try {
     const authOdetails = getState()?.loginSlice?.token?.Response?.Auth1dot0;
      const { data } = await ApproversSearchAutoCompleteApiclient(authOdetails).query({
        query,
        variables,
      });
      return { data };
    } catch (error: any) {
      return {
        error: {
          status: "CUSTOM_GRAPHQL_ERROR",
          message: error.message,
        },
      };
    }
  },
  endpoints: (builder) => ({
    getApproversSearchAutoCompleteGraph: builder.query({
      query: (args) => ({
        query: AUTO_COMPLETE_GRAPH_QUERY,
        variables: { SearchKey: args.text },
      }),
    }),
  }),
});

// Export the hook for components to use
export const {
  useGetApproversSearchAutoCompleteGraphQuery,
  useLazyGetApproversSearchAutoCompleteGraphQuery,
} = approversSearchAutoCompletegqlReducerApi; // Hook names
