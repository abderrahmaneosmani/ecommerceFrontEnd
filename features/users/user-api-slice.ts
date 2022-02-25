import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import server from "../../utils/vars";
export const userApi = createApi({
  reducerPath: "users",
  baseQuery: fetchBaseQuery({
    baseUrl: `${server}/`,
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
