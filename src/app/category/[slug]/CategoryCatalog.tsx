'use client';

import ProductListing from '@/components/ProductListing';
import { categorySlug } from '@/lib/categories';
import { useAppDispatch } from '@/store';
import { useGetProductsQuery } from '@/store/api/productsApi';
import { addToCart } from '@/store/cartSlice';

export default function CategoryCatalog({ slug }: { slug: string }) {
    const { data, isLoading, isError } = useGetProductsQuery();
    const dispatch = useAppDispatch();

    if (isLoading) return <p>Loading products…</p>;
    if (isError || !data) return <p>Could not load products.</p>;

    const products = data.filter((product) => categorySlug(product.category) === slug);
    if (products.length === 0) return <p>No products in this category.</p>;

    return (
        <ProductListing
            key={slug}
            products={products}
            onAddToCart={(product) => dispatch(addToCart(product))}
        />
    );
}
