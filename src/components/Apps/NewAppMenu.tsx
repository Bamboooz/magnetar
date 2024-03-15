import React, { useEffect, useState } from "react";
import { invoke } from "@tauri-apps/api/tauri";

import Modal from "../common/Modal";

interface NewAppMenuProps {
    newAppMenuOpened: boolean;
    setNewAppMenuOpened: React.Dispatch<React.SetStateAction<boolean>>;
    filePath: string;
    setFilePath: React.Dispatch<React.SetStateAction<string>>;
    addNewApp: (filePath: string, icoPath: string, fileName: string) => void;
}

const NewAppMenu: React.FC<NewAppMenuProps> = ({ newAppMenuOpened, setNewAppMenuOpened, filePath, setFilePath, addNewApp }) => {
    const [fileNameInput, setFileNameInput] = useState<string>("");

    const savePEIcon = async (filePath: string) => {
        await invoke("save_pe_ico", { pePath: filePath })
            .then(icoPath => {
                addNewApp(filePath, icoPath as string, fileNameInput);
            })
            .catch(err => {
                console.error(err);
            });

            setNewAppMenuOpened(false);
    };

    const createThatNewApp = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (fileNameInput) {
            savePEIcon(filePath);
        }
    };

    useEffect(() => {
        // clear input on close
        if (!newAppMenuOpened) {
            setFileNameInput("");
            setFilePath("");
        }
    }, [newAppMenuOpened]);

    return (
        <>
            <Modal modalOpened={newAppMenuOpened} setModalOpened={setNewAppMenuOpened} className="flex flex-col items-center justify-start h-[30vh] w-[80vw]">
                <form autoComplete="off" onSubmit={createThatNewApp} className="w-full h-full flex flex-col items-center justify-center gap-4 text-neutral-300 p-10 text-[14px]">
                    <label htmlFor="name">New app name</label>
                    <input autoComplete="off" value={fileNameInput} onChange={(e) => setFileNameInput(e.target.value)} id="name" placeholder="New app name..." type="text" className="bg-transparent h-10 rounded-md px-4 outline-none w-full border border-border" />

                    <button type="submit" className="w-full h-10 rounded-md bg-accent transition-all hover:shadow-2xl hover:scale-[101%]">
                        Submit
                    </button>
                </form>
            </Modal>
        </>
    );
};

export default NewAppMenu;
