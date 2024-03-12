import React from "react";

import icon_white from "../assets/icon_white.png";

const Header: React.FC = () => {
    return (
        <>
            <header className="w-full h-16 bg-header flex items-center justify-between px-4 z-50">
                <div className="h-full flex items-center justify-start">
                    <img src={icon_white} className="h-10 w-10" />

                    <div className="flex flex-col items-start justify-center">
                        <p className="text-neutral-300 text-[12px] font-bold">Magnetar Toolbox</p>
                    </div>
                </div>
            </header>
        </>
    );
};

export default Header;
