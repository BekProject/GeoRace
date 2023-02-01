import React from "react";
import { Button, Typography } from "@mui/material";
import "./menu.css";
import { useStateContext } from "../../context";

export default function MainMenu() {
  const { updateScreen } = useStateContext();
  return (
    <div className="MainMenuContainer">
      <div className="MainMenuAccountMethodContainer">
        <div style={{ width: "100%" }}>
          <Typography textAlign="center" variant="h5" component="h5">
            create an account
          </Typography>
          <Button
            onClick={() => updateScreen(1)}
            style={{ width: "100%" }}
            variant="contained"
          >
            Create acount
          </Button>
        </div>
        <div style={{ width: "100%" }}>
          <Typography textAlign="center" variant="h5" component="h5">
            existing account
          </Typography>
          <Button
            onClick={() => updateScreen(1)}
            style={{ width: "100%" }}
            variant="contained"
          >
            Sign in
          </Button>
        </div>

        {/* <ButtonGroup
          style={{ width: "100%", marginTop: "10px" }}
          variant="outlined"
          aria-label="outlined button group"
        >
          <Button
            onClick={() => console.log(0)}
            style={{ width: "100%" }}
            variant="contained"
          >
            Sign In
          </Button>
          <Button
            onClick={() => console.log(1)}
            style={{ width: "100%" }}
            variant={"contained"}
          >
            Play as a Guest
          </Button>
        </ButtonGroup> */}
      </div>
    </div>
  );
}
