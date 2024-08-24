import { useState } from "react";
import { FaChevronCircleDown } from "react-icons/fa";
export interface RadioGroupOption {
  label: string;
  value: string;
}

interface RadioGroupProps {
  options: RadioGroupOption[];
  name: string;
  onChange: (value: string) => void;
}

/**
 * Renders a radio group component.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {Array} props.options - The options for the radio group.
 * @param {string} props.name - The name of the radio group.
 * @param {Function} props.onChange - The function to be called when the selected value changes.
 * @returns {JSX.Element} The rendered radio group component.
 */
export default function RadioGroup({ options, name, onChange }: RadioGroupProps) {
  const [selectedValue, setSelectedValue] = useState<string>("");

  const handleChange = (value: string) => {
    setSelectedValue(value);
    onChange(value);
  };
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div>
      <div className="flex items-center justify-between bg-white p-5 lg:bg-transparent lg:p-0">
        <p className="text-[#333333] mb-2 text-xs ">Sort By</p>
        <FaChevronCircleDown
          className={`flex lg:hidden text-primary ${isCollapsed ? `rotate-180` : `rotate-0`} transition-all duration-300`}
          onClick={() => setIsCollapsed(() => !isCollapsed)}
        />
      </div>
      <div className="hidden bg-white p-4 lg:flex flex-col gap-3 shadow-2xl">
        {options.map((option) => (
          <div key={option.value} className="flex items-center gap-2">
            <label htmlFor={option.value}>
              <div className="cursor-pointer bg-white w-5 h-5 flex items-center justify-center border-2 rounded-full border-primary border-solid">
                <input
                  type="radio"
                  name={name}
                  id={option.value}
                  value={option.value}
                  checked={selectedValue === option.value}
                  onChange={() => handleChange(option.value)}
                  className="cursor-pointer form-radio text-blue-600  appearance-none border-1 border-blue-500  w-2 h-2 rounded-full checked:bg-primary p-[6px] transition-all duration-300"
                />
              </div>
            </label>

            <label htmlFor={option.value} className="text-[#333333] text-sm cursor-pointer">
              {option.label}
            </label>
          </div>
        ))}
      </div>
      {isCollapsed && (
        <div
          className={`flex bg-white p-4 lg:hidden flex-col gap-3 shadow-2xl ${isCollapsed ? "animate-slideDown" : "animate-slideUp"} `}>
          {options.map((option) => (
            <div key={option.value} className="flex items-center gap-2">
              <label htmlFor={option.value}>
                <div className="cursor-pointer bg-white w-5 h-5 flex items-center justify-center border-2 rounded-full border-primary border-solid">
                  <input
                    type="radio"
                    name={name}
                    id={option.value}
                    value={option.value}
                    checked={selectedValue === option.value}
                    onChange={() => handleChange(option.value)}
                    className="cursor-pointer form-radio text-blue-600  appearance-none border-1 border-blue-500  w-2 h-2 rounded-full checked:bg-primary p-[6px] transition-all duration-300"
                  />
                </div>
              </label>

              <label htmlFor={option.value} className="text-[#333333] text-sm cursor-pointer">
                {option.label}
              </label>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
