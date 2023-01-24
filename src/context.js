import React, { createContext, useContext, useState } from "react";

const Context = createContext();

export const StateContext = ({ children }) => {
  const [menu, setMenu] = useState(true);

  const updateMenu = (e) => {
    setMenu(e);
  };

  return (
    <Context.Provider
      value={{
        menu,
        updateMenu,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useStateContext = () => useContext(Context);
