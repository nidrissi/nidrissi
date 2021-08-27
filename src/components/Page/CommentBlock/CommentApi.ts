import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import ClientPrincipal from "./ClientPrincipal";
import { Comment } from "./Single";

export const commentApi = createApi({
  reducerPath: "comment",
  baseQuery: fetchBaseQuery({ baseUrl: "/" }),
  tagTypes: ["client", "username", "comment"],
  endpoints: (builder) => ({
    getClient: builder.query<ClientPrincipal, {}>({
      query: () => ".auth/me",
      providesTags: ["client"],
      transformResponse: ({ client }: { client: ClientPrincipal }) => client,
    }),
    getUsername: builder.query<string, {}>({
      query: () => "api/user",
      providesTags: ["username"],
      transformResponse: ({ username }: { username: string }) => username,
    }),
    postUsername: builder.mutation<{}, { username: string; id: string }>({
      query: (body) => ({
        url: "api/user",
        method: "POST",
        body,
      }),
      invalidatesTags: ["username"],
    }),
    getComments: builder.query<Comment[], string>({
      query: (pageId) => `/api/comment/${pageId}`,
      providesTags: (_result, _error, pageId) => [
        { type: "comment", id: pageId },
      ],
      transformResponse: ({ comments }: { comments: Comment[] }) => comments,
    }),
    postComment: builder.mutation<{}, { pageId: string; content: string }>({
      query: ({ pageId, content }) => ({
        url: `api/comment/${pageId}`,
        method: "POST",
        body: {
          content,
        },
      }),
      invalidatesTags: (_result, error, { pageId }) =>
        error ? [] : [{ type: "comment", id: pageId }],
    }),
    patchComment: builder.mutation<
      {},
      { pageId: string; id: string; content: string }
    >({
      query: ({ pageId, id, content }) => ({
        url: `api/comment/${pageId}/${id}`,
        method: "PATCH",
        body: { content },
      }),
      invalidatesTags: (_result, error, { pageId }) =>
        error ? [] : [{ type: "comment", id: pageId }],
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
      invalidatesTags: (_result, error, { pageId }) =>
        error ? [] : [{ type: "comment", id: pageId }],
    }),
  }),
});

export const {
  useGetClientQuery,
  useGetUsernameQuery,
  useGetCommentsQuery,
  usePostUsernameMutation,
  usePostCommentMutation,
  usePatchCommentMutation,
  useDeleteCommentMutation,
} = commentApi;
