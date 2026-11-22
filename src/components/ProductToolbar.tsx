'use client';

import {
    Grid2X2,
    Grid3X3,
    Rows3,
} from 'lucide-react';

type Props = {
    view: string;
    setView: (view: string) => void;
};

export default function ProductToolbar({
                                           view,
                                           setView,
                                       }: Props) {
    return (
        <div
            style={{
                background: '#161b22',
                border: '1px solid #21262d',
                padding: '20px',
                display: 'flex',
                justifyContent: 'space-between',
                marginBottom: '24px',
            }}
        >
            <div
                style={{
                    display: 'flex',
                    gap: '16px',
                }}
            >
                <select>
                    <option>Ascending Order</option>
                    <option>Descending Order</option>
                </select>

                <select>
                    <option>Sort Item</option>
                    <option>Price</option>
                    <option>Name</option>
                </select>
            </div>

            <div
                style={{
                    display: 'flex',
                    gap: '10px',
                }}
            >
                <button onClick={() => setView('grid2')}>
                    <Grid2X2/>
                </button>

                <button onClick={() => setView('grid3')}>
                    <Grid3X3/>
                </button>

                <button onClick={() => setView('list')}>
                    <Rows3/>
                </button>
            </div>
        </div>
    );
}