import { fireEvent, render, screen } from "@testing-library/react";
import Card, { CardProps } from "./card";

describe("Card Component", () => {
  const mockProps: CardProps = {
    name: "Test Product",
    price: "100",
    image: { src: "/test-image.jpg", alt: "Test Image" },
    onClick: jest.fn(),
    addedToCart: false,
  };

  it("renders the Card component with correct content", () => {
    render(<Card {...mockProps} />);

    // Check if the image is rendered with correct src and alt attributes
    const imageElement = screen.getByAltText("Test Image");
    expect(imageElement).toBeInTheDocument();
    expect(imageElement).toHaveAttribute("src", expect.stringContaining("/_next/image"));

    // Check if the product name is rendered
    const nameElement = screen.getByText(mockProps.name);
    expect(nameElement).toBeInTheDocument();

    // Check if the product price is rendered
    const priceElement = screen.getByText(`${mockProps.price}₺`);
    expect(priceElement).toBeInTheDocument();

    // Check if the "Add To Cart" button is rendered
    const buttonElement = screen.getByText("Add To Cart");
    expect(buttonElement).toBeInTheDocument();
  });

  it("calls the onClick function when 'Add To Cart' button is clicked", () => {
    render(<Card {...mockProps} />);

    const buttonElement = screen.getByText("Add To Cart");
    fireEvent.click(buttonElement);

    // Check if the onClick function is called when the button is clicked
    expect(mockProps.onClick).toHaveBeenCalled();
  });

  it("renders 'Added' text when addedToCart is true", () => {
    render(<Card {...mockProps} addedToCart={true} />);

    // Check if the button text changes to 'Added'
    const buttonElement = screen.getByText("Added");
    expect(buttonElement).toBeInTheDocument();
  });
});
