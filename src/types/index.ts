export interface Product {
    id: number;
    name: string;
    brand?: string;
    oldPrice?: number;
    rating?: number;
    price: number;
    imageUrl: string;
    category: string;
    stock?: number;
    description: string;
}

export interface CartItem {
    product: Product;
    quantity: number;
}
