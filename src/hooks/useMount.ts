import { useEffect } from "react";

type Callback = () => void | Promise<void>;

const useMount = (callback: Callback) => {
  useEffect(() => {
    callback();
  }, []);
};

export { useMount };
