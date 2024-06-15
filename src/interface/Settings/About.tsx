import React from "react";
import { LuHelpCircle, LuCode2, LuFile, LuBug, LuLightbulb, LuExternalLink } from "react-icons/lu";

import SettingsItem from './SettingsItem';
import { appContext } from "../../context";
import { IoIosGlobe } from "react-icons/io";

const About: React.FC = () => {
    return (
        <>
            <SettingsItem icon={<LuHelpCircle />} name="About" description="Additional information about the application.">
                <div className="w-full h-full flex flex-col items-start justify-start gap-4">
                    <p className="text-neutral-300 text-[12px] font-medium">Version: <span className="font-normal">{appContext.version}</span></p>
                    
                    <div className="flex flex-col items-start justify-start gap-2">
                        <p className="text-neutral-300 text-[12px] font-medium">Useful links:</p>

                        <div className="flex items-start justify-start gap-4">
                            <div className="flex flex-col items-start justify-start gap-1">
                                <button className="flex items-center justify-between gap-1 text-neutral-300 text-[12px] rounded-sm px-[6px] py-[2px] hover:bg-item-within">
                                    <LuCode2 />
                                    
                                    <p>Source code</p>
                                </button>

                                <button className="flex items-center justify-between gap-1 text-neutral-300 text-[12px] rounded-sm px-[6px] py-[2px] hover:bg-item-within">
                                    <LuFile />
                                    
                                    <p>License</p>
                                </button>
                            </div>

                            <div className="flex flex-col items-start justify-start gap-1">
                                <button className="flex items-center justify-between gap-1 text-neutral-300 text-[12px] rounded-sm px-[6px] py-[2px] hover:bg-item-within">
                                    <LuBug />
                                    
                                    <p>Report a bug</p>
                                </button>

                                <button className="flex items-center justify-between gap-1 text-neutral-300 text-[12px] rounded-sm px-[6px] py-[2px] hover:bg-item-within">
                                    <LuLightbulb />
                                    
                                    <p>Suggest a feature</p>
                                </button>
                            </div>

                            <div className="flex flex-col items-start justify-start gap-1">
                                <button className="flex items-center justify-between gap-1 text-neutral-300 text-[12px] rounded-sm px-[6px] py-[2px] hover:bg-item-within">
                                    <LuExternalLink />
                                    
                                    <p>Third party licenses</p>
                                </button>

                                <button className="flex items-center justify-between gap-1 text-neutral-300 text-[12px] rounded-sm px-[6px] py-[2px] hover:bg-item-within">
                                    <IoIosGlobe />
                                    
                                    <p>Website</p>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </SettingsItem>
        </>
    );
};

export default About;
