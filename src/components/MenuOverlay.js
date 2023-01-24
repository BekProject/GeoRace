import React from "react";
import "../menu.css";
import { useStateContext } from "../context";

function Menu() {
  const { updateEarthSpin } = useStateContext();

  return (
    <div className="menuContainer">
      <div className="menuContainerMax">
        <h1>This is a test</h1>
        <button onClick={() => updateEarthSpin(false)}>
          Click me to stop earth
        </button>
      </div>
    </div>
  );
}

export default Menu;
