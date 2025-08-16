// import { createApi } from "@reduxjs/toolkit/query/react";
// import { gql } from "@apollo/client";
// import client from "../../utility/apolloClient";


// const AUTO_COMPLETE_TRIP_SEARCH = gql
//   query AutoCompleteTripSearch($searchKey: String!) {
//     AutoCompleteTripSearch(
//       Request: {
//         Context: {
//           UserAgent: "Mozilla/5.0"
//           TrackingId: "da865192-197d-4c63-aaa6-568f6001abf6"
//           TransactionId: "dd2445d9-bfb2-48c6-9311-cfbba3c32375"
//           CountryCode: "IN"
//           IpAddress: "192.168.1.1"
//         }
//         Request: {
//           SearchKey: $searchKey
//           ProfilesCount: 10
//           OrganizationCount: 10
//           TripCount: 2
//         }
//       }
//     ) {
//       Context {
//         StatusCode
//         TrackingId
//         Message
//         Tte
//         TransactionId
//       }
//       Response {
//         Profiles {
//           TotalCount
//           Items {
//             Id
//             Name
//           }
//         }
//         Trips {
//           TotalCount
//           Items {
//             Id
//             TripId
//             Name
//           }
//         }
//         Organizations {
//           TotalCount
//           Items {
//             Name
//           }
//         }
//       }
//     }
//   }
// ;
 
// // Create API Slice using createApi but call Apollo Client manually
// export const tripReducerApi = createApi({
//   reducerPath: "tripReducerApi",
//   baseQuery: async ({ query, variables }) => {
//     try {
//       const { data } = await client.query({
//         query,
//         variables,
//       });
//       return { data };
//     } catch (error) {
//       return { error: { status: "CUSTOM_GRAPHQL_ERROR", message: error.message } };
//     }
//   },
//   endpoints: (builder) => ({
//     getAutoCompleteTripSearch: builder.query({
//       query: (args) => ({
//         query: AUTO_COMPLETE_TRIP_SEARCH,
//         variables: { searchKey: args.searchKey  },
//       }),
//     }),
//   }),
// });
 
// // Export the hook to call in components
// export const { useGetAutoCompleteTripSearchQuery } = tripReducerApi;


