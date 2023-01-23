import "./App.css";
import Globe from "react-globe.gl";
import { useState, useEffect } from "react";
import "../src/mapData/worldBorders.geojson";
import countriesz from "../src/mapData/worldBorders.geojson";

function App() {
  const [countries, setCountries] = useState({ features: [] });
  const [hoverD, setHoverD] = useState();
  const [selectedCountries, setSelectedCountries] = useState([]);
  const [selectionPool, setSelectionPool] = useState([]);
  var [randomCountry, setRandomCountry] = useState();
  const [randomCountryName, setRandomCountryName] = useState();

  useEffect(() => {
    // load data
    fetch(countriesz)
      .then((res) => res.json())
      .then(({ features }) => {
        setCountries(features);
        setSelectionPool(features);
      });
    setRandomCountry(countries[0]);
    setRandomCountryName('Random Country');
  }, []);

  // function checkSelectedCountriesList(isoCode){
  //   if(isoCode in countries.properties.)
  // }

  /* 
Create function to display name of randomly selected country
Cross refernce guess between randomly selected country
Tell user if their guess is correct or not
  */ 

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
      return "rgb(137 87 229 / 7%)";
    }
    return "rgb(22 27 34)";
  }

  function resetSelectionPool() {
    setSelectionPool(countries);
    console.log('selection pool reset to length: ', selectionPool.length)
  }

  function selectRandomCountry() {
    randomCountry =
      selectionPool[Math.floor(Math.random() * selectionPool.length)]; // select random country from the selection pool

    setRandomCountryName(randomCountry.properties.ADMIN);

    // remove random country from selection pool
    setSelectionPool(
      selectionPool.filter((item) => item != randomCountry)
    );

    console.log('Length of selection pool: ', selectionPool.length);
    console.log("Randomly Selected Country: ", randomCountry.properties.ADMIN);

    if (selectionPool.length === 1){
      resetSelectionPool()
    }
  }

  return (
    <div className="App">
      <div className="HoverInformation">
        <>
          {selectedCountries.length > 0 && (
            <>
              {selectedCountries.map((item, index) => (
                <h5 key={index}>{item.properties.ADMIN}</h5>
              ))}
            </>
          )}
        </>
      </div>
      <div className="RandomCountryDisplay">
        <>
          <h5 key={1}>{randomCountryName}</h5>
        </>
      </div>
      <button
        className="RandomCountryGenerator"
        onClick={selectRandomCountry}
      >
        Generate Random Country
      </button>
      <Globe
        id="globe"
        polygonsData={countries}
        polygonAltitude={(d) => (d === hoverD ? 0.0145 : 0.01)}
        // polygonCapColor={(d) => (d === hoverD ? "blue" : "black")}
        polygonCapColor={(d) => inAlreadyClicked(d)}
        polygonSideColor={(d) => inAlreadyClicked(d)}
        polygonStrokeColor={() => "white"}
        polygonsTransitionDuration={1}
        onPolygonHover={setHoverD}
        onPolygonClick={(e) => {
          addToSelectedCountries(e);
        }}
      />
    </div>
  );
}
export default App;
