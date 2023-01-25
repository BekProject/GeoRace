import React, { useState } from "react";
import "../menu.css";
import { useStateContext } from "../context";
import {
  Button,
  ButtonGroup,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
} from "@mui/material";

function Menu() {
  const { updateEarthSpin, updateStats, menu, updateMenu } = useStateContext();
  const [userSettingsSelection, setUserSettingSelection] = useState();

  return menu ? (
    <div className="menuContainer">
      <div className="menuContainerMax">
        <h1 id="menuContainerTitle">GeoRacer</h1>
        {/* <button
          onClick={() => {
            updateEarthSpin(false);
            updateStats(true);
            updateMenu(false);
          }}
        >
          Click me to stop earth
        </button> */}

        <div className="menuContainerButtonContainers">
          <div className="menuContainerButtonContainersMax">
            <p>Select : </p>
            <ButtonGroup
              style={{ width: "100%" }}
              variant="outlined"
              aria-label="outlined button group"
            >
              <Button
                onClick={() => setUserSettingSelection(0)}
                style={{ width: "100%" }}
                variant={userSettingsSelection === 0 ? "contained" : "outlined"}
              >
                All
              </Button>
              <Button
                onClick={() => setUserSettingSelection(1)}
                style={{ width: "100%" }}
                variant={userSettingsSelection === 1 ? "contained" : "outlined"}
              >
                Continent
              </Button>
              <Button style={{ width: "100%" }}>Custom (in progress)</Button>
            </ButtonGroup>

            {userSettingsSelection === 1 ? (
              <>
                <p>Select : </p>
                <FormControl style={{ width: "100%" }} fullWidth>
                  <InputLabel id="demo-simple-select-label">Age</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    variant="filled"
                    value={0}
                    label="Age"
                    // onChange={handleChange}
                  >
                    <MenuItem value={10}>Ten</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem>
                  </Select>
                </FormControl>
              </>
            ) : (
              <></>
            )}

            <Button
              style={{ width: "100%", height: "40px", marginTop: "30px" }}
              variant="outlined"
              onClick={() => {
                updateEarthSpin(false);
                updateStats(true);
                updateMenu(false);
              }}
            >
              Start 🏁
            </Button>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <></>
  );
}

export default Menu;
