import { waitFor } from "@testing-library/react";
import { renderHook } from "@testing-library/react-hooks";
import useFetchProducts, { Product } from "./useFetchProducts";

// Mocking fetch
global.fetch = jest.fn();

const mockProducts: Product[] = [
  {
    createdAt: "2024-08-23T10:00:00.000Z",
    name: "Product 1",
    image: "image1.jpg",
    price: "100",
    description: "Description 1",
    model: "Model 1",
    brand: "Brand 1",
    id: "1",
  },
  {
    createdAt: "2024-08-24T10:00:00.000Z",
    name: "Product 2",
    image: "image2.jpg",
    price: "200",
    description: "Description 2",
    model: "Model 2",
    brand: "Brand 2",
    id: "2",
  },
];

describe("useFetchProducts", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("fetches and sets products successfully", async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockProducts,
    });

    const { result } = renderHook(() => useFetchProducts("https://5fc9346b2af77700165ae514.mockapi.io/products"));

    expect(result.current.loading).toBe(true);

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.products).toEqual(mockProducts);
    expect(result.current.error).toBeNull();
  });

  it("handles fetch error", async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
    });

    const { result } = renderHook(() => useFetchProducts("http://example.com/products"));

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.products).toEqual([]);
    expect(result.current.error).toBe("Failed to fetch products.");
  });

  it("handles network error", async () => {
    (fetch as jest.Mock).mockRejectedValueOnce(new Error("Network error"));

    const { result } = renderHook(() => useFetchProducts("http://example.com/products"));

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.products).toEqual([]);
    expect(result.current.error).toBe("Failed to fetch products.");
  });
});
