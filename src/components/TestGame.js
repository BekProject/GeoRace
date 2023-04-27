import { useState, useEffect, useRef } from "react";
import countriesz from "../mapData/worldBorders.geojson";
import toast from "react-hot-toast";
import { useStateContext } from "../context";
import axios from "axios";
import ScoreOverlay from "./ScoreOverlay";
import SidebarView from "./SidebarView";
import Map from "./Globe";

const correctCountry = () => {
  toast.success("Correct!", { duration: 1000 });
};

// const wrongCountry = (country) => {
//   toast.error(`Wrong. That is ${country}`);
// };

function alreadyCorrect() {
  toast.error("already got this correct", { duration: 2500 });
}

function wrongCountry(country) {
  toast.error(`Wrong Country. That is  ${country}`, { duration: 2500 });
}

function GameTest() {
  const {
    stats,
    globeRef,
    updateMenu,
    continentFilter,
    score,
    updateScore,
    highest,
    updateHighest,
    updateState,
    state,
  } = useStateContext();

  const [countries, setCountries] = useState({ features: [] });
  const [hoverD, setHoverD] = useState();
  const [selectionPool, setSelectionPool] = useState([]);
  const [randomCountryName, setRandomCountryName] = useState();
  const [wrongCountries, setWrongCountries] = useState([]);
  const [correctCountries, setCorrectCountries] = useState([]);
  const [possibleCountries, setPossibleCountries] = useState([]);
  const [pictures, setPictures] = useState([]);
  const [landmarks, setLandmarks] = useState([]);

  useEffect(() => {
    fetch(countriesz)
      .then((res) => res.json())
      .then(({ features }) => {
        setCountries(features);
        setSelectionPool(features);
        setPossibleCountries(features);
        var randomCountry =
          features[Math.floor(Math.random() * features.length)];
        setRandomCountryName(randomCountry.properties.ADMIN);
        var countryCode = randomCountry.properties.ISO_A3;
        getLandmarks(countryCode);
        console.log("random country is: ", randomCountryName);

        // globeRef.current.controls().autoRotate = true;
        // globeRef.current.controls().autoRotateSpeed = 0.3;
      });
  }, [globeRef]);

  useEffect(() => {
    // filter the country
    console.log("country filtering process began");
    if (continentFilter !== "all") {
      console.log("continenet filter is: ", continentFilter);
      setSelectionPool(
        possibleCountries.filter(
          (item) => item.properties.CONTINENT === continentFilter
        )
      );
      // getRandomCountry();
    } else {
      setSelectionPool(possibleCountries);
      console.log("continenet filter is: all");
      // getRandomCountry();
    } // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [continentFilter]);

  useEffect(() => {
    // whenever the menu is put away
    getRandomCountry();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [updateMenu]);

  function inAlreadyClicked(e) {
    if (wrongCountries.includes(e)) {
      return "red";
    }
    if (correctCountries.includes(e)) {
      return "green";
    }
    if (e === hoverD) {
      return "yellow";
    } else return "#0d1116";
  }

  const getLandmarks = async (code) => {
    try {
      const response = await axios.get(
        `https://restcountries.com/v2/alpha/${code}`
      );
      const data = response.data;
      const top5Landmarks = data.borders.slice(0, 5);
      const landmarksData = await Promise.all(
        top5Landmarks.map(async (code) => {
          const landmarkResponse = await axios.get(
            `https://restcountries.com/v2/alpha/${code}`
          );
          return landmarkResponse.data;
        })
      );
      setLandmarks(landmarksData);
    } catch (error) {
      console.log(error);
    }
  };

  const markersData = landmarks.map((landmark) => ({
    id: landmark.alpha3Code,
    name: landmark.name,
    coordinates: [landmark.latlng[1], landmark.latlng[0]],
    value: 1,
    color: "red",
  }));

  // function randomlySelectedCountry() {
  //   if (selectionPool.length === 1) {
  //     console.log("- - - - - - - - reseting selection pool - - - - - - - -");
  //     setSelectionPool(countries);
  //     selectRandomCountry(true);
  //   } else {
  //     selectRandomCountry(false);
  //   }
  // }

  function getRandomCountry() {
    // do not select a random country if the selection pool has not been created
    if (selectionPool.length === 0) {
      return;
    }

    let randomCountry;
    setWrongCountries([]);

    randomCountry =
      selectionPool[Math.floor(Math.random() * selectionPool.length)]; // select random country from the selection pool

    setRandomCountryName(randomCountry.properties.ADMIN);
    console.log(randomCountry);

    if (selectionPool.length === 1) {
      setSelectionPool(selectionPool.filter((item) => item !== randomCountry));
    }

    console.table(
      "Randomly Selected Country's continent: ",
      randomCountry.properties.CONTINENT
    );
  }

  function isThisCorrect(e) {
    console.log(e);
    if (e.properties.ADMIN === randomCountryName) {
      setCorrectCountries((correctCountries) => [...correctCountries, e]);
      updateScore((score) => score + 1);
      updateHighest((highest) => (highest === score ? highest + 1 : highest));
      correctCountry();
      getRandomCountry();
    } else {
      if (correctCountries.includes(e)) {
        alreadyCorrect();
      } else {
        updateScore(0);

        setWrongCountries((wrongCountries) => [...wrongCountries, e]);
        console.log("wrong");
        wrongCountry(e.properties.ADMIN);
      }
    }
  }

  const globeOptions = {
    glConfig: {
      lineWidth: 1,
      lineJoin: "round",
    },
  };

  return (
    <div className="flex h-screen">
      {/* {stats && <SidebarView />} */}
      <Map />

      {/* <div class=" flex-1 flex items-center justify-center">
        <Globe
          id="globe"
          animateIn={true}
          animateOut={true}
          antialias={true} // enable antialiasing
          options={globeOptions}
          ref={globeRef}
          polygonsData={countries}
          polygonAltitude={(d) => (d === hoverD ? 0.0115 : 0.01)}
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
          markersData={markersData}
        />
      </div> */}
    </div>
  );
}
export default GameTest;
