import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { getProductByIdAction } from "../actions/get-product-by-id.action"
import type { Product } from "@/interfaces/product.interface";
import { CreateUpdateProductAction } from "../actions/create-update-product.action";

export const useProduct = (id: string) => {

    const queryClient = useQueryClient();

    const query = useQuery({
        queryKey: ['product', { id }],
        queryFn: () => getProductByIdAction(id),
        retry: false,
        staleTime: 1000 * 60 * 5,
        // enabled: !!id,
    });

    const mutation = useMutation({
        mutationFn: CreateUpdateProductAction,
        onSuccess: (product) => {
            console.log('Producto guardado', product);
            queryClient.invalidateQueries({
                queryKey: ['products'],
            });
            queryClient.invalidateQueries({
                queryKey: ['product', { id }],
            });
            queryClient.setQueryData(['products', { id: product.id }], product);
        },
        onError: (error) => {
            console.log('Error al guardar el producto', error);
        },
        //TODO:
        //Invalidar caché
        //Actualizar queryData
    })


    return { ...query, mutation }
}
