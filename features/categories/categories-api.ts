import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import server from "../../utils/vars";

import authHeader from "../auth/auth-header";
const token = authHeader();
export const categoryApi = createApi({
  reducerPath: "categories",
  baseQuery: fetchBaseQuery({
    baseUrl: `${server}/`,
    prepareHeaders(headers) {
      headers.set("authorization", `Bearer ${token}`);
      return headers;
    },
  }),

  endpoints: (builder) => ({
    getAllCategories: builder.query({
      query: () => "categories",
    }),
    addCategory: builder.mutation({
      query(body: any) {
        return {
          url: "categories",
          method: "POST",
          body,
        };
      },
    }),
  }),
});
export const { useGetAllCategoriesQuery, useAddCategoryMutation } = categoryApi;
