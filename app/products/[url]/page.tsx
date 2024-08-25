"use client";
import { addToProduct, decreaseProductNumber, increaseProductNumber, selectTotalPrice } from "@/state/slices/cartSlice";
import { AppDispatch, RootState } from "@/state/store";
import { CartItem } from "@/ui/components/cart";
import TotalPrice from "@/ui/components/totalPrice";
import Navbar from "@/ui/layouts/navbar";
import useFetchProducts, { Product } from "@/utils/useFetchProducts";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";

export default function PDP() {
  const pathname = usePathname();
  const { products, loading } = useFetchProducts(
    "https://5fc9346b2af77700165ae514.mockapi.io/products?name=" + pathname.replace("/products/", ""),
  );
  const product = products ? products[0] : null;
  const dispatch = useDispatch<AppDispatch>();
  const cart = useSelector((state: RootState) => state.cart);
  const totalPrice = useSelector((state: RootState) => selectTotalPrice(state.cart));
  const handleAddProduct = (selectedProduct: Product) => {
    dispatch(addToProduct(selectedProduct));
  };

  const handleIncreaseQuantity = (productId: string) => {
    dispatch(increaseProductNumber(productId));
  };

  const handleDecreaseQuantity = (productId: string) => {
    dispatch(decreaseProductNumber(productId));
  };

  const addedToCart = cart.items.some((item) => item.id === product?.id);
  return (
    <main className="">
      <Navbar />
      <div className="w-full flex flex-col lg:flex-row items-start container mx-auto pt-32 gap-10">
        <div className="h-full flex-[5]">
          <div className="bg-white w-full shadow-2xl p-4 pb-6 flex flex-col lg:flex-row items-start gap-10">
            <div className="w-full lg:w-[60%]">
              {loading ? (
                <div className="animate-pulse bg-gray-400 h-[422px]"></div>
              ) : (
                <Image
                  src={product?.image || ""}
                  width={549}
                  height={422}
                  alt=""
                  className="w-full aspect-[1.3] animate-fade-in"
                />
              )}
            </div>
            <div className="pt-4 w-full lg:w-[40%]">
              {loading ? (
                <div>
                  <p className="w-1/2 h-6 animate-pulse bg-gray-400 mb-3"></p>
                  <p className="w-1/5 h-6 animate-pulse bg-gray-400 mb-10"></p>
                  <button className="w-full mb-10 bg-gray-400 text-xl animate-pulse flex items-center justify-center py-2 rounded-md text-transparent">
                    Add to Cart
                  </button>
                  <p className="w-full h-40 animate-pulse bg-gray-400 mt-3"></p>
                </div>
              ) : (
                <div>
                  <p className="text-2xl mb-3 animate-fade-in">{product?.name}</p>
                  <p className="text-2xl text-[#2A59FE] mb-10 animate-fade-in">{product?.price}</p>
                  <button
                    className={`w-full mb-10 py-2 text-xl rounded-md text-white  hover:text-primary hover:border-primary border-2 border-solid duration-300 ${addedToCart ? "bg-green-400" : "bg-[#2A59FE] hover:bg-white"}`}
                    onClick={() => handleAddProduct(product as Product)}>
                    {addedToCart ? "Added" : "Add To Cart"}
                  </button>
                  <p className="text-md w-[95%] animate-fade-in">{product?.description}</p>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="flex-1 w-full flex flex-col gap-4">
          {cart.items.length > 0 && (
            <div className="p-2 bg-white shadow-2xl gap-4 flex flex-col">
              {cart?.items?.map((cartItem) => {
                return (
                  <CartItem
                    count={cartItem.quantity}
                    name={cartItem.name}
                    onClickMinus={() => handleDecreaseQuantity(cartItem.id)}
                    onClickPlus={() => handleIncreaseQuantity(cartItem.id)}
                    price={cartItem.price}
                    key={cartItem.id}
                  />
                );
              })}
            </div>
          )}

          <TotalPrice price={totalPrice} />
        </div>
      </div>
    </main>
  );
}
