import React from "react";
import { IoIosArrowForward } from "react-icons/io";

import { cn } from "../../utils/tw";

interface AudioViewProps {
    selectedPage: number;
    pageId: number;
}

const AudioView: React.FC<AudioViewProps> = ({ selectedPage, pageId }) => {
    return (
        <>
            <div className={cn(selectedPage === pageId ? "w-full h-full flex items-center justify-start py-2 px-6 gap-6" : "hidden")}>
                <div className="h-full w-[50%] flex flex-col items-start justify-start gap-3">
                    <p className="text-neutral-300 text-[14px]">Output devices:</p>

                    <div title="Huawei Bluetooth Headphones Lite" className="w-full h-10 flex items-center justify-between px-3 rounded-sm border border-border">
                        <p className="text-neutral-400 text-[14px] truncate">Huawei Bluetooth Headphones Lite</p>
                        <IoIosArrowForward className="text-neutral-400 text-[14px] rotate-90 shrink-0" />
                    </div>

                    <p className="text-neutral-400 text-[14px] mt-4">Volume:</p>
                    <div className="w-full h-4 relative flex items-center justify-start">
                        <div className="bg-accent rounded-l-full w-[10%] h-1" />
                        <div className="bg-border rounded-r-full w-full h-1" />
                        <div className="h-2 w-2 rounded-full bg-neutral-400 absolute left-[calc(10%-0.25rem)]" />
                    </div>
                </div>

                <div className="h-full w-[50%] flex flex-col items-start justify-start gap-3">
                    <p className="text-neutral-300 text-[14px]">Input devices:</p>

                    <div title="NC-1" className="w-full h-10 flex items-center justify-between px-3 rounded-sm border border-border">
                        <p className="text-neutral-400 text-[14px] truncate">NC-1</p>
                        <IoIosArrowForward className="text-neutral-400 text-[14px] rotate-90 shrink-0" />
                    </div>

                    <p className="text-neutral-400 text-[14px] mt-4">Volume:</p>
                    <div className="w-full h-4 relative flex items-center justify-start">
                        <div className="bg-accent rounded-l-full w-[80%] h-1" />
                        <div className="bg-border rounded-r-full w-[calc(100%-80%)] h-1" />
                        <div className="h-2 w-2 rounded-full bg-neutral-400 absolute left-[calc(80%-0.25rem)]" />
                    </div>
                </div>
            </div>
        </>
    );
};

export default AudioView;
