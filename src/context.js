import React, { createContext, useContext, useState, useRef, continentFilter } from "react";

const Context = createContext();

export const StateContext = ({ children }) => {
  const [menu, setMenu] = useState(true);
  const [stats, setStats] = useState(false);
  const globeRef = useRef();
  const [continentFilter, setContinentFilter] = useState('all');


  const updateMenu = (e) => {
    setMenu(e);
  };

  const updateStats = (e) => {
    setStats(e);
  };

  const updateEarthSpin = (e) => {
    globeRef.current.controls().autoRotate = e;
  };

  const updateSetContinent = (e) => {
    setContinentFilter(e);
    console.log('continenter filter updated');
  }

  

  return (
    <Context.Provider
      value={{
        menu,
        stats,
        globeRef,
        continentFilter,
        updateMenu,
        updateStats,
        updateEarthSpin,
        updateSetContinent
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useStateContext = () => useContext(Context);
