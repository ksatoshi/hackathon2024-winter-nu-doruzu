"use client";

import React, { useRef, useEffect, useState } from "react";
import "mapbox-gl/dist/mapbox-gl.css";
import mapboxgl from "mapbox-gl";
import MapboxLanguage from "@mapbox/mapbox-gl-language";
import 'mapbox-gl/dist/mapbox-gl.css';

const addEventListeners = (map: mapboxgl.Map) => {
  map.on("mouseover", (e) => {
    const features = map.queryRenderedFeatures(e.point);
    const mouseOnMap = features.length > 0;

    map.getCanvas().style.cursor = mouseOnMap ? "pointer" : "";
  });

  map.on("click", (e) => {
    const lngLat = e.lngLat;
  });

  map.on("mousedown", () => {
    map.getCanvas().style.cursor = "grabbing";
  });

  map.on("mouseup", () => {
    map.getCanvas().style.cursor = "pointer";
  });
};

export default function SimpleMap() {
  mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN!;
  const mapContainer = useRef(null);
  const [map, setMap] = useState(null);

  useEffect(() => {
    const initializeMap = ({
      setMap,
      mapContainer,
    }: {
      setMap: any;
      mapContainer: any;
    }) => {
      const map = new mapboxgl.Map({
        container: mapContainer.current,
        center: [139.7670516, 35.6811673],
        zoom: 14,
        style: "mapbox://styles/mapbox/streets-v12",
        accessToken: mapboxgl.accessToken,
      });

      const language = new MapboxLanguage({ defaultLanguage: "ja" });
      map.addControl(language);
      map.addControl(new mapboxgl.NavigationControl());

      map.on("load", () => {
        setMap(map);
        map.resize();
      });

      addEventListeners(map);
    };

    if (!map) initializeMap({ setMap, mapContainer });
  }, [map]);

  return (
    <div style={{ width: "80vw", height: "100vh" }}>
      <div ref={mapContainer} style={{ width: "100%", height: "100%" }} />
    </div>
  );
}
