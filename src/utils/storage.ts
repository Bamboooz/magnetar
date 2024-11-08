const APPS_KEY = "apps";
const THEME_KEY = "theme";
const LANGUAGE_KEY = "language";

const getStorage = (key: string) => {
  return window.localStorage.getItem(key);
};

const setStorage = (key: string, value: any) => {
  window.localStorage.setItem(key, value);
};

const getStorageJson = (key: string) => {
  try {
    return JSON.parse(window.localStorage.getItem(key)!);
  } catch (_) {
    return null;
  }
};

const setStorageJson = (key: string, value: Object) => {
  window.localStorage.setItem(key, JSON.stringify(value));
};

export {
  APPS_KEY,
  THEME_KEY,
  LANGUAGE_KEY,
  getStorage,
  setStorage,
  getStorageJson,
  setStorageJson,
};
