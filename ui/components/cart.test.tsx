// Cart.test.tsx
import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import Cart, { CartItem } from "./cart";

// Mocked data
const mockCartItems = [
  {
    name: "Item 1",
    price: "100",
    onClickMinus: jest.fn(),
    onClickPlus: jest.fn(),
    count: 2,
  },
  {
    name: "Item 2",
    price: "200",
    onClickMinus: jest.fn(),
    onClickPlus: jest.fn(),
    count: 1,
  },
];

describe("CartItem Component", () => {
  it("renders correctly with given props", () => {
    render(<CartItem {...mockCartItems[0]} />);

    expect(screen.getByText("Item 1")).toBeInTheDocument();
    expect(screen.getByText("100₺")).toBeInTheDocument();
    expect(screen.getByText("2")).toBeInTheDocument();
  });

  it("calls onClickMinus when minus button is clicked", () => {
    render(<CartItem {...mockCartItems[0]} />);

    fireEvent.click(screen.getByRole("button", { name: /minus/i }));
    expect(mockCartItems[0].onClickMinus).toHaveBeenCalled();
  });

  it("calls onClickPlus when plus button is clicked", () => {
    render(<CartItem {...mockCartItems[0]} />);

    fireEvent.click(screen.getByRole("button", { name: /plus/i }));
    expect(mockCartItems[0].onClickPlus).toHaveBeenCalled();
  });
});

describe("Cart Component", () => {
  it("renders multiple CartItem components", () => {
    render(<Cart cartItems={mockCartItems} />);

    expect(screen.getByText("Item 1")).toBeInTheDocument();
    expect(screen.getByText("Item 2")).toBeInTheDocument();
  });
});
