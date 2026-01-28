import { AdminTitle } from '@/admin/components/AdminTitle';
import { CustomPagination } from '@/components/custom/CustomPagination';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { CurrencyFormatter } from '@/lib/currency-formatter';
import { useProducts } from '@/shop/hooks/useProducts';
import { PencilIcon, PlusIcon } from 'lucide-react';
import { Link } from 'react-router';

export const AdminProductsPage = () => {

  const { data } = useProducts();



  return (
    <>
      <div className="flex justify-between items-center">
        <AdminTitle
          title="Productos"
          subtitle="Aquí puedes ver y administrar tus productos"
        />

        <div className="flex justify-end mb-10 gap-4">
          <Link to="/admin/products/new">
            <Button>
              <PlusIcon />
              Nuevo producto
            </Button>
          </Link>
        </div>
      </div>

      <Table className="bg-white p-10 shadow-xs border border-gray-200 mb-10">
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">ID</TableHead>
            <TableHead>Imagen</TableHead>
            <TableHead>Nombre</TableHead>
            <TableHead>Precio</TableHead>
            <TableHead>Categoría</TableHead>
            <TableHead>Inventario</TableHead>
            <TableHead>Tallas</TableHead>
            <TableHead className="text-right">Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.products?.map((product) => (
            <TableRow key={product.id}>
              <TableCell className="font-medium">{product.id}</TableCell>
              <TableCell>
                <img
                  src={product.images[0]}
                  alt="Product"
                  className="w-20 h-20 object-cover rounded-md"
                />
              </TableCell>
              <TableCell>   {product.title}</TableCell>
              <TableCell> {CurrencyFormatter(product.price)}</TableCell>
              <TableCell> {product.tags.join(', ')}</TableCell>
              <TableCell> {product.stock}</TableCell>
              <TableCell>
                <div className="flex gap-1">
                  {product.sizes.map(size => {
                    const variant = (
                      size === 'XS' ? 'info' :
                        size === 'S' ? 'success' :
                          size === 'M' ? 'warning' :
                            size === 'L' ? 'error' :
                              size === 'XL' ? 'destructive' :
                                'secondary'
                    ) as any; // Cast to any to avoid strict type checking issues with the dynamic variant string if strictly typed

                    return (
                      <Badge key={size} variant={variant} className='w-8 justify-center'>
                        {size}
                      </Badge>
                    )
                  })}
                </div>
              </TableCell>
              <TableCell className="text-right">
                {/* <Link to={`t-shirt-teslo`}>Editar</Link> */}
                <Link to={`/admin/products/${product.id}`}>
                  <PencilIcon className="w-4 h-4 text-blue-600" />
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <CustomPagination totalPages={data?.pages ?? 6} />
    </>
  );
};
