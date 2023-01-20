import "./App.css";
import Globe from "react-globe.gl";
import { useState, useEffect } from "react";
import "../src/mapData/worldBorders.geojson";
import countriesz from "../src/mapData/worldBorders.geojson";

function App() {
  const [countries, setCountries] = useState({ features: [] });
  const [hoverD, setHoverD] = useState();
  const [selectedCountries, setSelectedCountries] = useState([]);
  var [selectionPool, setSelectionPool] = useState([]);

  useEffect(() => {
    // load data
    fetch(countriesz)
      .then((res) => res.json())
      .then(({ features }) => setCountries(features));

    fetch(countriesz)
      .then((res) => res.json())
      .then(({ features }) => setSelectionPool(features));
  }, []);

  // function checkSelectedCountriesList(isoCode){
  //   if(isoCode in countries.properties.)
  // }

  function addToSelectedCountries(e) {
    if (selectedCountries.includes(e)) {
      console.log(e.properties.ADMIN, " already in list");
      setSelectedCountries(
        selectedCountries.filter(
          (item) => item.properties.ADMIN !== e.properties.ADMIN
        )
      );
    } else {
      setSelectedCountries((selectedCountries) => [...selectedCountries, e]);
      console.log(e.properties.ADMIN, " added to selected countries");
    }
  }

  function inAlreadyClicked(e) {
    if (selectedCountries.includes(e)) {
      return "blue";
    }
    return "black";
  }

  function randomlySelectedCountry(_without_replacement = true) {
    if (selectionPool.length === 0) {
      console.log("- - - - - - - - reseting selection pool - - - - - - - -");
      selectionPool = [...countries];
      selectRandomCountry();
    } else {
      selectRandomCountry();
    }
  }

  function selectRandomCountry(_without_replacement = true) {
    var randomCountry =
      selectionPool[Math.floor(Math.random() * selectionPool.length)]; // select random country from the selection pool
    selectionPool.splice(selectionPool.indexOf(randomCountry), 1); // remove selected country from selection pool
    console.log("Randomly Selected Country: ", randomCountry.properties.ADMIN);
  }

  return (
    <div className="App">
      <div className="HoverInformation">
        <>
          {selectedCountries.length > 0 && (
            <>
              {selectedCountries.slice(-3).map((item, index) => (
                <h5 key={index}>{item.properties.ADMIN}</h5>
              ))}
            </>
          )}
        </>
      </div>
      <button
        className="RandomCountryGenerator"
        onClick={randomlySelectedCountry}
      >
        {" "}
        Generate Random Country{" "}
      </button>
      <Globe
        id="globe"
        globeImageUrl="//unpkg.com/three-globe/example/img/earth-day.jpg"
        backgroundImageUrl="//unpkg.com/three-globe/example/img/night-sky.png"
        polygonsData={countries}
        polygonAltitude={(d) => (d === hoverD ? 0.05 : 0.005)}
        // polygonCapColor={(d) => (d === hoverD ? "blue" : "black")}
        polygonCapColor={(d) => inAlreadyClicked(d)}
        polygonSideColor={() => "white"}
        polygonStrokeColor={() => "white"}
        polygonsTransitionDuration={1}
        onPolygonHover={setHoverD}
        onPolygonClick={(e) => {
          addToSelectedCountries(e);
          setSelectionPool(countries.slice(-10));
        }}
      />
    </div>
  );
}
export default App;
