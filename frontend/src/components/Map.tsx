"use client";

import { useEffect, useState, useRef } from "react";
import mapboxgl from "mapbox-gl";
import MapboxLanguage from "@mapbox/mapbox-gl-language";

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
        zoom: 15,
        style: "mapbox://styles/mapbox/streets-v12",
        accessToken: mapboxgl.accessToken,
      });

      const language = new MapboxLanguage({ defaultLanguage: "ja" });
      map.addControl(language);

      map.on("load", () => {
        setMap(map);
        map.resize();
      });
    };

    if (!map) initializeMap({ setMap, mapContainer });
  }, [map]);

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <div ref={mapContainer} style={{ width: "100%", height: "100%" }} />
    </div>
  );
}
