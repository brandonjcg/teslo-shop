import type { Size } from '@/interfaces';
import clsx from 'clsx';

interface Props {
  selectedSize?: Size;
  sizes: Size[];
}

export const SizeSelector = ({ selectedSize, sizes }: Props) => {
  return (
    <div className="my-5">
      <h3 className="font-bold mb-4">Available sizes</h3>

      <div className="flex">
        {sizes.map((size) => (
          <button
            key={size}
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
