import { useState, useDebugValue } from "react";

const useToggle = (initValue = false) => {
  const [state, setState] = useState(initValue);

  const toggleState = () => setState((prevState) => !prevState);

  //Мы использовали useDebugValue для того, чтобы в инструментах разработчика выводить дополнительную информацию о значении state / рядом с хуком будет видно значение в тулзах Components
  useDebugValue(state ? "true" : "false");

  return [state, toggleState];
};

export default useToggle;
