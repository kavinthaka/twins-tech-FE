import Image from 'next/image';
import Link from 'next/link';
import {categories} from '@/lib/categories';

export default function HomePage() {
    return (
        <div style={{padding: 24, maxWidth: 1400, margin: '0 auto', color: '#e6e9ef'}}>
            <h1 style={{fontSize: 40, marginBottom: 8}}>Welcome to Twins Tech</h1>
            <p style={{color: '#aab1bd', marginBottom: 32}}>
                Pick a category to start shopping.
            </p>

            <div
                style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 220px), 1fr))',
                    gap: 24,
                }}
            >
                {categories.map((c) => (
                    <Link
                        key={c.slug}
                        href={`/category/${c.slug}`}
                        style={{
                            background: '#0d1117',
                            border: '1px solid #21262d',
                            overflow: 'hidden',
                            textAlign: 'center',
                            fontSize: 20,
                            fontWeight: 600,
                            color: '#e6e9ef',
                            textDecoration: 'none',
                        }}
                    >
                        <Image
                            src={`/categories/${c.slug}.jpg`}
                            alt=""
                            width={720}
                            height={480}
                            sizes="(max-width: 511px) 100vw, (max-width: 755px) 50vw, (max-width: 999px) 33vw, 25vw"
                            style={{display: 'block', width: '100%', height: 'auto', aspectRatio: '3 / 2', objectFit: 'cover'}}
                        />
                        <span style={{display: 'block', padding: '16px 12px'}}>{c.label}</span>
                    </Link>
                ))}
            </div>
        </div>
    );
}
