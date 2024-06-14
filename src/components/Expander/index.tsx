import React, { useState } from "react";
import { IoIosArrowForward } from "react-icons/io";

import { cn } from "../../utils/cn";

interface ExpanderProps {
    title: string;
    children?: React.ReactNode;
}

const Expander: React.FC<ExpanderProps> = ({ title, children }) => {
    const [opened, setOpened] = useState<boolean>(true);

    return (
        <>
            <div className="w-full flex flex-col items-center justify-start gap-1">
                <button onClick={() => setOpened(!opened)} className="w-full h-8 flex items-center justify-start text-neutral-400 text-[14px] px-6 gap-2">
                    <IoIosArrowForward className={cn("transition-all duration-800", opened ? "rotate-90" : "")} />
                    
                    <p>{title}</p>
                </button>
                
                <div className={cn("w-full flex flex-col items-center justify-start transition-all overflow-hidden ease-in-out duration-800", opened ? "h-auto mb-4" : "h-0 mb-0")}>
                    {children}
                </div>
            </div>
        </>
    );
};

export default Expander;
