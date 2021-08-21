import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { ClientPrincipal } from "./ClientPrincipal";
import { Comment } from "./Single";

export const commentApi = createApi({
  reducerPath: "comment",
  baseQuery: fetchBaseQuery({ baseUrl: "/" }),
  tagTypes: ["client", "username", "comment"],
  endpoints: (builder) => ({
    getClient: builder.query<ClientPrincipal, {}>({
      query: () => ".auth/me",
      providesTags: ["client"],
      transformResponse: ({
        clientPrincipal,
      }: {
        clientPrincipal: ClientPrincipal;
      }) => clientPrincipal,
    }),
    getUserName: builder.query<string, {}>({
      query: () => "api/user",
      providesTags: ["username"],
      transformResponse: ({ userName }: { userName: string }) => userName,
    }),
    postUserName: builder.mutation<{}, { userName: string; id: string }>({
      query: (body) => ({
        url: "api/user",
        method: "POST",
        body,
      }),
      invalidatesTags: ["username"],
    }),
    getComments: builder.query<Comment[], string>({
      query: (pageId) => `/api/comment/${pageId}`,
      providesTags: ["comment"],
    }),
    postComment: builder.mutation<{}, { pageId: string; content: string }>({
      query: ({ pageId, content }) => ({
        url: `api/comment/${pageId}`,
        method: "POST",
        body: {
          content,
        },
      }),
      invalidatesTags: ["comment"],
    }),
    deleteComment: builder.mutation<
      {},
      { pageId: string; id: string; superDelete?: boolean }
    >({
      query: ({ pageId, id, superDelete }) => ({
        url: `/api/comment/${pageId}/${id}`,
        params: {
          super: superDelete ? "1" : "0",
        },
        method: "DELETE",
      }),
      invalidatesTags: ["comment"],
    }),
  }),
});

export const {
  useGetClientQuery,
  useGetUserNameQuery,
  useGetCommentsQuery,
  usePostUserNameMutation,
  usePostCommentMutation,
  useDeleteCommentMutation,
} = commentApi;
