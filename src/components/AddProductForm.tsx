'use client';

import {useState, type FormEvent} from 'react';
import Link from 'next/link';
import {categories} from '@/lib/categories';
import {useCreateProductMutation} from '@/store/api/productsApi';
import styles from './AddProductForm.module.css';

export default function AddProductForm() {
    const [createProduct, {isLoading}] = useCreateProductMutation();
    const [imageUrl, setImageUrl] = useState('');
    const [error, setError] = useState('');
    const [savedId, setSavedId] = useState<number>();
    const previewUrl = imageUrl.trim();
    const validImageUrl = /^(?:https?:\/\/[^\s]+|\/(?!\/)[^\s]+)$/i.test(previewUrl);

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const form = event.currentTarget;
        const data = new FormData(form);
        const name = String(data.get('name')).trim();
        const brand = String(data.get('brand')).trim();
        const stock = String(data.get('stock'));
        setError('');
        setSavedId(undefined);

        if (!name || !validImageUrl) {
            setError('Enter a product name and an HTTP(S) image URL or a local path starting with /.');
            return;
        }

        try {
            const saved = await createProduct({
                name,
                description: String(data.get('description')).trim(),
                category: String(data.get('category')),
                brand: brand || undefined,
                price: Number(data.get('price')),
                stock: stock === '' ? undefined : Number(stock),
                imageUrl: previewUrl,
            }).unwrap();
            form.reset();
            setImageUrl('');
            setSavedId(saved.id);
        } catch {
            setError('Could not save the product. Check your connection and try again.');
        }
    }

    return (
        <section className={styles.page}>
            <h1>Add Product</h1>
            <form onSubmit={handleSubmit}>
                <fieldset disabled={isLoading} className={styles.fields}>
                    <div className={styles.grid}>
                        <div>
                            <section className={styles.card}>
                                <h2>Product details</h2>
                                <label>Product name <input name="name" required maxLength={150}/></label>
                                <label>Description <textarea name="description" rows={4}/></label>
                                <div className={styles.row}>
                                    <label>Category
                                        <select name="category" required defaultValue="">
                                            <option value="">Select a category</option>
                                            {categories.map(({slug, label}) => <option key={slug}>{label}</option>)}
                                        </select>
                                    </label>
                                    <label>Brand <input name="brand"/></label>
                                </div>
                            </section>
                            <section className={styles.card}>
                                <h2>Pricing and inventory</h2>
                                <div className={styles.row}>
                                    <label>Price (USD) <input name="price" type="number" min="0" step="0.01" required/></label>
                                    <label>Stock quantity <input name="stock" type="number" min="0" step="1"/></label>
                                </div>
                            </section>
                        </div>
                        <section className={styles.card}>
                            <h2>Product image</h2>
                            <label>Image URL or local path
                                <input name="imageUrl" value={imageUrl}
                                       onChange={(event) => setImageUrl(event.target.value)}
                                       placeholder="/products/ram/corsair-ddr5.jpg" required/>
                            </label>
                            {validImageUrl && (
                                // eslint-disable-next-line @next/next/no-img-element
                                <img className={styles.preview} src={previewUrl} alt="Product preview"/>
                            )}
                        </section>
                    </div>
                    <div className={styles.actions}>
                        <Link href="/">Cancel</Link>
                        <button type="submit">{isLoading ? 'Saving…' : 'Save product'}</button>
                    </div>
                </fieldset>
                {error && <p role="alert" className={styles.error}>{error}</p>}
                <div role="status">
                    {savedId !== undefined &&
                        <p>Product saved. <Link href={`/products/${savedId}`}>View product</Link></p>}
                </div>
            </form>
        </section>
    );
}
