"use client";

import Image from "next/image";
import {Star, X} from "lucide-react";
import styles from "./QuickView.module.css";
import {useEffect, useRef, useState} from "react";
import {Product} from "@/types";

type QuickViewProps = {
    product: Product;
    onClose: () => void;
    // onAddToCart: (sku: string, quantity: number) => void;
};

export default function QuickView({
                                      product,
                                      onClose,
                                      // onAddToCart,
                                  }: QuickViewProps) {
    const dialogRef = useRef<HTMLDialogElement>(null);
    const [imageIndex, setImageIndex] = useState(0);
    const [quantity, setQuantity] = useState(1);

    const selectedImage = product.imageUrls[imageIndex];
    const availableQuantity = product.qty ?? 0;
    const inStock = availableQuantity > 0;

    useEffect(() => {
        const dialog = dialogRef.current;
        if (!dialog) return;

        dialog.showModal();
        return () => dialog.close();
    }, []);

    function addToCart() {
        if (quantity < 1 || quantity > availableQuantity) return;

        // onAddToCart(product.sku, quantity);
        onClose();
    }

    return (
        <dialog
            ref={dialogRef}
            aria-labelledby="quick-view-title"
            onCancel={(event) => {
                event.preventDefault();
                onClose();
            }}
            className={styles.dialog}
        >
            <button type="button" className={styles.close} onClick={onClose} aria-label="Close quick view">
                <X size={22} aria-hidden="true"/>
            </button>

            <div className={styles.layout}>
                <section aria-label="Product photos">
                    {selectedImage && (
                        <Image
                            src={selectedImage}
                            alt={`${product.name}, photo ${imageIndex + 1}`}
                            width={480}
                            height={480}
                            className={styles.mainImage}
                        />
                    )}

                    {product.imageUrls.length > 1 && (
                        <div className={styles.thumbnails}>
                            {product.imageUrls.map((src, index) => (
                                <button
                                    key={src}
                                    type="button"
                                    aria-label={`Show photo ${index + 1}`}
                                    aria-pressed={index === imageIndex}
                                    onClick={() => setImageIndex(index)}
                                >
                                    <Image src={src} alt="" width={56} height={56}/>
                                </button>
                            ))}
                        </div>
                    )}
                </section>

                <section className={styles.details} aria-labelledby="quick-view-title">
                    {product.brand && <p className={styles.secondary}>{product.brand}</p>}
                    <h2 id="quick-view-title">{product.name}</h2>
                    {product.rating !== undefined && (
                        <p className={styles.rating}>
                            <Star size={16} fill="currentColor" aria-hidden="true"/>
                            <span>{product.rating} out of 5</span>
                        </p>
                    )}

                    <p className={styles.price}>
                        ${product.price.toFixed(2)}
                        {product.oldPrice !== undefined && product.oldPrice > product.price && (
                            <del>${product.oldPrice.toFixed(2)}</del>
                        )}
                    </p>
                    <p className={styles.secondary}>{product.description}</p>
                    <p className={styles.secondary}>
                        {inStock ? `${availableQuantity} available` : "Out of stock"}
                    </p>

                    {inStock && (
                        <div className={styles.quantity}>
                            <span>Quantity</span>
                            <div className={styles.stepper}>
                                <button
                                    type="button"
                                    aria-label="Decrease quantity"
                                    disabled={quantity <= 1}
                                    onClick={() => setQuantity(quantity - 1)}
                                >
                                    &minus;
                                </button>
                                <span aria-live="polite">{quantity}</span>
                                <button
                                    type="button"
                                    aria-label="Increase quantity"
                                    disabled={quantity >= availableQuantity}
                                    onClick={() => setQuantity(quantity + 1)}
                                >
                                    +
                                </button>
                            </div>
                        </div>
                    )}

                    <button type="button" className={styles.add} disabled={!inStock} onClick={addToCart}>
                        Add to cart
                    </button>
                </section>
            </div>
        </dialog>
    );
}
