import React, { useState } from "react";
import { LuCheck } from "react-icons/lu";

import { cn } from "../../utils/cn";

interface CheckboxProps {
    text: string;
    defaultState: boolean;
    onCheck?: (checked: boolean) => void;
    className: string;
}

const Checkbox: React.FC<CheckboxProps> = ({ text, defaultState, onCheck, className }) => {
    const [checked, setChecked] = useState<boolean>(defaultState);

    const onCheckboxCheck = () => {
        setChecked(!checked);

        if (onCheck) {
            onCheck(checked);
        }
    };

    return (
        <>
            <button onClick={onCheckboxCheck} className="flex items-center justify-center gap-2">
                <div className={cn("h-3 w-3 flex items-center justify-center rounded-sm", className)}>
                    {checked &&
                        <LuCheck className="text-neutral-300 text-[10px]" />
                    }
                </div>

                <p className="text-neutral-300 text-[12px] mb-[1.5px]">{text}</p>
            </button>
        </>
    );
};

export default Checkbox;
