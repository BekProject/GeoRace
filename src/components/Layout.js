import React from "react";
// import Game from "./Game";
import GameTest from "./TestGame";
import { Toaster } from "react-hot-toast";

function Layout() {
  return (
    <div className="layout">
      <GameTest />
      <Toaster
        position="bottom-center"
        closeOnClick={true}
        reverseOrder={false}
      />
    </div>
  );
}

export default Layout;
