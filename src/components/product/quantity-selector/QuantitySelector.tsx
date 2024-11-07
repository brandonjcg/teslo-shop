'use client';

import { useState } from 'react';
import { IoAddCircleOutline, IoRemoveCircleOutline } from 'react-icons/io5';

interface Props {
  quantity: number;
  limit?: number;
}

export const QuantitySelector = ({ quantity, limit = 10 }: Props) => {
  const [count, setCount] = useState(quantity);

  const onQuantityChange = (value: number) => setCount(value);

  return (
    <div className="flex items-center">
      <button
        onClick={() => onQuantityChange(count - 1)}
        disabled={count === 1}
      >
        <IoRemoveCircleOutline size={30} />
      </button>

      <span className="w-20 mx-3 px-5 bg-gray-200 text-center rounded">
        {count}
      </span>

      <button
        onClick={() => onQuantityChange(count + 1)}
        disabled={count === limit}
      >
        <IoAddCircleOutline size={30} />
      </button>
    </div>
  );
};
