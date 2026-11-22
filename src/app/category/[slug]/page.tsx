import { notFound } from 'next/navigation';
import { categories } from '@/lib/categories';
import CategoryCatalog from './CategoryCatalog';

export default function CategoryPage({ params }: { params: { slug: string } }) {
    const category = categories.find(({ slug }) => slug === params.slug);
    if (!category) notFound();

    return (
        <section style={{ padding: 24, maxWidth: 1400, margin: '0 auto' }}>
            <h1>{category.label}</h1>
            <CategoryCatalog key={category.slug} slug={category.slug} />
        </section>
    );
}
