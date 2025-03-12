'use client';

import { ProductImage as ProductImagePrisma } from '@prisma/client';
import clsx from 'clsx';
import { useForm } from 'react-hook-form';
import { createUpdateProduct } from '@/actions/products/create-update';
import { Product } from '@/interfaces/products.interface';
import { ICategory } from '@/interfaces/catalog.interface';
import { ProductImage } from '@/components/product/product-image/ProductImage';

interface Props {
  product: Partial<Product> & { ProductImage?: ProductImagePrisma[] };
  categories: ICategory[];
}

interface FormInputs {
  title: string;
  slug: string;
  description: string;
  price: number;
  inStock: number;
  sizes: string[];
  tags: string;
  gender: 'men' | 'women' | 'kid' | 'unisex';
  idCategory: string;
}

const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

export const ProductForm = ({ product, categories }: Props) => {
  const { handleSubmit, register, getValues, setValue, watch } =
    useForm<FormInputs>({
      defaultValues: {
        ...product,
        tags: product.tags?.join(', '),
        sizes: product.sizes || [],
      },
    });

  watch('sizes');

  const onSubmit = async (data: FormInputs) => {
    const formData = new FormData();

    const { ...productToSave } = data;

    if (product.id) formData.append('id', product.id ?? '');

    formData.append('title', productToSave.title);
    formData.append('slug', productToSave.slug);
    formData.append('description', productToSave.description);
    formData.append('price', productToSave.price.toString());
    formData.append('inStock', productToSave.inStock.toString());
    formData.append('sizes', productToSave.sizes.toString());
    formData.append('tags', productToSave.tags);
    formData.append('idCategory', productToSave.idCategory);
    formData.append('gender', productToSave.gender);

    const result = await createUpdateProduct(formData);
  };

  const onSizeChange = (size: string) => {
    const sizes = new Set(getValues('sizes'));

    if (sizes.has(size)) {
      sizes.delete(size);
    } else {
      sizes.add(size);
    }

    setValue('sizes', Array.from(sizes));
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="grid px-5 mb-16 grid-cols-1 sm:px-0 sm:grid-cols-2 gap-3"
    >
      {/* Textos */}
      <div className="w-full">
        <div className="flex flex-col mb-2">
          <span>Título</span>
          <input
            type="text"
            className="p-2 border rounded-md bg-gray-200"
            min={3}
            {...register('title', { required: true })}
          />
        </div>

        <div className="flex flex-col mb-2">
          <span>Slug</span>
          <input
            type="text"
            className="p-2 border rounded-md bg-gray-200"
            min={3}
            {...register('slug', { required: true })}
          />
        </div>

        <div className="flex flex-col mb-2">
          <span>Descripción</span>
          <textarea
            {...register('description', { required: true })}
            rows={5}
            className="p-2 border rounded-md bg-gray-200"
          ></textarea>
        </div>

        <div className="flex flex-col mb-2">
          <span>Price</span>
          <input
            type="number"
            {...register('price', { required: true, min: 0 })}
            className="p-2 border rounded-md bg-gray-200"
          />
        </div>

        <div className="flex flex-col mb-2">
          <span>Tags</span>
          <input
            type="text"
            {...register('tags', { required: true })}
            className="p-2 border rounded-md bg-gray-200"
          />
        </div>

        <div className="flex flex-col mb-2">
          <span>Gender</span>
          <select
            {...register('gender', { required: true })}
            className="p-2 border rounded-md bg-gray-200"
          >
            <option value="">[Seleccione]</option>
            <option value="men">Men</option>
            <option value="women">Women</option>
            <option value="kid">Kid</option>
            <option value="unisex">Unisex</option>
          </select>
        </div>

        <div className="flex flex-col mb-2">
          <span>Categoria</span>
          <select
            className="p-2 border rounded-md bg-gray-200"
            {...register('idCategory', { required: true })}
          >
            <option value="">[Seleccione]</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <button className="btn-primary w-full">Guardar</button>
      </div>

      <div className="w-full">
        <div className="flex flex-col mb-2">
          <span>Stock</span>
          <input
            type="number"
            className="p-2 border rounded-md bg-gray-200"
            {...register('inStock', { required: true, min: 0 })}
          />
        </div>
        <div className="flex flex-col">
          <span>Tallas</span>
          <div className="flex flex-wrap">
            {sizes.map((size) => (
              <div
                onClick={() => onSizeChange(size)}
                key={size}
                className={clsx(
                  'p-2 border cursor-pointer rounded-md mr-2 mb-2 w-14 transition-all text-center',
                  {
                    'bg-blue-500 text-white': getValues('sizes').includes(size),
                  },
                )}
              >
                <span>{size}</span>
              </div>
            ))}
          </div>

          <div className="flex flex-col mb-2">
            <span>Fotos</span>
            <input
              type="file"
              multiple
              className="p-2 border rounded-md bg-gray-200"
              accept="image/png, image/jpeg"
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {product.ProductImage?.map((image) => (
              <div key={image.id} className="relative">
                <ProductImage
                  alt={product.title ?? ''}
                  src={image.url}
                  width={300}
                  height={300}
                  className="rounded-t shadow-md"
                />
                <button
                  type="button"
                  className="btn-danger rounded-b-xl w-full"
                  onClick={() => console.log(image.id, image.url)}
                >
                  Eliminar
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </form>
  );
};
