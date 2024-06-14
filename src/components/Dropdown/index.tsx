import React, { useState } from "react";
import { LuChevronDown } from "react-icons/lu";

import { cn } from "../../utils/cn";

interface DropdownProps {
    values: string[];
    defaultIndex: number;
    className?: string;
    onSelect?: (index: number) => {};
}

const Dropdown: React.FC<DropdownProps> = ({ values, defaultIndex, className, onSelect }) => {
    const [expanded, setExpanded] = useState<boolean>(false);
    const [selectedIndex, setSelectedIndex] = useState<number>(defaultIndex);

    return (
        <>
            <div className="flex flex-col gap-1">
                <button onClick={() => setExpanded(!expanded)} className={cn("h-8 w-32 flex items-center justify-between px-2 bg-item-within rounded-[3px] text-neutral-300 text-[12px]", className)}>
                    <p>{values[selectedIndex]}</p>

                    <LuChevronDown className={cn("transition-all", expanded ? "-rotate-180" : "")} />
                </button>

                <div className={cn("w-32 flex flex-col items-start justify-start transition-all ease-in-out duration-800 overflow-hidden bg-item-within rounded-[3px] text-neutral-300 text-[12px]", expanded ? "h-auto" : "h-0")}>
                    {values.map((value, index) => (
                        <div key={index}>
                            <button className="h-8 w-full px-2 flex items-center justify-start">
                                <p>{value}</p>
                            </button>

                            <div className="h-[1px] w-full bg-border" />
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default Dropdown;
