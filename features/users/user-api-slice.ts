import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const userApi = createApi({
  reducerPath: "users",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:9000/",
  }),
  endpoints: (builder) => ({
    getAllUsers: builder.query({
      query: () => `users`,
    }),
    createUser: builder.mutation({
      query(body: any) {
        return {
          url: "users",
          method: "POST",
          body,
        };
      },
    }),
  }),
});
export const { useGetAllUsersQuery, useCreateUserMutation } = userApi;
