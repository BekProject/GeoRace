import Globe from "react-globe.gl";
import { useState, useEffect } from "react";
import countriesz from "../mapData/worldBorders.geojson";
import toast from "react-hot-toast";
import { useStateContext } from "../context";
import { Button } from "@mui/material";

const correctCountry = () => {
  toast.success("Correct!", { duration: 1000 });
};

// const wrongCountry = (country) => {
//   toast.error(`Wrong. That is ${country}`);
// };

function alreadyCorrect() {
  toast.error("already got this correct", { duration: 2000 });
}

function wrongCountry(country) {
  toast.error(`Wrong Country. That is  ${country}`, { duration: 1000 });
}

function GameTest() {
  const { stats, globeRef, updateEarthSpin, updateMenu, updateStats } =
    useStateContext();

  const [countries, setCountries] = useState({ features: [] });
  const [hoverD, setHoverD] = useState();
  const [selectionPool, setSelectionPool] = useState([]);
  const [randomCountryName, setRandomCountryName] = useState();
  const [wrongCountries, setWrongCountries] = useState([]);
  const [correctCountries, setCorrectCountries] = useState([]);
  const [streak, setStreak] = useState(0);
  const [totalIncorrect, setTotalIncorrect] = useState(0);

  useEffect(() => {
    // load data
    fetch(countriesz)
      .then((res) => res.json())
      .then(({ features }) => {
        setCountries(features);
        setSelectionPool(features);
        var randomCountry =
          features[Math.floor(Math.random() * features.length)];
        setRandomCountryName(randomCountry.properties.ADMIN);
        globeRef.current.controls().autoRotate = true;
        globeRef.current.controls().autoRotateSpeed = 0.3;
      });
  }, [globeRef]);

  function inAlreadyClicked(e) {
    if (wrongCountries.includes(e)) {
      return "red";
    }
    if (correctCountries.includes(e)) {
      return "green";
    } else return "#0d1116";
  }

  // function randomlySelectedCountry() {
  //   if (selectionPool.length === 1) {
  //     console.log("- - - - - - - - reseting selection pool - - - - - - - -");
  //     setSelectionPool(countries);
  //     selectRandomCountry(true);
  //   } else {
  //     selectRandomCountry(false);
  //   }
  // }

  function getRandomCountry(reset) {
    let randomCountry;
    setWrongCountries([]);

    if (!reset) {
      randomCountry =
        selectionPool[Math.floor(Math.random() * selectionPool.length)]; // select random country from the selection pool
      setSelectionPool(selectionPool.filter((item) => item !== randomCountry));
      setRandomCountryName(randomCountry.properties.ADMIN);
    } else {
      randomCountry =
        selectionPool[Math.floor(Math.random() * selectionPool.length)];
      setRandomCountryName(randomCountry.properties.ADMIN);
    }

    console.table(
      "Randomly Selected Country: ",
      randomCountry.properties.ADMIN
    );
  }

  function isThisCorrect(e) {
    if (e.properties.ADMIN === randomCountryName) {
      setCorrectCountries((correctCountries) => [...correctCountries, e]);
      console.log("right");
      setStreak((streak) => streak + 1);
      correctCountry();

      getRandomCountry();
    } else {
      if (correctCountries.includes(e)) {
        alreadyCorrect();
      } else {
        setWrongCountries((wrongCountries) => [...wrongCountries, e]);
        console.log("wrong");
        setStreak((streak) => 0);
        setTotalIncorrect((totalIncorrect) => totalIncorrect + 1);
        wrongCountry(e.properties.ADMIN);
      }
    }
  }

  return (
    <div className="App">
      {stats && (
        <div className="HoverInformation">
          <div className="currentRandomCountryContainer">
            <h5>Country : {randomCountryName}</h5>
          </div>
          <div className="currentRandomCountryStatsContainer">
            <h5>Streak 🔥 : {streak} </h5>
            <h5 id="bestStreakId">wrong ❌ : {totalIncorrect}</h5>
          </div>
          <div className='currentRandomCountryStatsContainer'
            style={{
              borderTop: "1px solid rgb(105, 105, 105)",
              display: "flex",
              justifyContent: "center",
              padding: "0px",
            }}
          >
            <Button onClick={() => {
              getRandomCountry();
            }}
            style={{
              width: "100%",
              borderRadius: 0,
              color: "white",
            }}
            >
              Skip Country
            </Button>

          </div>
          <div
            className="currentRandomCountryStatsContainer"
            style={{
              borderTop: "1px solid rgb(105, 105, 105)",
              display: "flex",
              justifyContent: "center",
              padding: "0px",
            }}
          >

            <Button
              onClick={() => {
                updateEarthSpin(true);
                updateMenu(true);
                updateStats(false);
              }}
              style={{
                width: "100%",
                height: "100%",
                borderRadius: 0,
                color: "white",
              }}
              variant="outlined"
            >
              Back to menu
            </Button>
          </div>
        </div>
      )}

      <Globe
        id="globe"
        ref={globeRef}
        polygonsData={countries}
        polygonAltitude={(d) => (d === hoverD ? 0.0145 : 0.01)}
        // polygonCapColor={(d) => (d === hoverD ? "blue" : "black")}
        polygonCapColor={(d) => inAlreadyClicked(d)}
        polygonSideColor={(d) => inAlreadyClicked(d)}
        polygonStrokeColor={() => "white"}
        polygonsTransitionDuration={1}
        onPolygonHover={setHoverD}
        onPolygonClick={(e) => {
          isThisCorrect(e);
        }}
        globeImageUrl="//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
        backgroundImageUrl="//unpkg.com/three-globe/example/img/night-sky.png"
      />
    </div>
  );
}
export default GameTest;
