import React from "react";
import GameTest from "./TestGame";
import MenuOverlay from "./MenuOverlay";
import { Toaster } from "react-hot-toast";

function Layout() {
  return (
    <div className="layout">
      <MenuOverlay />
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
