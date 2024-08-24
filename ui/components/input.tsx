import React from "react";
import { IconType } from "react-icons";

export interface InputProps {
  label: string;
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  icon?: IconType;
  error?: string;
}

/**
 * Renders an input component.
 *
 * @component
 * @param {Object} props - The input component props.
 * @param {string} [props.placeholder=""] - The placeholder text for the input.
 * @param {string} props.value - The value of the input.
 * @param {Function} props.onChange - The function to handle input changes.
 * @param {string} [props.type="text"] - The type of the input.
 * @param {React.ElementType} props.icon - The icon component to display alongside the input.
 * @returns {JSX.Element} The rendered input component.
 */
export default function Input({ placeholder = "", value, onChange, type = "text", icon: Icon }: InputProps) {
  return (
    <div className="bg-white px-4 h-9 items-center flex w-full lg:w-[380px]">
      <div className="flex items-center justify-center gap-2">
        {Icon && <Icon className="text-[#626B8B] size-6" />}
        <input
          className="appearance-none bg-transparent border-none w-full placeholder:text-[#626B8B] leading-tight focus:outline-none font-medium flex items-center justify-center"
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />
      </div>
    </div>
  );
}
