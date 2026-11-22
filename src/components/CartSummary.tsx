'use client';

import type {CartItem} from '@/types';

export function CartSummary({
                                items,
                                onRemove,
                                onClear,
                            }: {
    items: CartItem[];
    onRemove: (id: number) => void;
    onClear: () => void;
}) {
    const total = items.reduce((sum, i) => sum + i.product.price * i.quantity, 0);

    if (items.length === 0) return <p>Your cart is empty.</p>;

    return (
        <div style={{border: '1px solid #e5e5e5', borderRadius: 8, padding: 16}}>
            <h3 style={{marginTop: 0}}>Cart</h3>
            <ul style={{listStyle: 'none', padding: 0}}>
                {items.map((i) => (
                    <li
                        key={i.product.id}
                        style={{display: 'flex', justifyContent: 'space-between', marginBottom: 8}}
                    >
            <span>
              {i.product.name} × {i.quantity}
            </span>
                        <span>
              ${(i.product.price * i.quantity).toFixed(2)}{' '}
                            <button onClick={() => onRemove(i.product.id)}>✕</button>
            </span>
                    </li>
                ))}
            </ul>
            <strong>Total: ${total.toFixed(2)}</strong>
            <div style={{marginTop: 12}}>
                <button onClick={onClear}>Clear cart</button>
            </div>
        </div>
    );
}
