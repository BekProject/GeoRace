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
  const [correctOrWrong, setCorrectOrWrong] = useState();

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
    setCorrectOrWrong('Neutral');
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

    const selectedCountryIndex = selectedCountries.indexOf(e);

    // if country is not selected
    if (selectedCountryIndex === -1) {
      return "rgb(22 27 34)";
    }
    
    // if country is most recently selected
    if (selectedCountryIndex === selectedCountries.length-1) {
      return 'rgb(255 255 255)';
    }

    // if country is within recent 3 
    if (selectedCountryIndex > selectedCountries.length-4){
      return "rgb(137 87 229 / 7%)";
    }


  }

  function randomlySelectedCountry() {
    if (selectionPool.length === 1) {
      console.log("- - - - - - - - reseting selection pool - - - - - - - -");
      setSelectionPool(countries);
      selectRandomCountry(true);
    } else {
      selectRandomCountry(false);
    }
  }

  function selectRandomCountry(reset) {
    let randomCountry;

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
      setCorrectOrWrong('Correct');
      console.log('country corect');
    } else {
      setCorrectOrWrong('Incorrect');
      console.log('country incorrect');
    }

    console.log('this has been ran');
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

      <div className="RandomCountryDisplay">
        <>
          <h5 key={21}>{randomCountryName}</h5>
        </>
      </div>

      <div className={correctOrWrong==='Incorrect' ? 'background-red' : 'background-green'} id='CorrectOrWrong'>
        <>
          <h5 key={184} >{correctOrWrong}</h5>
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
          isThisCorrect(e);
        }}
      />
    </div>
  );
}
export default App;
