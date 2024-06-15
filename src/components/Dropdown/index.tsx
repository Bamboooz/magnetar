import React, { useRef, useState } from "react";
import { LuChevronDown } from "react-icons/lu";

import { cn } from "../../utils/cn";
import { useOnClickOutside } from "../../hooks/useOnClickOutside";

interface DropdownProps {
    values: string[];
    defaultIndex: number;
    className?: string;
    onSelect?: (index: number) => void;
}

const Dropdown: React.FC<DropdownProps> = ({ values, defaultIndex, className, onSelect }) => {
    const [expanded, setExpanded] = useState<boolean>(false);
    const [selectedIndex, setSelectedIndex] = useState<number>(defaultIndex);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useOnClickOutside(dropdownRef, () => setExpanded(false));

    const handleSelect = (index: number) => {
        setExpanded(false);
        setSelectedIndex(index);

        if (onSelect) {
            onSelect(index);
        }
    };

    const toggleDropdown = (e: React.MouseEvent) => {
        e.stopPropagation();
        setExpanded(!expanded);
    };

    return (
        <div ref={dropdownRef} className="flex flex-col gap-1">
            <button onClick={toggleDropdown} className={cn("h-8 w-32 flex items-center justify-between px-2 bg-item-within rounded-[3px] text-neutral-300 text-[12px]", className)}>
                <p>{values[selectedIndex]}</p>

                <LuChevronDown className={cn("transition-all", expanded ? "-rotate-180" : "")} />
            </button>

            <div className={cn("w-32 flex flex-col items-start justify-start transition-all ease-in-out duration-800 overflow-hidden bg-item-within rounded-[3px] text-neutral-300 text-[12px]", expanded ? "h-auto" : "h-0")}>
                {values.map((value, index) => (
                    <div key={index} className="w-full h-8">
                        <button onClick={() => handleSelect(index)} className="h-full w-full px-2 flex items-center justify-start">
                            <p>{value}</p>
                        </button>

                        <div className="h-[1px] w-full bg-border" />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Dropdown;
