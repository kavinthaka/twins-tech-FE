import type { Metadata } from 'next';
import { Providers } from '@/store/Providers';
import { Header } from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
    title: { default: 'Twins Tech', template: '%s | Twins Tech' },
    description: 'Twins Tech – computer hardware store',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
        <body
            style={{ margin: 0, background: '#161b22', color: '#e6e9ef', fontFamily: "'Outfit', system-ui, sans-serif" }}
        >
        <Providers>
            <Header />
            {/* This is the "body" that changes with the URL */}
            <main style={{ minHeight: '100vh', background: '#161b22' }}>
                {children}
            </main>
            <Footer />
        </Providers>
        </body>
        </html>
    );
}
