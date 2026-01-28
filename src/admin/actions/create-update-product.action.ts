import { tesloApi } from "@/api/tesloApi";
import type { Product } from "@/interfaces/product.interface";
import { sleep } from "@/lib/sleep";

export const CreateUpdateProductAction = async (productLike: Partial<Product> & { files?: File[] }): Promise<Product> => {

    await sleep(1500)


    const { id, user, images = [], files, ...rest } = productLike;

    const isCreating = id === 'new';

    rest.stock = Number(rest.stock) || 0;
    rest.price = Number(rest.price) || 0;


    const uploadFiles = async (files: File[]) => {

        const uploadPromises = files.map(async (file) => {
            const formData = new FormData();
            formData.append('file', file);
            const { data } = await tesloApi.post<FileUploadResponse>('/files/product', formData);
            return data.fileName;
        });
        const uploadedFileNames = await Promise.all(uploadPromises);
        return uploadedFileNames;
    }

    //Preparar las imagenes
    if (files && files.length > 0) {
        const imagesToUpload = files.filter(file => !file.name.includes('http')) || [];
        const uploadedImages = await uploadFiles(imagesToUpload);
        images.push(...uploadedImages);
    }

    const imagesTosave = images.map(image => { if (image.includes('http')) return image.split('/').pop() || ''; })

    const { data } = await tesloApi<Product>({
        url: isCreating ? '/products' : `/products/${id}`,
        method: isCreating ? 'POST' : 'PATCH',
        data: { ...rest, images: imagesTosave }
    })

    return {
        ...data,
        images: images.map(image => {
            if (image.includes('http')) return image;
            return `${import.meta.env.VITE_API_URL}/products/${image}`;
        })
    };

    interface FileUploadResponse {
        secureUrl: string;
        fileName: string;
    }


}