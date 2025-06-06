import { Product } from "./products";

export type Cart = {
    amount: number;
    items: number;
    products: {
        id: number;
        quantity: number;
        product: Product
    }[];
}