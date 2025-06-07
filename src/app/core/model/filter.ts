export type Filter = {
    search: string | null;
    price: {
        min: number | null;
        max: number | null;
    };
    rating: number | null;
    order: 'ASC' | 'DESC' | null;
}