import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BaseURL, APIversion } from "../utility/config/index";
import { getAuthHeader } from "../utility/config/oAuth";
import { GetPricingPolicyByIdPayload, GetPricingPolicyByIdResponse, FetchSupplierDataResponse, StatusUpdateReponse, StatusUpdatePayload, PolicyExportPayload, PolicyExportReponse, PPListResponse, PPListPayload} from "../utility/types/pricing-policy/PricingPolicy";

export const musafirPricingPolicyApi = createApi({
  reducerPath: "musafirPricingPolicyApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${BaseURL}${APIversion}`,
    prepareHeaders: (headers) => {
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
    fetchSupplierData: builder.query<FetchSupplierDataResponse, void>({
      async queryFn(patch, { getState }: any, _extraOptions, fetchWithBQ) {
        const authOdetails = getState()?.loginSlice?.token?.Response?.Auth1dot0;
        const authToken = getAuthHeader('flight/meta/suppliers/get?marketcode=ae', 'GET', authOdetails,);
        const response = await fetchWithBQ({
          url: `flight/meta/suppliers/get?marketcode=ae`,
          method: "GET",
          body: patch,
          headers: {
            "Authorization": authToken?.Authorization,
          },
        });
        return { data: response.data as FetchSupplierDataResponse }
      }
    }),
    fetchPricingPolicyList: builder.mutation<PPListResponse, PPListPayload>({
      async queryFn(patch, { getState }: any, _extraOptions, fetchWithBQ) {
        const authOdetails = getState()?.loginSlice?.token?.Response?.Auth1dot0;
        const authToken = getAuthHeader('pricingpolicy/list', 'POST', authOdetails,);
        const response = await fetchWithBQ({
          url: `pricingpolicy/list`,
          method: "POST",
          body: patch,
          headers: {
            "Authorization": authToken?.Authorization,
          },
        });
         return { data: response.data as PPListResponse }
      }
    }),
    createPricingPolicy: builder.mutation({
      async queryFn(patch, { getState }: any, _extraOptions, fetchWithBQ) {
        const authOdetails = getState()?.loginSlice?.token?.Response?.Auth1dot0;
        const authToken = getAuthHeader('pricingpolicy/create', 'POST', authOdetails,);
        const response = await fetchWithBQ({
          url: `pricingpolicy/create`,
          method: "POST",
          body: patch,
          headers: {
            "Authorization": authToken?.Authorization,
          },
        });
        return response;
      }
    }),
    statusUpdatePricingPolicy: builder.mutation<StatusUpdateReponse, StatusUpdatePayload> ({
      async queryFn(patch, { getState }: any, _extraOptions, fetchWithBQ) {
        const authOdetails = getState()?.loginSlice?.token?.Response?.Auth1dot0;
        const authToken = getAuthHeader('pricingpolicy/statusupdate', 'POST', authOdetails,);
        const response = await fetchWithBQ({
          url: `pricingpolicy/statusupdate`,
          method: "POST",
          body: patch,
          headers: {
            "Authorization": authToken?.Authorization,
          },
        });
        return { data: response.data as StatusUpdateReponse }
      }
    }),
    exportPricingPolicy: builder.mutation<PolicyExportReponse, PolicyExportPayload>({
      async queryFn(patch, { getState }: any, _extraOptions, fetchWithBQ) {
        const authOdetails = getState()?.loginSlice?.token?.Response?.Auth1dot0;
        const authToken = getAuthHeader('pricingpolicy/export', 'POST', authOdetails,);
        const response = await fetchWithBQ({
          url: `pricingpolicy/export`,
          method: "POST",
          body: patch,
          headers: {
            "Authorization": authToken?.Authorization,
          },
        });
        return { data: response.data as PolicyExportReponse }
      }
    }),
    getPricingPolicyById: builder.mutation<GetPricingPolicyByIdResponse, GetPricingPolicyByIdPayload>({
      async queryFn(patch, { getState }: any, _extraOptions, fetchWithBQ) {
        const authOdetails = getState()?.loginSlice?.token?.Response?.Auth1dot0;
        const authToken = getAuthHeader('pricingpolicy/get', 'POST', authOdetails,);
        const response = await fetchWithBQ({
          url: `pricingpolicy/get`,
          method: "POST",
          body: patch,
          headers: {
            "Authorization": authToken?.Authorization,
          },
        });
       return { data: response.data as GetPricingPolicyByIdResponse }
      }
    }),
    editPricingPolicy: builder.mutation({
      async queryFn(patch, { getState }: any, _extraOptions, fetchWithBQ) {
        const authOdetails = getState()?.loginSlice?.token?.Response?.Auth1dot0;
        const authToken = getAuthHeader('pricingpolicy/edit', 'POST', authOdetails,);
        const response = await fetchWithBQ({
          url: `pricingpolicy/edit`,
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

export const {
  useFetchSupplierDataQuery,
  useFetchPricingPolicyListMutation,
  useCreatePricingPolicyMutation,
  useStatusUpdatePricingPolicyMutation,
  useExportPricingPolicyMutation,
  useGetPricingPolicyByIdMutation,
  useEditPricingPolicyMutation
} = musafirPricingPolicyApi;