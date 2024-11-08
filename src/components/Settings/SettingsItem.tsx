import React, { useState, useRef } from "react";
import { LuChevronUp } from "react-icons/lu";
import { useOnClickOutside } from "../../hooks/useOnClickOutside";

interface SettingsItemProps {
  icon: React.ReactElement;
  title: string;
  description: string;
}

const SettingsItem: React.FC<SettingsItemProps> = ({
  icon,
  title,
  description,
}) => {
  const [opened, setOpened] = useState(false);
  const [selectedOption, setSelectedOption] = useState("Dark");
  const dropdownRef = useRef<HTMLDivElement>(null);
  const options = ["Dark", "Light"];

  useOnClickOutside(dropdownRef, () => setOpened(false));

  const toggleDropdown = () => setOpened(!opened);

  const handleOptionClick = (option: string) => {
    setSelectedOption(option);
    setOpened(false);
  };

  return (
    <div className="w-full h-14 flex items-center justify-between px-6">
      <div className="flex items-center gap-6 text-neutral-300">
        {React.cloneElement(icon, { className: "text-3xl" })}

        <div className="flex flex-col items-start justify-center">
          <p className="text-md">{title}</p>
          <p className="text-sm text-neutral-400">{description}</p>
        </div>
      </div>

      <div ref={dropdownRef} className="relative flex flex-col">
        <button
          onClick={toggleDropdown}
          className="flex items-center justify-between p-2 gap-2 text-md text-neutral-400 bg-secondary border border-tertiary rounded-md"
        >
          <p>{selectedOption}</p>
          <LuChevronUp className={opened ? "rotate-180" : ""} />
        </button>

        {opened && (
          <div className="absolute top-full mt-1 w-full bg-secondary border border-tertiary rounded-md shadow-2xl z-10">
            {options.map((option) => (
              <button
                key={option}
                onClick={() => handleOptionClick(option)}
                className="w-full text-left p-2 text-md text-neutral-400 hover:bg-tertiary"
              >
                {option}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SettingsItem;
