import logo from "./logo.svg";
import "./App.css";
import Globe from "react-globe.gl";
import { useRef, useState, useEffect, useMemo } from "react";
import axios from "axios";
import "../src/mapData/worldBorders.geojson";
import * as d3 from "d3";
import countriesz from "../src/mapData/worldBorders.geojson";

function App() {
  const [countries, setCountries] = useState({ features: [] });
  const [hoverD, setHoverD] = useState();
  const [clickedCountry, setClickedCountry] = useState(null);
  const [selectedCountries, setSelectedCountries] = useState([]);

  useEffect(() => {
    // load data
    fetch(countriesz)
      .then((res) => res.json())
      .then(({ features }) => setCountries(features));
  }, []);

  // function checkSelectedCountriesList(isoCode){
  //   if(isoCode in countries.properties.)
  // }

  function addToSelectedCountries(e) {
    console.log(e);
    if (selectedCountries.includes(e)) {
      console.log('true')
    } else {
      setSelectedCountries((selectedCountries) => [...selectedCountries, e]);
    }
  }

  function inAlreadyClicked(e) {
    if (selectedCountries.includes(e)){
      return "blue"
    }

    return "black"
  }

  return (
    <div className="App">
      <div className="HoverInformation">
        <>
          {selectedCountries.length > 0 && (
            <>
              {selectedCountries.map((item, index) => (
                <p>{item.properties.ADMIN}</p>
              ))}
            </>
          )}
        </>
      </div>
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
        polygonsTransitionDuration={0.0001}
        onPolygonHover={setHoverD}
        onPolygonClick={(e) => {
          addToSelectedCountries(e);
        }}
      />
    </div>
  );
}

export default App;
