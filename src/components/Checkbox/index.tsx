import React, { useState } from "react";
import { LuCheck } from "react-icons/lu";

import { cn } from "../../utils/cn";

interface CheckboxProps {
    defaultState: boolean;
    onCheck?: (checked: boolean) => {};
    className: string;
}

const Checkbox: React.FC<CheckboxProps> = ({ defaultState, onCheck, className }) => {
    const [checked, setChecked] = useState<boolean>(defaultState);

    const onCheckboxCheck = () => {
        setChecked(!checked);

        if (onCheck) {
            onCheck(checked);
        }
    };

    return (
        <>
            <button onClick={onCheckboxCheck} className={cn("h-3 w-3 flex items-center justify-center rounded-sm", className)}>
                {checked &&
                    <LuCheck className="text-neutral-300 text-[10px]" />
                }
            </button>
        </>
    );
};

export default Checkbox;
