// ES6
import ReactMapboxGl, { Layer, Feature } from "react-mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

// ES5

const Map = ReactMapboxGl({
  accessToken:
    "pk.eyJ1IjoiYmVrZGV2IiwiYSI6ImNsZ3lmNnR5ZTAwMGczdW9nOXY3MGtzaHIifQ.E37PZbdGmRb8xAYP73h4xg",
});

// in render()

<Map
  style="mapbox://styles/mapbox/streets-v9"
  containerStyle={{
    height: "100vh",
    width: "100vw",
  }}
>
  <Layer type="symbol" id="marker" layout={{ "icon-image": "marker-15" }}>
    <Feature coordinates={[-0.481747846041145, 51.3233379650232]} />
  </Layer>
</Map>;

export default Map;
