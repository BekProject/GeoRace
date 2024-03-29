import React, { createContext, useContext, useState, useRef } from "react";

const Context = createContext();

export const StateContext = ({ children }) => {
  const [menu, setMenu] = useState(true);
  const [stats, setStats] = useState(false);
  const globeRef = useRef();
  const [continentFilter, setContinentFilter] = useState("all");
  const [screen, setScreen] = useState(0);
  const [score, setScore] = useState(0);
  const [highest, setHighest] = useState(0);
  const [state, setState] = useState({
    position: [5, 4],
    cameraDistanceRadius: 3,
  });

  const updateState = (newState) => {
    setState(newState);
  };

  const updateScore = (e) => {
    setScore(e);
  };

  const updateHighest = (e) => {
    setHighest(e);
  };

  const updateMenu = () => {
    setMenu(!menu);
  };

  const updateStats = () => {
    setStats(!stats);
  };

  const updateEarthSpin = (e) => {
    // globeRef.current.controls().autoRotate = e;
  };

  const updateSetContinent = (e) => {
    setContinentFilter(e);
    console.log("continenter filter updated");
  };

  const updateScreen = (e) => {
    setScreen(e);
  };

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
        updateSetContinent,
        screen,
        updateScreen,
        score,
        updateScore,
        highest,
        updateHighest,
        updateState,
        state,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useStateContext = () => useContext(Context);
