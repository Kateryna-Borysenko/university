import { useEffect } from "react";

const useOutsideClickDetector = (ref, action, shouldAct = true) => {
  useEffect(() => {
    if (!shouldAct) return;
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        action();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, action, shouldAct]);
};

export default useOutsideClickDetector;
