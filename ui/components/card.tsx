/**
 * Represents a Card component.
 *
 * @remarks
 * This component displays a card with an image, name, price, and an "Add to Cart" button.
 *
 * @param image - The image object containing the source and alt text.
 * @param name - The name of the card.
 * @param onClick - The function to be called when the card is clicked.
 * @param price - The price of the card.
 *
 * @returns The rendered Card component.
 */
import Image from "next/image";

interface Image {
  src: string;
  alt: string;
}
export interface CardProps {
  name: string;
  price: string;
  image: Image;
}

export default function Card({ image, name, price }: CardProps) {
  return (
    <div className="w-full bg-white shadow-xl p-2 rounded-md flex flex-col animate-fade-in">
      <div className="w-full  bg-gray-500">
        <Image src={image.src} alt={image.alt} width={640} height={480} />
      </div>
      <div className="flex flex-col gap-3 pt-4 h-full items-start w-full">
        <p className="text-primary text-start">{price}₺</p>
        <div className="flex items-start justify-between flex-col h-full w-full">
          <p>{name}</p>
          <button
            onClick={() => {}}
            className="w-full bg-[#2A59FE] h-8 rounded-md text-white hover:bg-white hover:text-primary hover:border-primary border-2 border-solid duration-300">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
