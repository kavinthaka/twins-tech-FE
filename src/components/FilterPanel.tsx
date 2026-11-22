'use client';

const priceRanges = [
    'Below $100',
    '$100 - $200',
    '$200 - $400',
    '$400 - $600',
    '$600 - $800',
    '$800 - $1000',
];

export default function FilterPanel() {
    return (
        <div
            style={{
                width: '280px',
                display: 'flex',
                flexDirection: 'column',
                gap: '24px',
            }}
        >
            <div
                style={{
                    background: '#161b22',
                    border: '1px solid #21262d',
                    padding: '24px',
                }}
            >
                <h3 style={{color: '#e6e9ef'}}>
                    Filters
                </h3>

                <div
                    style={{
                        marginTop: '20px',
                        display: 'inline-block',
                        padding: '8px 12px',
                        background: '#0d1117',
                        color: '#e6e9ef',
                    }}
                >
                    Electronic
                </div>
            </div>

            <div
                style={{
                    background: '#161b22',
                    border: '1px solid #21262d',
                    padding: '24px',
                }}
            >
                <h3 style={{color: '#e6e9ef'}}>
                    Price
                </h3>

                {priceRanges.map((price) => (
                    <label
                        key={price}
                        style={{
                            display: 'block',
                            marginTop: '16px',
                            color: '#aab1bd',
                            cursor: 'pointer',
                        }}
                    >
                        <input
                            type="checkbox"
                            style={{marginRight: '10px'}}
                        />
                        {price}
                    </label>
                ))}
            </div>
        </div>
    );
}