import React, { useRef } from "react";

import { useOnClickOutside } from "../../hooks/useOnClickOutside";
import { cn } from "../../utils/cn";

interface ModalProps {
    modalOpened: boolean;
    setModalOpened: React.Dispatch<React.SetStateAction<boolean>>;
    className: string;
    children?: React.ReactNode;
    onExit?: () => void;
}

const Modal: React.FC<ModalProps> = ({ modalOpened, setModalOpened, className, children, onExit }) => {
    const modalRef = useRef<HTMLDivElement>(null);
    
    useOnClickOutside(modalRef, () => {
        if (onExit) {
            onExit();
        }
        
        setModalOpened(false);
    });

    return (
        <>
            <div className={cn("w-screen h-screen absolute top-0 left-0 z-40 bg-primary bg-opacity-50", modalOpened ? "flex items-center justify-center" : "hidden")}>
                <div ref={modalRef} className={cn("bg-primary z-50 shadow-2xl rounded-md border-solid border-[1px] border-border", className)}>
                    {children}
                </div>
            </div>
        </>
    );
};

export default Modal;
