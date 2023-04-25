import Globe from "react-globe.gl";
import { useState, useEffect, useRef } from "react";
import countriesz from "../mapData/worldBorders.geojson";
import toast from "react-hot-toast";
import { useStateContext } from "../context";
import { Button } from "@mui/material";
import axios from "axios";

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
    updateHighest,
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

        globeRef.current.controls().autoRotate = true;
        globeRef.current.controls().autoRotateSpeed = 0.3;
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

  const fetchPictures = async (countryCode) => {
    try {
      const response = await fetch(
        `https://api.unsplash.com/search/photos?query=${"spain"}&per_page=5`,
        {
          headers: {
            Authorization: "9Tdvs19hwh1A_SihupO3xcNKthYySwtQl2vtMbWiPKA",
          },
        }
      );

      const data = await response.json();
      console.log(data.results);
      setPictures(data.results);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="App">
      {stats && (
        <div className="absolute w-full max-w-xs z-10  ">
          <a
            href="#"
            className="block rounded-lg p-4 shadow-sm shadow-indigo-100"
          >
            {pictures.length > 0 ? (
              <img
                src={pictures[0].urls.regular}
                alt={pictures[0].alt_description}
                className="h-40 w-full rounded-md object-cover"
              />
            ) : (
              <></>
            )}

            <div className="mt-2">
              <dl>
                <div>
                  <dt className="sr-only text-white">{randomCountryName}</dt>

                  <dd className="text-sm text-gray-500">{randomCountryName}</dd>
                </div>

                <div>
                  <dt className="sr-only">Address</dt>

                  <dd className="font-medium">123 Wallaby Avenue, Park Road</dd>
                </div>
              </dl>

              <div className="mt-6 flex items-center gap-8 text-xs">
                <div className="sm:inline-flex sm:shrink-0 sm:items-center sm:gap-2">
                  <svg
                    className="h-4 w-4 text-indigo-700"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                      d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z"
                    />
                  </svg>

                  <div className="mt-1.5 sm:mt-0">
                    <p className="text-gray-500">Parking</p>

                    <p className="font-medium">2 spaces</p>
                  </div>
                </div>

                <div className="sm:inline-flex sm:shrink-0 sm:items-center sm:gap-2">
                  <svg
                    className="h-4 w-4 text-indigo-700"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                    />
                  </svg>

                  <div className="mt-1.5 sm:mt-0">
                    <p className="text-gray-500">Bathroom</p>

                    <p className="font-medium">2 rooms</p>
                  </div>
                </div>

                <div className="sm:inline-flex sm:shrink-0 sm:items-center sm:gap-2">
                  <svg
                    className="h-4 w-4 text-indigo-700"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokelinecap="round"
                      strokelinejoin="round"
                      strokeWidth={2}
                      d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                    />
                  </svg>

                  <div className="mt-1.5 sm:mt-0">
                    <p className="text-gray-500">Bedroom</p>
                    <p className="font-medium">4 rooms</p>
                  </div>
                </div>
              </div>
            </div>
          </a>
        </div>
      )}

      <Globe
        id="globe"
        animateIn={true}
        animateOut={true}
        antialias={true} // enable antialiasing
        options={globeOptions}
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
        markersData={markersData}
      />
    </div>
  );
}
export default GameTest;
