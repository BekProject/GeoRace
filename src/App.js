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

  useEffect(() => {
    // load data
    fetch(countriesz)
      .then((res) => res.json())
      .then(({ features }) => setCountries(features));
  }, []);
  const colorScale = d3.scaleSequentialSqrt(d3.interpolateYlOrRd);

  // GDP per capita (avoiding countries with small pop)

  return (
    <div className="App">
      <Globe
        id="globe"
        globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
        backgroundImageUrl="//unpkg.com/three-globe/example/img/night-sky.png"
        lineHoverPrecision={0}
        bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
        polygonsData={countries}
        polygonAltitude={(d) => (d === hoverD ? 0.02 : 0.0)}
        polygonCapColor={(d) => (d === hoverD ? "transparent" : "transparent")}
        polygonSideColor={() => "white"}
        polygonStrokeColor={() => "white"}
        polygonsTransitionDuration={100}
        onPolygonHover={setHoverD}
        polygonLabel={({ properties: d }) => `
        <b>${d.ADMIN} (${d.ISO_A2}):</b> <br />
      `}
      />
    </div>
  );
}

export default App;
