import React, { useEffect, useState } from "react";
import { invoke } from "@tauri-apps/api/tauri";
import { open } from "@tauri-apps/api/dialog";

import Modal from "../common/Modal";

interface NewAppMenuProps {
    newAppMenuOpened: boolean;
    setNewAppMenuOpened: React.Dispatch<React.SetStateAction<boolean>>;
    addNewApp: (filePath: string, icoPath: string, fileName: string) => void;
}

const NewAppMenu: React.FC<NewAppMenuProps> = ({ newAppMenuOpened, setNewAppMenuOpened, addNewApp }) => {
    const [filePath, setFilePath] = useState<string>("");
    const [icoPath, setIcoPath] = useState<string>("");
    const [fileNameInput, setFileNameInput] = useState<string>("");

    const savePEIcon = (filePath: string) => {
        invoke("save_pe_ico", { pePath: filePath })
            .then((icoPath) => {
                setIcoPath(icoPath as string);
                setFilePath(filePath);
            })
            .catch((err) => {
                console.error(err);
            });
    };

    const openNewAppDialog = () => {
        open({
            title: "Select an executable",
            multiple: false,
            filters: [{ name: "", extensions: ["exe"] }]
        }).then((path) => {
            if (typeof path === "string") {
                savePEIcon(path);
            }
        })
        .catch((err) => {
            console.error(err);
        });
    };

    const createThatNewApp = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        if (fileNameInput) {
            addNewApp(filePath, icoPath, fileNameInput);
        }
    };

    useEffect(() => {
        if (newAppMenuOpened)
            setNewAppMenuOpened(false);
            openNewAppDialog();
    }, [newAppMenuOpened]);

    return (
        <>
            <Modal modalOpened={newAppMenuOpened} setModalOpened={setNewAppMenuOpened} className="flex flex-col items-center justify-start h-[30vh] w-[80vw]">
                <form onSubmit={createThatNewApp} className="w-full h-full flex flex-col items-center justify-center gap-4 text-neutral-300 p-10 text-[14px]">
                    <label htmlFor="name">New app name</label>
                    <input value={fileNameInput} onChange={(e) => setFileNameInput(e.target.value)} id="name" placeholder="New app name..." type="text" className="bg-transparent h-10 rounded-md px-4 outline-none w-full border border-border" />

                    <button type="submit" className="w-full h-10 rounded-md bg-accent transition-all hover:shadow-2xl hover:scale-[101%]">
                        Submit
                    </button>
                </form>
            </Modal>
        </>
    );
};

export default NewAppMenu;
