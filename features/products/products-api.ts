import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import server from "../../utils/vars";
import authHeader from "../auth/auth-header";
const token = authHeader();
const myHeaders = new Headers();

interface Product {
  id: string;
  name: string;
  desc: string;
  url: string;
}
myHeaders.append("Authorization", `Bearer ${token}`);

export const productApi = createApi({
  reducerPath: "products",
  baseQuery: fetchBaseQuery({
    baseUrl: `${server}/`,
    prepareHeaders(headers) {
      headers.set("authorization", `Bearer ${token}`);
      return headers;
    },
  }),
  tagTypes: ["Product"],

  endpoints: (builder) => ({
    getAllProducts: builder.query({
      query: (search: string) => `products?s=${search}`,
    }),
    getProductsByCategoryId: builder.query({
      query: (categoryId: string) => `products?categoryId=${categoryId}`,
      providesTags: ["Product"],
    }),
    getProductById: builder.query({
      query: (productId: string) => `products?${productId}`,
      providesTags: ["Product"],
    }),
    addProduct: builder.mutation<void, Product>({
      query(body: any) {
        return {
          url: "products",
          method: "POST",
          body,
          Headers,
        };
      },
      invalidatesTags: ["Product"],
    }),
    updateProduct: builder.mutation<void, Product>({
      query(data: any) {
        const { id, ...body } = data;
        return {
          url: `products/${id}`,
          method: "PATCH",
          body,
          Headers,
        };
      },
      invalidatesTags: ["Product"],
    }),
  }),
});
export const {
  useGetAllProductsQuery,
  useAddProductMutation,
  useGetProductsByCategoryIdQuery,
  useUpdateProductMutation,
  useGetProductByIdQuery,
  usePrefetch,
} = productApi;
