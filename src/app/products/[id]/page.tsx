'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { categorySlug } from '@/lib/categories';
import { useGetProductByIdQuery } from '@/store/api/productsApi';
import { useAppDispatch } from '@/store';
import { addToCart } from '@/store/cartSlice';

export default function ProductDetailPage() {
  const params = useParams();
  const id = Number(params?.id);
  const { data: product, isLoading, isError } = useGetProductByIdQuery(id, {
    skip: !Number.isSafeInteger(id) || id <= 0,
  });
  const dispatch = useAppDispatch();

  if (isLoading) return <p>Loading…</p>;
  if (isError || !product) return <p>Product not found.</p>;

  return (
    <div>
      <Link href={`/category/${categorySlug(product.category)}`} style={{ color: 'inherit' }}>
        ← Back to {product.category}
      </Link>
      <div style={{ display: 'flex', gap: 32, marginTop: 16 }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={product.imageUrls[0]} alt={product.name} style={{ borderRadius: 8 }} />
        <div>
          <h1>{product.name}</h1>
          <p style={{ color: '#aab1bd' }}>{product.description}</p>
          <p>
            <strong>${product.price.toFixed(2)}</strong> · {product.category}
            {product.qty !== undefined && ` · ${product.qty} in stock`}
          </p>
          <button
            onClick={() => dispatch(addToCart(product))}
            disabled={product.qty !== undefined && product.qty <= 0}
            style={{ padding: '8px 16px', cursor: 'pointer', borderRadius: 6 }}
          >
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
}
