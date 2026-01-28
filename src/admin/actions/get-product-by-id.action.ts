import { tesloApi } from "@/api/tesloApi";
import type { Product } from "@/interfaces/product.interface";

export const getProductByIdAction = async (id: string): Promise<Product> => {
    if (!id) {
        throw new Error('No se proporciono un id');
    }
    if (id === 'new') {
        return {
            id: '',
            title: '',
            description: '',
            images: [],
            price: 0,
            stock: 0,
            sizes: [],
            tags: [],
            gender: 'men'
        } as unknown as Product;
    }
    const { data: product } = await tesloApi.get<Product>(`/products/${id}`);

    const images = product.images.map((image) => {
        if (image.includes('http')) return image;
        return `${import.meta.env.VITE_API_URL}/files/product/${image}`;
    });
    return {
        ...product,
        images
    };
}