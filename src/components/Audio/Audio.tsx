import React from "react";

import { cn } from "../../utils/tw";

interface AudioViewProps {
    selectedPage: number;
    pageId: number;
}

const AudioView: React.FC<AudioViewProps> = ({ selectedPage, pageId }) => {
    return (
        <>
            <div className={cn(selectedPage === pageId ? "w-full h-full flex flex-col items-center justify-start overflow-auto" : "hidden")}>
               
            </div>
        </>
    );
};

export default AudioView;
