"use client";
import Card from "@/ui/components/card";
import Cart from "@/ui/components/cart";
import MultiSelect, { MultiSelectOption } from "@/ui/components/multiSelect";
import RadioGroup, { RadioGroupOption } from "@/ui/components/radioGroup";
import TotalPrice from "@/ui/components/totalPrice";
import Navbar from "@layouts/navbar";
import { useState } from "react";
export default function Home() {
  const options: RadioGroupOption[] = [
    { label: "Old to new", value: "oldToNew" },
    { label: "New to old", value: "newToOld" },
    { label: "Price high to low", value: "priceHighToLow" },
    { label: "Price low to high", value: "priceLowToHigh" },
  ];

  const brands: MultiSelectOption[] = [
    { label: "Apple", value: "apple" },
    { label: "Samsung", value: "samsung" },
    { label: "Xiaomi", value: "xiaomi" },
    { label: "Huawei", value: "huawei" },
    { label: "Oppo", value: "oppo" },
    { label: "Vivo", value: "vivo" },
  ];

  const models: MultiSelectOption[] = [
    { label: "iPhone 13 Pro Max", value: "iphone13ProMax" },
    { label: "Galaxy S21 Ultra", value: "galaxyS21Ultra" },
    { label: "Mi 11 Ultra", value: "mi11Ultra" },
    { label: "P50 Pro", value: "p50Pro" },
    { label: "Find X3 Pro", value: "findX3Pro" },
    { label: "X60 Pro", value: "x60Pro" },
  ];
  const handleRadioChange = (value: string) => {
    console.log("Selected value:", value);
  };
  const [selectedValues, setSelectedValues] = useState<string[]>([]);

  const handleMultiSelectChange = (values: string[]) => {
    setSelectedValues(values);
  };

  return (
    <main className="">
      <Navbar />
      <div className="container mx-auto px-6 lg:px-0">
        <div className="flex flex-col lg:flex-row items-start gap-7 pt-40 lg:pt-20">
          <div className="flex-[1.2] w-full flex flex-col gap-6">
            <RadioGroup options={options} name="sortOptions" onChange={handleRadioChange} />
            <MultiSelect
              options={brands}
              name="product-sorting"
              onChange={handleMultiSelectChange}
              MultiSelectName="Brands"
            />
            <MultiSelect
              options={models}
              name="product-sorting"
              onChange={handleMultiSelectChange}
              MultiSelectName="Models"
            />
          </div>

          <div className="flex-[3.8] w-full gap-5 grid grid-auto-flow grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            <Card
              image={{
                src: "https://loremflickr.com/640/480/food",
                alt: "iPhone 13 Pro Max 256Gb",
              }}
              name="iPhone 13 Pro Max 256Gb"
              price={15000}
              onClick={() => {}}
            />
            <Card
              image={{
                src: "https://loremflickr.com/640/480/food",
                alt: "iPhone 13 Pro Max 256Gb",
              }}
              name="iPhone 13 Pro Max 256Gb"
              price={15000}
              onClick={() => {}}
            />
            <Card
              image={{
                src: "https://loremflickr.com/640/480/food",
                alt: "iPhone 13 Pro Max 256Gb",
              }}
              name="iPhone 13 Pro Max 256Gb"
              price={15000}
              onClick={() => {}}
            />
            <Card
              image={{
                src: "https://loremflickr.com/640/480/food",
                alt: "iPhone 13 Pro Max 256Gb",
              }}
              name="iPhone 13 Pro Max 256Gb"
              price={15000}
              onClick={() => {}}
            />
          </div>
          <div className="flex-1  w-full flex flex-col gap-4">
            <Cart
              cartItems={[
                {
                  name: "iPhone 13 Pro Max 256Gb",
                  price: 15000,
                  count: 1,
                  onClickMinus: () => {},
                  onClickPlus: () => {},
                },
                {
                  name: "Galaxy S21 Ultra 256Gb",
                  price: 12000,
                  count: 1,
                  onClickMinus: () => {},
                  onClickPlus: () => {},
                },
              ]}
            />
            <TotalPrice price={117} />
          </div>
        </div>
      </div>
    </main>
  );
}
