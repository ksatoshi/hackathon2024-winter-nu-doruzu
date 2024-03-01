'use client'

import React, { useEffect, useRef, useState } from 'react'
import MapboxLanguage from '@mapbox/mapbox-gl-language'
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import lng_lat from '@maplibre/maplibre-gl-style-spec/src/coordinates/lng_lat'
import ToggleParent from '@/components/ToggleParent'

export function addMakerToMap(
  map: mapboxgl.Map,
  lngLat: lng_lat | [number, number]
) {

  const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(`
  <div class="flex gap-5 ">
    <p class="text-xs text-amber-500">Genre</p>
     <h3 class="text-sm">Company_name</h3>
    </div>
  </div>
`);


  const maker = new mapboxgl.Marker()
  maker
    .setLngLat(lngLat)
    .setPopup(new mapboxgl.Popup({ offset: 25 }).setHTML(`
    <div class="flex flex-col gap-1">
      <p class="text-xs text-amber-500">Genre</p>
      <h3 class="text-sm text-amber-500">Company_name</h3>
    </div>
  `))
    .addTo(map)
}

export default function SimpleMap() {
  mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN!
  const [map, setMap] = useState(null)
  const mapContainer = useRef(null)

  useEffect(() => {
    const initializeMap = ({
      setMap,
      mapContainer
    }: {
      setMap: any
      mapContainer: any
    }) => {
      const map = new mapboxgl.Map({
        container: mapContainer.current,
        center: [139.7670516, 35.6811673],
        zoom: 10,
        style: 'mapbox://styles/mapbox/light-v11',
        accessToken: mapboxgl.accessToken
      })

      const language = new MapboxLanguage({ defaultLanguage: 'ja' })
      map.addControl(language)
      map.addControl(new mapboxgl.NavigationControl())

      map.on('load', () => {
        setMap(map)
        map.resize()
      })
    }

    if (!map) {
      initializeMap({ setMap, mapContainer })
    }
  }, [map])

  return (
    <div style={{ width: '80vw', height: '100vh' }}>
      <ToggleParent map={map!} />
      <div ref={mapContainer} style={{ width: '100%', height: '100%' }} />
    </div>
  )
}
