import React from "react";
import "../menu.css";
import { useStateContext } from "../context";
import GameSelection from "./menuComponents/gameModeSelection";
import MainMenu from "./menuComponents/mainMenu";

function Menu() {
  const { menu, screen } = useStateContext();

  return menu ? (
    <div className="menuContainer">
      <div className="menuContainerMax">
        {screen === 0 ? <MainMenu /> : <></>}
        {screen === 1 ? <GameSelection /> : <></>}
      </div>
    </div>
  ) : (
    <></>
  );
}

export default Menu;
