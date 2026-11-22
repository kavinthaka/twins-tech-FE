'use client';

import {useRef, useState} from 'react';

import FilterPanel from '@/components/FilterPanel';
import ProductToolbar from '@/components/ProductToolbar';
import Pagination from '@/components/Pagination';
import {ProductCard} from '@/components/ProductCard';
import type {Product} from '@/types';

type ProductListingProps = {
    products: Product[];
    onAddToCart: (product: Product) => void;
};

const pageSize = 12;

export default function ProductListing({products, onAddToCart}: ProductListingProps) {
    const [page, setPage] = useState(1);
    const [view, setView] = useState('grid4');
    const resultsSummary = useRef<HTMLParagraphElement>(null);

    const totalPages = Math.ceil(products.length / pageSize);
    const currentPage = Math.min(page, Math.max(1, totalPages));
    const start = (currentPage - 1) * pageSize;
    const end = Math.min(start + pageSize, products.length);
    const columns = view === 'list' ? 1 : Number(view.slice(-1));

    return (
        <div
            style={{
                background: '#161b22',
                minHeight: '100vh',
                padding: '24px',
            }}
        >
            <div
                style={{
                    display: 'flex',
                    gap: '24px',
                }}
            >
                <FilterPanel/>

                <div style={{flex: 1}}>
                    <ProductToolbar
                        view={view}
                        setView={setView}
                    />

                    <p ref={resultsSummary} tabIndex={-1} aria-live="polite" style={{color: '#aab1bd', scrollMarginTop: 188}}>
                        {products.length > 0
                            ? `Showing ${start + 1}–${end} of ${products.length} products`
                            : 'No products to show.'}
                    </p>

                    <div
                        style={{
                            display: 'grid',
                            gap: '24px',
                            gridTemplateColumns:
                                `repeat(${columns}, minmax(0, 1fr))`,
                        }}
                    >
                        {products.slice(start, end).map((product) => (
                            <ProductCard
                                key={product.id}
                                product={product}
                                onAddToCart={onAddToCart}
                            />
                        ))}
                    </div>

                    {totalPages > 0 && (
                        <div style={{marginTop: 40}}>
                            <Pagination
                                page={currentPage}
                                totalPages={totalPages}
                                onChange={(nextPage) => {
                                    setPage(nextPage);
                                    resultsSummary.current?.focus({preventScroll: true});
                                    resultsSummary.current?.scrollIntoView({block: 'start'});
                                }}
                            />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
