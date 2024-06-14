import React from "react";
import { LuLanguages, LuPaintbrush, LuPackage, LuHelpCircle, LuCode2, LuFile, LuBug, LuLightbulb, LuExternalLink } from "react-icons/lu";

import Checkbox from "../../components/Checkbox";
import SettingsItem from "./SettingsItem";
import { cn } from "../../utils/cn";
import { appContext } from "../../context";
import Dropdown from "../../components/Dropdown";
import { IoIosGlobe } from "react-icons/io";

interface SettingsViewProps {
    selectedPage: number;
    pageId: number;
}

const SettingsView: React.FC<SettingsViewProps> = ({ selectedPage, pageId }) => {
    return (
        <>
            <div className={cn(selectedPage === pageId ? "w-full h-full flex flex-col items-start justify-start overflow-auto px-6 py-4 gap-4" : "hidden")}>
                <p className="text-neutral-300 font-semibold text-[16px]">Settings</p>

                <div className="w-full h-full flex flex-col items-center justify-start gap-2">
                    <SettingsItem icon={<LuLanguages />} name="Language" description="The app needs to be restarted to use another language.">
                        <Dropdown values={["English", "Polish"]} defaultIndex={0} />
                    </SettingsItem>

                    <SettingsItem icon={<LuPaintbrush />} name="Theme" description="Select which app theme to display.">
                        <Dropdown values={["Dark", "Light"]} defaultIndex={0} />
                    </SettingsItem>

                    <SettingsItem icon={<LuPackage />} name="Enabled modules" description="Choose which modules you want to be displayed in the navbar.">
                        <div className="w-full h-full flex flex-col items-start justify-start gap-2">
                            <div className="flex items-center justify-center gap-2">
                                <Checkbox defaultState={false} className="bg-item-within border-border" />

                                <p className="text-neutral-300 text-[12px] mb-[1.5px]">Apps</p>
                            </div>

                            <div className="flex items-center justify-center gap-2">
                                <Checkbox defaultState={false} className="bg-item-within border-border" />

                                <p className="text-neutral-300 text-[12px] mb-[1.5px]">Games</p>
                            </div>

                            <div className="flex items-center justify-center gap-2">
                                <Checkbox defaultState={false} className="bg-item-within border-border" />

                                <p className="text-neutral-300 text-[12px] mb-[1.5px]">Commands</p>
                            </div>

                            <div className="flex items-center justify-center gap-2">
                                <Checkbox defaultState={false} className="bg-item-within border-border" />

                                <p className="text-neutral-300 text-[12px] mb-[1.5px]">Folders</p>
                            </div>
                        </div>
                    </SettingsItem>
                
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
                </div>
            </div>
        </>
    );
};

export default SettingsView;
