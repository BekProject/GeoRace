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

  useEffect(() => {
    // load data
    fetch(countriesz)
      .then((res) => res.json())
      .then(({ features }) => setCountries(features));
  }, []);

  return (
    <div className="App">
      <div className="HoverInformation">
        {clickedCountry === null ? (
          <h3>Click a country to get its info</h3>
        ) : (
          <>
            <h3>Country Name : {clickedCountry.ADMIN}</h3>
            <h3>Population EST : {clickedCountry.POP_EST} </h3>
            <h3>GDP EST : {clickedCountry.GDP_MD_EST}</h3>
            <h3>CONTINENT : {clickedCountry.CONTINENT}</h3>
          </>
        )}
      </div>
      <Globe
        id="globe"
        globeImageUrl="//unpkg.com/three-globe/example/img/earth-day.jpg"
        backgroundImageUrl="//unpkg.com/three-globe/example/img/night-sky.png"
        polygonsData={countries}
        polygonAltitude={(d) => (d === hoverD ? 0.01 : 0.005)}
        polygonCapColor={(d) => (d === hoverD ? "blue" : "black")}
        polygonSideColor={() => "white"}
        polygonStrokeColor={() => "white"}
        polygonsTransitionDuration={100}
        onPolygonHover={setHoverD}
        onPolygonClick={(e) => {
          console.log(e);
          setClickedCountry(e.properties);
        }}
        polygonLabel={({ properties: d }) => `
        <b>${d.ADMIN} (${d.ISO_A2}):</b> <br />
      `}
      />
    </div>
  );
}

export default App;
