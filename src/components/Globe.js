import React from "react";
import ReactMapGL, { FlyToInterpolator } from "react-map-gl";

const Map = () => {
  const mapStyle =
    "mapbox://styles/mapbox/dark-v10?style=mapbox://styles/mapbox/dark-v10&layers=country-label";

  const [viewport, setViewport] = React.useState({
    width: "100%",
    height: "100%",
    latitude: 0,
    longitude: 0,
    zoom: 2,
  });

  const [hoveredFeature, setHoveredFeature] = React.useState(null);

  const handleHover = (event) => {
    const { features, srcEvent } = event;
    const hoveredFeature =
      features && features.find((f) => f.layer.id === "countries");

    setHoveredFeature(hoveredFeature);

    if (hoveredFeature) {
      const map = event.target;
      map.getCanvas().style.cursor = "pointer";
      map.setFeatureState(
        {
          source: "countries",
          id: hoveredFeature.id,
        },
        { hover: true }
      );
    }
  };

  const handleMouseLeave = (event) => {
    const map = event.target;
    map.getCanvas().style.cursor = "";
    if (hoveredFeature) {
      map.setFeatureState(
        {
          source: "countries",
          id: hoveredFeature.id,
        },
        { hover: false }
      );
    }
    setHoveredFeature(null);
  };

  return (
    <ReactMapGL
      {...viewport}
      mapStyle={mapStyle}
      onViewportChange={setViewport}
      onHover={handleHover}
      onMouseLeave={handleMouseLeave}
    >
      <source
        id="countries"
        type="vector"
        url="mapbox://mapbox.country-boundaries-v1"
      />
      <layer
        id="countries"
        type="line"
        source="countries"
        source-layer="country_boundaries"
        paint={{
          "line-color": [
            "case",
            ["boolean", ["feature-state", "hover"], false],
            "red",
            "white",
          ],
          "line-width": 1,
        }}
      />
    </ReactMapGL>
  );
};

export default Map;
