"use client";

import Card from "@/ui/components/card";
import SkeletonCard from "@/ui/components/cardSkeleton";
import Cart from "@/ui/components/cart";
import MultiSelect, { MultiSelectOption } from "@/ui/components/multiSelect";
import Pagination from "@/ui/components/pagination";
import RadioGroup, { RadioGroupOption } from "@/ui/components/radioGroup";
import TotalPrice from "@/ui/components/totalPrice";
import useFetchProducts from "@/utils/useFetchProducts";
import Navbar from "@layouts/navbar";
import { useEffect, useState } from "react";

/**
 * Represents the query parameters used for fetching products.
 */
interface Query {
  sortBy: string;
  brands: string[];
  models: string[];
  page: number;
  limit: number;
}

/**
 * Component for displaying and filtering products.
 * @returns JSX.Element
 */
export default function Home() {
  const [selectedSortOption, setSelectedSortOption] = useState<string>("old-to-new");
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedModels, setSelectedModels] = useState<string[]>([]);
  const [url, setUrl] = useState<string>("");
  const [totalUrl, setTotalUrl] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const options: RadioGroupOption[] = [
    { label: "Old to new", value: "old-to-new" },
    { label: "New to old", value: "new-to-old" },
    { label: "Price high to low", value: "price-high-to-low" },
    { label: "Price low to high", value: "price-low-to-high" },
  ];

  useEffect(() => {
    const query: Query = {
      sortBy: selectedSortOption,
      brands: selectedBrands,
      models: selectedModels,
      page: page,
      limit: 12,
    };
    setUrl(queryToUrl(query));
    setTotalUrl(totalQueryToUrl(query));
  }, [selectedSortOption, selectedBrands, selectedModels, page]);

  const { products, loading } = useFetchProducts(url);
  const { products: totalProducts } = useFetchProducts(totalUrl);
  // Generate unique brand options for MultiSelect
  const brands: MultiSelectOption[] = products.reduce<MultiSelectOption[]>((acc, product) => {
    if (!acc.find((option) => option.value === product.brand)) {
      acc.push({ label: product.brand, value: product.brand });
    }
    return acc;
  }, []);

  // Generate unique model options for MultiSelect
  const models: MultiSelectOption[] = products.reduce<MultiSelectOption[]>((acc, product) => {
    if (!acc.find((option) => option.value === product.model)) {
      acc.push({ label: product.model, value: product.model });
    }
    return acc;
  }, []);

  /**
   * Handles the change event for the radio group.
   * @param value The selected value from the radio group.
   */
  const handleRadioChange = (value: string) => {
    setSelectedSortOption(value);
  };

  /**
   * Creates a change handler for the multi-select components.
   * @param setSelectedValues The state setter function for the selected values.
   * @returns A function that updates the selected values state.
   */
  const handleMultiSelectChange =
    <T extends string>(setSelectedValues: React.Dispatch<React.SetStateAction<T[]>>) =>
    (values: T[]) => {
      setSelectedValues(values);
      setPage(1);
    };

  /**
   * Converts a query object to a URL with query parameters.
   * @param query The query object containing filter options.
   * @returns A URL string with the query parameters.
   */
  function queryToUrl(query: Query): string {
    const baseUrl = "https://5fc9346b2af77700165ae514.mockapi.io/products";

    const sortByMap: { [key in Query["sortBy"]]: string } = {
      "old-to-new": "createdAt&order=asc",
      "new-to-old": "createdAt&order=desc",
      "price-high-to-low": "price&order=desc",
      "price-low-to-high": "price&order=asc",
    };

    const brandParam = query.brands.length > 0 ? `brand=${query.brands.join(",")}` : "";
    const modelParam = query.models.length > 0 ? `model=${query.models.join(",")}` : "";
    const pageParam = `page=${query.page}`;
    const limitParam = `limit=${query.limit}`;
    const sortByParam = `sortBy=${sortByMap[query.sortBy]}`;
    const params = [brandParam, modelParam, pageParam, limitParam, sortByParam]
      .filter((param) => param !== "")
      .join("&");

    return `${baseUrl}?${params}`;
  }

  function totalQueryToUrl(query: Query): string {
    const baseUrl = "https://5fc9346b2af77700165ae514.mockapi.io/products";

    const sortByMap: { [key in Query["sortBy"]]: string } = {
      "old-to-new": "createdAt&order=asc",
      "new-to-old": "createdAt&order=desc",
      "price-high-to-low": "price&order=desc",
      "price-low-to-high": "price&order=asc",
    };

    const brandParam = query.brands.length > 0 ? `brand=${query.brands.join(",")}` : "";
    const modelParam = query.models.length > 0 ? `model=${query.models.join(",")}` : "";
    const limitParam = `limit=${query.limit}`;
    const sortByParam = `sortBy=${sortByMap[query.sortBy]}`;
    const params = [brandParam, modelParam, limitParam, sortByParam].filter((param) => param !== "").join("&");

    return `${baseUrl}?${params}`;
  }

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
              onChange={handleMultiSelectChange(setSelectedBrands)}
              MultiSelectName="Brands"
              loading={loading}
            />
            <MultiSelect
              options={models}
              name="product-sorting"
              onChange={handleMultiSelectChange(setSelectedModels)}
              MultiSelectName="Models"
              loading={loading}
            />
          </div>
          <div className="flex-[3.8] w-full">
            <div className="gap-5 grid grid-auto-flow grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {loading
                ? Array.from({ length: 12 }).map((_, index) => <SkeletonCard key={index} />)
                : products.map((product) => (
                    <Card
                      key={product.id}
                      image={{
                        src: product.image,
                        alt: product.name,
                      }}
                      name={product.name}
                      price={product.price}
                    />
                  ))}
            </div>
            <div className="flex items-center gap-2 mt-10 mb-20 w-full justify-center">
              <Pagination
                currentPage={page}
                totalPages={Math.ceil(totalProducts.length / 12)}
                onPageChange={(selectedPage) => setPage(selectedPage)}
              />
            </div>
          </div>
          <div className="flex-1 w-full flex flex-col gap-4">
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
            <TotalPrice price={27000} />
          </div>
        </div>
      </div>
    </main>
  );
}
