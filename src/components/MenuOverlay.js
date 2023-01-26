import React, { useState } from "react";
import "../menu.css";
import { useStateContext } from "../context";
import {
  Button,
  ButtonGroup,
  FormControl,
  InputBase,
  NativeSelect,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";

const BootstrapInput = styled(InputBase)(({ theme }) => ({
  "label + &": {
    marginTop: theme.spacing(3),
  },
  "& .MuiInputBase-input": {
    borderRadius: 4,
    position: "relative",
    backgroundColor: "transparent",
    border: "1px solid #1976d280",
    fontSize: "0.975rem",
    padding: "10px 26px 10px 12px",
    width: "100%",
    color: "#1976d2",
    transition: theme.transitions.create(["border-color", "box-shadow"]),
    marginTop: theme.spacing(3),
    FontFamily: "Roboto",
    // Use the system font instead of the default Roboto font.

    "&:focus": {
      borderRadius: 4,
      borderColor: "#80bdff",
      boxShadow: "0 0 0 0.2rem rgba(0,123,255,.25)",
    },
  },
}));

function Menu() {
  const { updateEarthSpin, updateStats, menu, updateMenu } = useStateContext();
  const [userSettingsSelection, setUserSettingSelection] = useState();
  const [age, setAge] = useState(0);

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
            <Typography
              variant="body1"
              component="h1"
              style={{ color: "#1976d2" }}
            >
              Select :
            </Typography>

            <ButtonGroup
              style={{ width: "100%", marginTop: "10px" }}
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
                <FormControl sx={{ width: "100%" }} variant="standard">
                  <NativeSelect
                    id="demo-customized-select-native"
                    value={age}
                    defaultValue={30}
                    onChange={(e) => setAge(e.target.value)}
                    input={<BootstrapInput />}
                  >
                    <option value={10}>Asia</option>
                    <option value={20}>Europe</option>
                    <option value={30}>South America</option>
                    <option value={30}>North America</option>
                    <option value={30}>Australia America</option>
                  </NativeSelect>
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
