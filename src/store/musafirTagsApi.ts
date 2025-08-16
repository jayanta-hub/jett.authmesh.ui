/* eslint-disable @typescript-eslint/no-explicit-any */
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BaseURL, APIversion } from "../utility/config";
import { getAuthHeader } from "../utility/config/oAuth";

const objectToBase64 = (obj: any): string => {
  try {
    const jsonString = JSON.stringify(obj); // Convert to JSON string
    return btoa(jsonString); // Encode to base64 directly
  } catch (error) {
    console.error("Error encoding to Base64:", error);
    return "";
  }
};

const staticHeaderData = {
  TaasId: "67612bd9cd58ac147c2710bf",
  TmcId: "67612bd9cd59ac147c2710bf",
  OrganizationId: "67612bd9cd59ac14890710bf",
  OrganizationName: "Sample Organization",
  UserId: "user123",
  ProfileId: "67c56bacf5f1e77f59718083",
  EmailId: "user@example.com",
  FirstName: "John",
  LastName: "Doe",
  AccessLevel: "Admin",
  Scope: "Full",
};

export const musafirTagsApi = createApi({
  reducerPath: "musafirTagsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${BaseURL}${APIversion}`,

    /**
     * Prepares the headers for the API requests by checking if the loginSlice
     * contains a valid access token and adding it to the headers if it does.
     * Also sets the Content-Type to application/json.
     * @param {Headers} headers - The headers to be modified.
     * @param {{ getState: () => any }} api - The api object.
     * @returns {Headers} The modified headers.
     */
    prepareHeaders: (headers) => {
      headers.set("Content-Type", "application/json");
      return headers;
    },
  }),



  /**
   * Defines the endpoints for the Musafir User API.
   *
   * @param {import("@reduxjs/toolkit/query/react").MutationBuilder} builder - The builder for creating mutations.
   * @returns {Record<string, import("@reduxjs/toolkit/query/react").MutationDefinition<any, any, any>>} 
   *          The object containing defined endpoints.
   *
   * This includes:
   * - fetchUsers: A mutation for fetching user data by sending a POST request to the '/api/v1/user/Users' endpoint with a request body.
   */
  endpoints: (builder) => ({
    createEmailTemplate: builder.mutation({
      async queryFn(patch, { getState }: any, _extraOptions, fetchWithBQ) {
        const authOdetails = getState()?.loginSlice?.token?.Response?.Auth1dot0;
        const authToken = getAuthHeader('tag/list', 'POST', authOdetails,);
        const response = await fetchWithBQ({
          url: `tag/list`,
          method: "POST",
          body: patch.patch,
          headers: {
            "Authorization": authToken?.Authorization,
          },
        });
        return response;
      }
    }),
    fetchTags: builder.mutation({
      async queryFn(patch, { getState }: any, _extraOptions, fetchWithBQ) {
        const authOdetails = getState()?.loginSlice?.token?.Response?.Auth1dot0;
        const authToken = getAuthHeader('tag/list', 'POST', authOdetails,);
        const response = await fetchWithBQ({
          url: `tag/list`,
          method: "POST",
          body: patch.patch,
          headers: {
            "Authorization": authToken?.Authorization,
          },
        });
        return response;
      }
    }),
    fetchParentTags: builder.mutation({
      async queryFn(patch, { getState }: any, _extraOptions, fetchWithBQ) {
        const authOdetails = getState()?.loginSlice?.token?.Response?.Auth1dot0;
        const authToken = getAuthHeader('tag/get/tags', 'POST', authOdetails,);
        const response = await fetchWithBQ({
          url: `tag/get/tags`,
          method: "POST",
          body: patch.patch,
          headers: {
            "Authorization": authToken?.Authorization,
          },
        });
        return response;
      }
    }),
    fetchTagsMeta: builder.mutation({
      async queryFn(patch, { getState }: any, _extraOptions, fetchWithBQ) {
        const authOdetails = getState()?.loginSlice?.token?.Response?.Auth1dot0;
        const authToken = getAuthHeader('tag/metadata', 'POST', authOdetails,);
        const response = await fetchWithBQ({
          url: `tag/metadata`,
          method: "POST",
          body: patch.patch,
          headers: {
            "Authorization": authToken?.Authorization,
          },
        });
        return response;
      }
    }),

    fetchTagsId: builder.mutation({
      async queryFn(patch, { getState }: any, _extraOptions, fetchWithBQ) {
        const authOdetails = getState()?.loginSlice?.token?.Response?.Auth1dot0;
        const authToken = getAuthHeader('tag/get/values', 'POST', authOdetails,);
        const response = await fetchWithBQ({
          url: `tag/get/values`,
          method: "POST",
          body: patch.patch,
          headers: {
            "Authorization": authToken?.Authorization,
          },
        });
        return response;
      }
    }),
    basicCreation: builder.mutation({
      async queryFn(patch, { getState }: any, _extraOptions, fetchWithBQ) {
        const authOdetails = getState()?.loginSlice?.token?.Response?.Auth1dot0;
        const authToken = getAuthHeader('tag/create', 'POST', authOdetails,);
        const response = await fetchWithBQ({
          url: `tag/create`,
          method: "POST",
          body: patch.patch,
          headers: {
            "Authorization": authToken?.Authorization,
          },
        });
        return response;
      }

    }),
    tagValuesCreation: builder.mutation({
      async queryFn(patch, { getState }: any, _extraOptions, fetchWithBQ) {
        const authOdetails = getState()?.loginSlice?.token?.Response?.Auth1dot0;
        const authToken = getAuthHeader('tag/value/add', 'POST', authOdetails,);
        const response = await fetchWithBQ({
          url: `tag/value/add`,
          method: "POST",
          body: patch.patch,
          headers: {
            "Authorization": authToken?.Authorization,
          },
        });
        return response;
      }

    }),
    tagGroup: builder.mutation({
      async queryFn(patch, { getState }: any, _extraOptions, fetchWithBQ) {
        const authOdetails = getState()?.loginSlice?.token?.Response?.Auth1dot0;
        const authToken = getAuthHeader('tag/group/add', 'POST', authOdetails,);
        const response = await fetchWithBQ({
          url: `tag/group/add`,
          method: "POST",
          body: patch.patch,
          headers: {
            "Authorization": authToken?.Authorization,
          },
        });
        return response;
      }
    }),
    fetchGroup: builder.mutation({
      async queryFn(patch, { getState }: any, _extraOptions, fetchWithBQ) {
        const authOdetails = getState()?.loginSlice?.token?.Response?.Auth1dot0;
        const authToken = getAuthHeader('platformsearch/groups', 'POST', authOdetails,);
        const response = await fetchWithBQ({
          url: `platformsearch/groups`,
          method: "POST",
          body: patch.patch,
          headers: {
            "Authorization": authToken?.Authorization,
          },
        });
        return response;
      }

    }),
    fetchTagsById: builder.mutation({
      async queryFn(patch, { getState }: any, _extraOptions, fetchWithBQ) {
        const authOdetails = getState()?.loginSlice?.token?.Response?.Auth1dot0;
        const authToken = getAuthHeader('tag/get', 'POST', authOdetails,);
        const response = await fetchWithBQ({
          url: `tag/get`,
          method: "POST",
          body: patch.patch,
          headers: {
            "Authorization": authToken?.Authorization,
          },
        });
        return response;
      }

    }),
    tagsStatus: builder.mutation({
      async queryFn(patch, { getState }: any, _extraOptions, fetchWithBQ) {
        const authOdetails = getState()?.loginSlice?.token?.Response?.Auth1dot0;
        const authToken = getAuthHeader('tag/isenable', 'POST', authOdetails,);
        const response = await fetchWithBQ({
          url: `tag/isenable`,
          method: "POST",
          body: patch.patch,
          headers: {
            "Authorization": authToken?.Authorization,
          },
        });
        return response;
      }

    }),
    tagArchive: builder.mutation({
      async queryFn(patch, { getState }: any, _extraOptions, fetchWithBQ) {
        const authOdetails = getState()?.loginSlice?.token?.Response?.Auth1dot0;
        const authToken = getAuthHeader('tag/delete', 'POST', authOdetails,);
        const response = await fetchWithBQ({
          url: `tag/delete`,
          method: "POST",
          body: patch.patch,
          headers: {
            "Authorization": authToken?.Authorization,
          },
        });
        return response;
      }


    }),
    EditTag: builder.mutation({
      async queryFn(patch, { getState }: any, _extraOptions, fetchWithBQ) {
        const authOdetails = getState()?.loginSlice?.token?.Response?.Auth1dot0;
        const authToken = getAuthHeader('tag/edit', 'POST', authOdetails,);
        const response = await fetchWithBQ({
          url: `tag/edit`,
          method: "POST",
          body: patch.patch,
          headers: {
            "Authorization": authToken?.Authorization,
          },
        });
        return response;
      }

    }),
    getTagById: builder.mutation({
      async queryFn(patch, { getState }: any, _extraOptions, fetchWithBQ) {
        const authOdetails = getState()?.loginSlice?.token?.Response?.Auth1dot0;
        const authToken = getAuthHeader('tag/get', 'POST', authOdetails,);
        const response = await fetchWithBQ({
          url: `tag/get`,
          method: "POST",
          body: patch.patch,
          headers: {
            "Authorization": authToken?.Authorization,
          },
        });
        return response;
      }

    }),
    createGroup: builder.mutation({
      async queryFn(patch, { getState }: any, _extraOptions, fetchWithBQ) {
        const authOdetails = getState()?.loginSlice?.token?.Response?.Auth1dot0;
        const authToken = getAuthHeader('group/create', 'POST', authOdetails,);
        const response = await fetchWithBQ({
          url: `group/create`,
          method: "POST",
          body: patch.patch,
          headers: {
            "Authorization": authToken?.Authorization,
          },
        });
        return response;
      }

    }),
    tagsRank: builder.mutation({
      async queryFn(patch, { getState }: any, _extraOptions, fetchWithBQ) {
        const authOdetails = getState()?.loginSlice?.token?.Response?.Auth1dot0;
        const authToken = getAuthHeader('tag/rankupgrade', 'POST', authOdetails,);
        const response = await fetchWithBQ({
          url: `tag/rankupgrade`,
          method: "POST",
          body: patch.patch,
          headers: {
            "Authorization": authToken?.Authorization,
          },
        });
        return response;
      }

    }),
     statusChange: builder.mutation({
      async queryFn(patch, { getState }: any, _extraOptions, fetchWithBQ) {
        const authOdetails = getState()?.loginSlice?.token?.Response?.Auth1dot0;
        const authToken = getAuthHeader('tag/statusupdate', 'POST', authOdetails,);
        const response = await fetchWithBQ({
          url: `tag/statusupdate`,
          method: "POST",
          body: patch.patch,
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
  useCreateEmailTemplateMutation,
  useFetchTagsMutation,
  useFetchTagsMetaMutation,
  useFetchParentTagsMutation,
  useBasicCreationMutation,
  useFetchTagsIdMutation,
  useTagValuesCreationMutation,
  useTagGroupMutation,
  useFetchGroupMutation,
  useFetchTagsByIdMutation,
  useTagsStatusMutation,
  useTagArchiveMutation,
  useEditTagMutation,
  useGetTagByIdMutation,
  useCreateGroupMutation,
  useTagsRankMutation,
  useStatusChangeMutation
} = musafirTagsApi;