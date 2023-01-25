import React, { createContext, useContext, useState, useRef } from "react";

const Context = createContext();

export const StateContext = ({ children }) => {
  const [menu, setMenu] = useState(true);
  const [stats, setStats] = useState(false);
  const globeRef = useRef();

  const updateMenu = (e) => {
    setMenu(e);
  };

  const updateStats = (e) => {
    setStats(e);
  };

  const updateEarthSpin = (e) => {
    globeRef.current.controls().autoRotate = e;
  };

  return (
    <Context.Provider
      value={{
        menu,
        stats,
        globeRef,
        updateMenu,
        updateStats,
        updateEarthSpin,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useStateContext = () => useContext(Context);
