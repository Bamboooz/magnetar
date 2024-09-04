import { useEffect } from "react";

import { Callback } from "../types/general";

const useMount = (callback: Callback) => {
  useEffect(() => {
    callback();
  }, []);
};

export { useMount };
