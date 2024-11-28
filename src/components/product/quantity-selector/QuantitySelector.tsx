import { IoAddCircleOutline, IoRemoveCircleOutline } from 'react-icons/io5';

interface Props {
  quantity: number;
  limit?: number;
  onQuantityChanged: (quantity: number) => void;
}

export const QuantitySelector = ({
  quantity,
  limit = 10,
  onQuantityChanged,
}: Props) => {
  const onValueChanged = (value: number) => onQuantityChanged(value);

  return (
    <div className="flex items-center">
      <button
        onClick={() => onValueChanged(quantity - 1)}
        disabled={quantity === 1}
      >
        <IoRemoveCircleOutline size={30} />
      </button>

      <span className="w-20 mx-3 px-5 bg-gray-200 text-center rounded">
        {quantity}
      </span>

      <button
        onClick={() => onValueChanged(quantity + 1)}
        disabled={quantity === limit}
      >
        <IoAddCircleOutline size={30} />
      </button>
    </div>
  );
};
