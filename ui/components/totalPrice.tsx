export interface TotalPriceProps {
  price: number;
}

/**
 * Renders the total price component.
 *
 * @param {TotalPriceProps} props - The component props.
 * @param {number} props.price - The total price value.
 * @returns {JSX.Element} The rendered total price component.
 */
export default function TotalPrice({ price }: TotalPriceProps) {
  return (
    <div className="w-full p-2 bg-white shadow-2xl">
      <div className="flex items-center text-sm mb-4 gap-1">
        <p>Total Price:</p>
        <p className="text-primary font-bold">{price}₺</p>
      </div>
      <button className="bg-primary text-white py-3 w-full text-[13px]">Checkout</button>
    </div>
  );
}
