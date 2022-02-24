import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
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
    baseUrl: "http://localhost:9000/",
    prepareHeaders(headers) {
      headers.set("authorization", `Bearer ${token}`);
      return headers;
    },
  }),
  tagTypes: ["Product"],

  endpoints: (builder) => ({
    getAllProducts: builder.query({
      query: (search: string) => `products?s=${search}`,
      headers: Headers,
    }),
    getProductsByCategoryId: builder.query({
      query: (categoryId: string) => `products?categoryId=${categoryId}`,
      providesTags: ["Product"],
    }),
    getProductById: builder.query({
      query: (productId: string) => `products?${productId}`,
      providesTags: ["Product"],
    }),
    addProduct: builder.mutation({
      query(data: any) {
        return {
          url: "products",
          method: "POST",
          body: data,
          headers: Headers,
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
    searchProduct: builder.query({
      query: (search: string) => `products/search?s=${search}`,
      // providesTags: ["Product"],
    }),
  }),
});
export const {
  useGetAllProductsQuery,
  useAddProductMutation,
  useGetProductsByCategoryIdQuery,
  useUpdateProductMutation,
  useGetProductByIdQuery,
  useSearchProductQuery,
  usePrefetch,
} = productApi;
