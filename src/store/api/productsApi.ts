import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Product } from '@/types';
import { mockProducts } from '@/lib/mockData';

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? '';
// When no backend URL is configured, serve mock data.
const USE_MOCK = !BASE_URL;

const localProductsKey = 'twinstech-products';

function readLocalProducts(): Product[] {
  const saved = typeof window === 'undefined' ? null : window.localStorage.getItem(localProductsKey);
  return saved ? JSON.parse(saved) : [];
}

export const productsApi = createApi({
  reducerPath: 'productsApi',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  tagTypes: ['Product'],
  endpoints: (builder) => ({
    // GET /api/products  ->  Spring Boot @GetMapping("/products")
    getProducts: builder.query<Product[], void>({
      ...(USE_MOCK
        ? { queryFn: () => ({ data: [...mockProducts, ...readLocalProducts()] }) }
        : { query: () => '/products' }),
      providesTags: ['Product'],
    }),

    // GET /api/products/{id}  ->  Spring Boot @GetMapping("/products/{id}")
    getProductById: builder.query<Product, number>({
      ...(USE_MOCK
        ? {
            queryFn: async (id: number) => {
              const found = [...mockProducts, ...readLocalProducts()].find((p) => p.id === id);
              return found
                ? { data: found }
                : { error: { status: 404, data: 'Not found' } as const };
            },
          }
        : { query: (id: number) => `/products/${id}` }),
      providesTags: (_res, _err, id) => [{ type: 'Product', id }],
    }),
    createProduct: builder.mutation<Product, Omit<Product, 'id'>>({
      ...(USE_MOCK
        ? {
            queryFn: (input: Omit<Product, 'id'>) => {
              try {
                const saved = readLocalProducts();
                const id = Math.max(...mockProducts.map((product) => product.id),
                  ...saved.map((product) => product.id)) + 1;
                const product = { ...input, id };
                window.localStorage.setItem(localProductsKey, JSON.stringify([...saved, product]));
                return { data: product };
              } catch {
                return { error: { status: 'CUSTOM_ERROR', error: 'Could not save the product locally.' } as const };
              }
            },
          }
        : { query: (body) => ({ url: '/products', method: 'POST', body }) }),
      invalidatesTags: (result) => result ? ['Product'] : [],
    }),
  }),
});

export const { useGetProductsQuery, useGetProductByIdQuery, useCreateProductMutation } = productsApi;
