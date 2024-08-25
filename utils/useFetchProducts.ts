import { useEffect, useState } from "react";

/**
 * Defines the structure of a Product object.
 * @interface Product
 */
export interface Product {
  createdAt: string;
  name: string;
  image: string;
  price: string;
  description: string;
  model: string;
  brand: string;
  id: string;
}

/**
 * Custom hook to fetch products from a given URL.
 *
 * This hook manages the state of products, loading status, and any potential errors that might occur
 * during the fetch operation.
 *
 * @param url - The URL to fetch products from.
 *
 * @returns An object containing:
 * - `products`: The fetched products as an array of Product objects.
 * - `loading`: A boolean indicating if the data is still being fetched.
 * - `error`: A string containing any error message that occurred during the fetch, or null if no error.
 */
const useFetchProducts = (url: string) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // Make an API call with fetch
        const response = await fetch(url);

        // Check if the response is OK
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        // Parse JSON data
        const data: Product[] = await response.json();
        setProducts(data);
      } catch (err) {
        // Handle errors
        setError("Failed to fetch products.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [url]);

  return { products, loading, error };
};

export default useFetchProducts;
