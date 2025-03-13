import { type Size } from '@/interfaces/products.interface';
import clsx from 'clsx';

interface Props {
  selectedSize?: Size;
  sizes: Size[];
  onSizeChange: (size: Size) => void;
}

export const SizeSelector = ({ selectedSize, sizes, onSizeChange }: Props) => {
  return (
    <div className="my-5">
      <h3 className="font-bold mb-4">Available sizes</h3>

      <div className="flex">
        {sizes.map((size) => (
          <button
            key={size}
            onClick={() => onSizeChange(size)}
            className={clsx('mx-2 hover:underline text-lg', {
              underline: size === selectedSize,
            })}
          >
            {size}
          </button>
        ))}
      </div>
    </div>
  );
};
