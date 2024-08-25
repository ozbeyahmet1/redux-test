import { FaMinus, FaPlus } from "react-icons/fa";

interface CartItemProps {
  name: string;
  price: number;
  onClickMinus: () => void;
  onClickPlus: () => void;
  count: number;
}

export interface CartProps {
  cartItems: Array<CartItemProps>;
}

/**
 * Renders a cart item component.
 *
 * @component
 * @param {CartItemProps} props - The props for the CartItem component.
 * @param {string} props.name - The name of the item.
 * @param {number} props.price - The price of the item.
 * @param {() => void} props.onClickMinus - The function to handle the minus button click.
 * @param {() => void} props.onClickPlus - The function to handle the plus button click.
 * @param {number} props.count - The count of the item.
 * @returns {JSX.Element} The rendered CartItem component.
 */
function CartItem({ name, price, onClickMinus, onClickPlus, count }: CartItemProps) {
  return (
    <div className="flex justify-between text-sm items-start gap-4">
      <div>
        <p>{name}</p>
        <p className="text-primary">{price}₺</p>
      </div>
      <div className="flex items-center">
        <button onClick={onClickMinus} className="w-6 h-6 bg-[#F3F4F6] flex items-center justify-center">
          <FaMinus fill="#767676" size={12} />
        </button>
        <p className="bg-primary w-6 h-6 flex items-center text-white justify-center">{count}</p>
        <div>
          <button onClick={onClickPlus} className="w-6 h-6 bg-[#F3F4F6] flex items-center justify-center">
            <FaPlus fill="#767676" size={12} />
          </button>
        </div>
      </div>
    </div>
  );
}
export default function Cart({ cartItems }: CartProps) {
  return (
    <div className="bg-white   p-4 lg:flex flex-col gap-4 shadow-2xl">
      {cartItems.map((cartItem) => {
        return <CartItem {...cartItem} />;
      })}
    </div>
  );
}
