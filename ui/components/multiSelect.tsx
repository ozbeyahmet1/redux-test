import { useState } from "react";
import { FaChevronCircleDown } from "react-icons/fa";
import { IoSearchSharp } from "react-icons/io5";
import { TiTick } from "react-icons/ti";
export interface MultiSelectOption {
  label: string;
  value: string;
}

interface MultiSelectProps {
  options: MultiSelectOption[];
  name: string;
  onChange: (selectedValues: string[]) => void;
  MultiSelectName: string;
  loading: boolean;
}

/**
 * Renders a multi-select component.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {Array} props.options - The options for the multi-select group.
 * @param {string} props.name - The name of the multi-select group.
 * @param {Function} props.onChange - The function to be called when the selected values change.
 * @returns {JSX.Element} The rendered multi-select component.
 */
export default function MultiSelect({ options, name, onChange, MultiSelectName, loading }: MultiSelectProps) {
  const [selectedValues, setSelectedValues] = useState<string[]>([]);

  const handleChange = (value: string) => {
    setSelectedValues((prevSelected) => {
      const isSelected = prevSelected.includes(value);
      const updatedSelected = isSelected ? prevSelected.filter((v) => v !== value) : [...prevSelected, value];
      onChange(updatedSelected);
      return updatedSelected;
    });
  };

  const [isCollapsed, setIsCollapsed] = useState(false);
  return (
    <div>
      <div className="flex flex-col">
        <div className="flex items-center justify-between bg-white p-5 lg:bg-transparent lg:p-0">
          <p className="text-[#333333] mb-2 text-xs">{MultiSelectName}</p>
          <FaChevronCircleDown
            className={`flex lg:hidden text-primary ${
              isCollapsed ? "rotate-180" : "rotate-0"
            } transition-all duration-300`}
            onClick={() => setIsCollapsed(() => !isCollapsed)}
          />
        </div>
        <div className="hidden bg-white   p-4 lg:flex flex-col gap-4 shadow-2xl">
          <div className="bg-gray-100 p-2 flex items-center gap-2">
            <IoSearchSharp fill="000000" size={24} />
            <input
              type="text"
              className="appearance-none bg-transparent border-none w-full placeholder:text-[#626B8B] placeholder:text-sm leading-tight focus:outline-none"
              placeholder="Search"
            />
          </div>
          {loading ? (
            <div className=" flex flex-col gap-3 h-[130px] overflow-auto">
              {Array.from({ length: 12 }).map((_, index) => (
                <div className="w-3/4 bg-gray-300 h-5 animate-pulse rounded-sm text-transparent" key={index}>
                  s
                </div>
              ))}
            </div>
          ) : (
            <div className=" flex flex-col gap-3 h-[130px] overflow-auto">
              {options.map((option) => (
                <div key={option.value} className="flex items-center gap-2 h-5">
                  <label
                    htmlFor={option.value}
                    className={`${selectedValues.includes(option.value) && `bg-primary`} h-5 rounded-md`}>
                    <div className="cursor-pointer w-5 h-5 flex items-center justify-center border-2 rounded-md border-primary border-solid">
                      <input
                        type="checkbox"
                        name={name}
                        id={option.value}
                        value={option.value}
                        checked={selectedValues.includes(option.value)}
                        onChange={() => handleChange(option.value)}
                        className="cursor-pointer form-checkbox text-blue-600 appearance-none border-1 border-blue-500 w-4 h-4 rounded-sm checked:bg-primary  p-[6px] transition-all duration-300"
                      />
                      {selectedValues.includes(option.value) && (
                        <p className="static h-5 w-full -ml-3 mt-1">
                          <TiTick fill="white" />
                        </p>
                      )}
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

        {isCollapsed && (
          <div
            className={`flex bg-white p-4 lg:hidden flex-col gap-3 shadow-2xl h-[130px] overflow-auto ${
              isCollapsed ? "animate-slideDown" : "animate-slideUp"
            }`}>
            {options.map((option) => (
              <div key={option.value} className="flex items-center gap-2 h-5">
                <label
                  htmlFor={option.value}
                  className={`${selectedValues.includes(option.value) && `bg-primary`} h-5 rounded-md`}>
                  <div className="cursor-pointer w-5 h-5 flex items-center justify-center border-2 rounded-md border-primary border-solid">
                    <input
                      type="checkbox"
                      name={name}
                      id={option.value}
                      value={option.value}
                      checked={selectedValues.includes(option.value)}
                      onChange={() => handleChange(option.value)}
                      className="cursor-pointer form-checkbox text-blue-600 appearance-none border-1 border-blue-500 w-4 h-4 rounded-sm checked:bg-primary  p-[6px] transition-all duration-300"
                    />
                    {selectedValues.includes(option.value) && (
                      <p className="static h-5 w-full -ml-3 mt-1">
                        <TiTick fill="white" />
                      </p>
                    )}
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
    </div>
  );
}
