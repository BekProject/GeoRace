import React from "react";
import "../menu.css";
import { useStateContext } from "../context";
import GameSelection from "./menuComponents/gameModeSelection";
import MainMenu from "./menuComponents/mainMenu";
import { auth } from "../firebase";

function Menu() {
  const { menu } = useStateContext();

  return menu ? (
    <div className="menuContainer">
      <div className="menuContainerMax">
        {auth ? <GameSelection /> : <MainMenu />}
      </div>
    </div>
  ) : (
    <></>
  );
}

export default Menu;
