export interface Product {
    id: number;
    name: string;
    brand?: string;
    oldPrice?: number;
    rating?: number;
    price: number;
    imageUrls: string[];
    category: string;
    qty?: number;
    description: string;
}

export interface CartItem {
    product: Product;
    quantity: number;
}
