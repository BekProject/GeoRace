import logo from './logo.svg';
import './App.css';
import Globe from 'react-globe.gl';
import { useRef, useState, useEffect } from "react";

function App() {
  const globeEl = useRef();
  return (
    <div className="App">
      <Globe
        pointOfView
        ref={globeEl}
        globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
        backgroundImageUrl="//unpkg.com/three-globe/example/img/night-sky.png"
      />
    </div>
  );
}



export default App;
