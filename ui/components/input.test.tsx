import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";

import { FaSearch } from "react-icons/fa"; // Örnek ikon
import Input from "./input";

describe("Input Component", () => {
  const mockOnChange = jest.fn();

  it("renders input with correct value", () => {
    render(<Input value="test value" onChange={mockOnChange} placeholder="Enter text" label="" />);

    const inputElement = screen.getByPlaceholderText("Enter text");
    expect(inputElement).toBeInTheDocument();
    expect(inputElement).toHaveValue("test value");
  });

  it("calls onChange when input value changes", () => {
    render(<Input value="" onChange={mockOnChange} placeholder="Enter text" label="" />);

    const inputElement = screen.getByPlaceholderText("Enter text");
    fireEvent.change(inputElement, { target: { value: "new value" } });

    expect(mockOnChange).toHaveBeenCalled();
  });

  it("renders input with icon if provided", () => {
    render(<Input value="" onChange={mockOnChange} placeholder="Enter text" icon={FaSearch} label="" />);

    const iconElement = screen.getByTestId("input-icon");
    expect(iconElement).toBeInTheDocument();
  });

  it("renders input without icon if not provided", () => {
    render(<Input value="" onChange={mockOnChange} placeholder="Enter text" label="" />);

    const iconElement = screen.queryByTestId("input-icon");
    expect(iconElement).toBeNull();
  });
});
