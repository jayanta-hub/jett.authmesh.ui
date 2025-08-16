import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { APIversion, BaseURL } from "../utility/config/index";
import { getAuthHeader } from "../utility/config/oAuth";

export const musafirApprovalApi = createApi({
  reducerPath: "musafirApprovalApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${BaseURL}${APIversion}`,
    prepareHeaders: (headers) => {
      // Set content type
      headers.set("Content-Type", "application/json");
      return headers;
    },
  }),
  /**
    * Defines the endpoints for the API.
    *
    * @param {import("@reduxjs/toolkit/query/react").MutationBuilder} builder - The builder for the mutation.
    * @returns {Record<string, import("@reduxjs/toolkit/query/react").MutationDefinition<any, any, any>>} The endpoints.
    */
  endpoints: (builder) => ({


    // fetchAirport: builder.query({
    //     /**
    //      * Fetches the list of Airports using a POST request with a structured body.
    //      *
    //      * @returns {import("@reduxjs/toolkit/query/react").QueryDefinition<any, any, any>} The query definition.
    //      */
    //     query: ({ context, request }) => ({
    //         url: `flight/search/airports`, // No query parameters
    //         method: 'POST',
    //         body: {
    //             Context: context,
    //             Request: request,
    //         },
    //         headers: {
    //             'Content-Type': 'application/json',
    //         },
    //     }),
    // }),
    // In your API slice file
    createApprovalWorkflow: builder.mutation({
      async queryFn(patch, { getState }: any, _extraOptions, fetchWithBQ) {
        const authOdetails = getState()?.loginSlice?.token?.Response?.Auth1dot0;
        const authToken = getAuthHeader('workflow/create', 'POST', authOdetails,);
        const response = await fetchWithBQ({
          url: `workflow/create`,
          method: "POST",
          body: patch,
          headers: {
            "Authorization": authToken?.Authorization,
          },
        });
        return response;
      }
    }),
    fetchWorkflowList: builder.mutation({
      async queryFn(patch, { getState }: any, _extraOptions, fetchWithBQ) {
        const authOdetails = getState()?.loginSlice?.token?.Response?.Auth1dot0;
        const authToken = getAuthHeader('workflow/list', 'POST', authOdetails,);
        const response = await fetchWithBQ({
          url: `workflow/list`,
          method: "POST",
          body: patch,
          headers: {
            "Authorization": authToken?.Authorization,
          },
        });
        return response;
      }
    }),
    fetchWorkflowListById: builder.mutation({
      async queryFn(patch, { getState }: any, _extraOptions, fetchWithBQ) {
        const authOdetails = getState()?.loginSlice?.token?.Response?.Auth1dot0;
        const authToken = getAuthHeader('workflow/get', 'POST', authOdetails,);
        const response = await fetchWithBQ({
          url: `workflow/get`,
          method: "POST",
          body: patch,
          headers: {
            "Authorization": authToken?.Authorization,
          },
        });
        return response;
      }
    }),
    editWorkflowListById: builder.mutation({
      async queryFn(patch, { getState }: any, _extraOptions, fetchWithBQ) {
        const authOdetails = getState()?.loginSlice?.token?.Response?.Auth1dot0;
        const authToken = getAuthHeader('workflow/edit', 'POST', authOdetails,);
        const response = await fetchWithBQ({
          url: `workflow/edit`,
          method: "POST",
          body: patch,
          headers: {
            "Authorization": authToken?.Authorization,
          },
        });
        return response;
      }
    }),
    deleteWorkflowListById: builder.mutation({
      async queryFn(patch, { getState }: any, _extraOptions, fetchWithBQ) {
        const authOdetails = getState()?.loginSlice?.token?.Response?.Auth1dot0;
        const authToken = getAuthHeader('workflow/delete', 'POST', authOdetails,);
        const response = await fetchWithBQ({
          url: `workflow/delete`,
          method: "POST",
          body: patch,
          headers: {
            "Authorization": authToken?.Authorization,
          },
        });
        return response;
      }
    }),
    toggleWorkflowStatusApi: builder.mutation({
      async queryFn(patch, { getState }: any, _extraOptions, fetchWithBQ) {
        const authOdetails = getState()?.loginSlice?.token?.Response?.Auth1dot0;
        const authToken = getAuthHeader('workflow/isenable', 'POST', authOdetails,);
        const response = await fetchWithBQ({
          url: `workflow/isenable`,
          method: "POST",
          body: patch,
          headers: {
            "Authorization": authToken?.Authorization,
          },
        });
        return response;
      }
    }),
    tagCountApi: builder.mutation({
      async queryFn(patch, { getState }: any, _extraOptions, fetchWithBQ) {
        const authOdetails = getState()?.loginSlice?.token?.Response?.Auth1dot0;
        const authToken = getAuthHeader('platformsearch/profiles/count/bytags', 'POST', authOdetails,);
        const response = await fetchWithBQ({
          url: `platformsearch/profiles/count/bytags`,
          method: "POST",
          body: patch,
          headers: {
            "Authorization": authToken?.Authorization,
          },
        });
        return response;
      }
    }),
    // Add status update for workflow (active, inactive, archived)
    statusUpdateWorkflow: builder.mutation({
      async queryFn(patch, { getState }: any, _extraOptions, fetchWithBQ) {
        const authOdetails = getState()?.loginSlice?.token?.Response?.Auth1dot0;
        const authToken = getAuthHeader('workflow/statusupdate', 'POST', authOdetails,);
        const response = await fetchWithBQ({
          url: `workflow/statusupdate`,
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
  useCreateApprovalWorkflowMutation,
  useFetchWorkflowListMutation,
  useFetchWorkflowListByIdMutation,
  useEditWorkflowListByIdMutation,
  useDeleteWorkflowListByIdMutation,
  useToggleWorkflowStatusApiMutation,
  useTagCountApiMutation,
  useStatusUpdateWorkflowMutation // Export the new mutation hook
} = musafirApprovalApi;