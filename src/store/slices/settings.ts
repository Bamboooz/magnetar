import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type Language = "English" | "Polish";
type Theme = "Dark" | "Light";

interface SettingsState {
    language: Language;
    theme: Theme;
    autostart: boolean;
    enabledModules: number[];
    keybind: string;
}

const initialState: SettingsState = {
    language: "English",
    theme: "Dark",
    autostart: true,
    enabledModules: [],
    keybind: "CommandOrControl+Shift+P",
};

const settingsSlice = createSlice({
    name: "settings",
    initialState,
    reducers: {
        setLanguage: (state, action: PayloadAction<Language>) => {
            state.language = action.payload;
        },
        setTheme: (state, action: PayloadAction<Theme>) => {
            state.theme = action.payload;
        },
        setAutostart: (state, action: PayloadAction<boolean>) => {
            state.autostart = action.payload;
        },
        setEnabledModules: (state, action: PayloadAction<number[]>) => {
            state.enabledModules = action.payload;
        },
        setKeybind: (state, action: PayloadAction<string>) => {
            state.keybind = action.payload;
        },
    },
});

export const { 
    setLanguage,
    setTheme,
    setAutostart,
    setEnabledModules,
    setKeybind,
} = settingsSlice.actions;

export const settingsReducer = settingsSlice.reducer;
