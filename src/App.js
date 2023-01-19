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
  const [selectionPool, setSelectionPool] = useState([]);

  useEffect(() => {
    // load data
    fetch(countriesz)
      .then((res) => res.json())
      .then(({ features }) => setCountries(features));

    fetch(countriesz)
      .then((res) => res.json())
      .then(({ features }) => setSelectionPool(features));
  }, 

  []);

  // function checkSelectedCountriesList(isoCode){
  //   if(isoCode in countries.properties.)
  // }

  function addToSelectedCountries(e) {
    if (selectedCountries.includes(e)) {
      console.log(e.properties.ADMIN, ' already in list')
    } else {
      setSelectedCountries((selectedCountries) => [...selectedCountries, e]);
      console.log(e.properties.ADMIN, ' added to selected countries');
  }
  }

  function inAlreadyClicked(e) {
    if (selectedCountries.includes(e)){
      return "blue"
    }
    return "black"
  }

  function randomlySelectedCountry(without_replacement=true) {


    if (selectionPool.length == 0 || selectionPool.length == 1) {
      setSelectionPool(countries.slice(-10));
    }

    if (without_replacement){
      console.log(selectionPool)
      var randomCountry = selectionPool[Math.floor(Math.random() * selectionPool.length)]; // select random country from the selection pool
      selectionPool.splice(selectionPool.indexOf(randomCountry), 1); // remove selected country from selection pool
      console.log(randomCountry)
      console.log(randomCountry.properties.ADMIN)
    }


  }

  const handleClick = () => {
    randomlySelectedCountry();
  };

  return (
    <div className="App">
      <div className="HoverInformation">
        <>
          {selectedCountries.length > 0 && (
            <>
              {selectedCountries.slice(-3).map((item, index) => (
                <h5 key={index} >{item.properties.ADMIN}</h5>
              ))}
            </>
          )}
        </>
      </div>
      <button className='RandomCountryGenerator' onClick={handleClick}> Generate Random Country </button>
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
          randomlySelectedCountry();
        }}

      />
    </div>
  );
}

export default App;
