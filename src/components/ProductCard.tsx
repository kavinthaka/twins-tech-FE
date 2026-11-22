'use client';

import {useRef} from 'react';
import Link from 'next/link';
import {Eye, Star, X} from 'lucide-react';
import type {Product} from '@/types';
import styles from './ProductCard.module.css';

export function ProductCard({
                                product,
                                onAddToCart,
                            }: {
    product: Product;
    onAddToCart: (product: Product) => void;
}) {
    const preview = useRef<HTMLDialogElement>(null);
    const previewTitleId = `preview-title-${product.id}`;
    const productHref = `/products/${product.id}`;
    const outOfStock = product.stock !== undefined && product.stock <= 0;
    const {rating} = product;

    return (
        <article className={styles.card}>
            <div className={styles.media}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={product.imageUrl} alt={product.name}/>
                <button
                    type="button"
                    className={styles.quickView}
                    onClick={() => preview.current?.showModal()}
                    aria-label={`Quick View for ${product.name}`}
                    aria-haspopup="dialog"
                >
                    <Eye size={17} aria-hidden="true"/> Quick View
                </button>
            </div>
            <div className={styles.content}>
                {product.brand && <span className={styles.brand}>{product.brand}</span>}
                <h3><Link href={productHref}>{product.name}</Link></h3>
                {rating !== undefined && (
                    <div className={styles.rating} role="img" aria-label={`Rated ${rating} out of 5`}>
                        {Array.from({length: 5}, (_, index) => (
                            <Star key={index} size={15} fill={index < rating ? 'currentColor' : 'none'}
                                  aria-hidden="true"/>
                        ))}
                        <span aria-hidden="true">{rating}</span>
                    </div>
                )}
                <div className={styles.prices}>
                    <strong>${product.price.toFixed(2)}</strong>
                    {product.oldPrice !== undefined && product.oldPrice > product.price && (
                        <del>${product.oldPrice.toFixed(2)}</del>
                    )}
                </div>
                <button type="button" className={styles.add} disabled={outOfStock} onClick={() => onAddToCart(product)}>
                    {outOfStock ? 'Out of stock' : 'Add to cart'}
                </button>
            </div>
            <dialog ref={preview} className={styles.preview} aria-labelledby={previewTitleId}>
                <form method="dialog" className={styles.close}>
                    <button aria-label="Close Quick View"><X size={20} aria-hidden="true"/></button>
                </form>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={product.imageUrl} alt={product.name} loading="lazy"/>
                <h2 id={previewTitleId}>{product.name}</h2>
                <p>{product.description}</p>
                <div className={styles.prices}><strong>${product.price.toFixed(2)}</strong></div>
                <Link href={productHref} onClick={() => preview.current?.close()}>View product details</Link>
            </dialog>
        </article>
    );
}
