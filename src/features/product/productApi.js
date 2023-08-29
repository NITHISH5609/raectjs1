import { apiSlice } from "../api/apiSlice";

export const productApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => ({
        url: "/product/all?limit=10",
      }),
    }),
    getMoreProducts: builder.query({
      query: ({ page, limit }) => ({
        url: `/product/all?page=${page}&&limit=${limit}`,
      }),
    }),
    getFeatureProducts: builder.query({
      query: () => ({
        url: "/product/featue-products",
      }),
    }),
    getProduct: builder.query({
      query: (productId) => ({
        url: `/product/product/${productId}`,
      }),
    }),
    getProductByCategory: builder.query({
      query: (categoryId) => ({
        url: `/product/product-by-category/${categoryId}`,
      }),
    }),
    addProduct: builder.mutation({
      query: (data) => ({
        url: "/product/add-product",
        method: "POST",
        body: data,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(
            apiSlice.util.updateQueryData("getProducts", undefined, (draft) => {
              draft?.push(data);
            })
          );
        } catch (err) {}
      },
    }),
    updateProduct: builder.mutation({
      query: ({ productId, data }) => ({
        url: `/product/update-product/${productId}`,
        method: "PATCH",
        body: data,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const { data } = await queryFulfilled;

          // pessimistic updates getProducts cache
          dispatch(
            apiSlice.util.updateQueryData("getProducts", undefined, (draft) => {
              const productIndex = draft?.findIndex(
                (product) => product?._id === data._id
              );
              draft[productIndex] = data;
            })
          );

          // pessimistic updates getBrand cache
          dispatch(
            apiSlice.util.updateQueryData(
              "getProduct",
              arg.productId,
              (draft) => {
                // console.log(JSON.stringify(draft));
              }
            )
          );
        } catch (err) {}
      },
    }),
    updateProductStatus: builder.mutation({
      query: ({ productId, data }) => ({
        url: `/product/update-product-status/${productId}`,
        method: "PATCH",
        body: data,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        const result = dispatch(
          productApi.util.updateQueryData("getProducts", undefined, (draft) => {
            const productIndex = draft?.findIndex(
              (product) => product._id === arg.productId
            );
            draft[productIndex].status = arg.data.status;
          })
        );
        try {
          await queryFulfilled;
        } catch (err) {
          result.undo();
        }
      },
    }),
    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `/product/delete-product/${id}`,
        method: "DELETE",
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        const result = dispatch(
          apiSlice.util.updateQueryData("getProducts", undefined, (draft) => {
            const products = draft?.filter((product) => product?._id !== arg);
            return products;
          })
        );
        try {
          await queryFulfilled;
        } catch (err) {
          result.undo();
        }
      },
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetMoreProductsQuery,
  useGetFeatureProductsQuery,
  useGetProductQuery,
  useGetProductByCategoryQuery,
  useAddProductMutation,
  useUpdateProductMutation,
  useUpdateProductStatusMutation,
  useDeleteProductMutation,
} = productApi;
