"use client";
import React, { useCallback, useEffect, useState } from "react";
import Map, { Marker } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { MapIcon } from "lucide-react";
import Image from "next/image";

const MapBox = () => {
  const [location, setLocation] = useState({
    lat: null,
    long: null
  });

  const getlocation = useCallback(() => {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const lat = pos.coords.latitude;
          const long = pos.coords.longitude;
          resolve({ lat, long });
        },
        (err) => {
          console.error("Error getting location:", err);
          reject(err);
        }
      );
    });
  }, []);

  useEffect(() => {
    getlocation()
      .then(({ lat, long }) => {
        setLocation({
          lat,
          long
        });
      })
      .catch((err) => {
        // Fallback coordinates if location access is denied or fails
        console.error("Fallback to default location due to error:", err);
        setLocation({
          lat: 37.7749, // Default to San Francisco latitude
          long: -122.4194 // Default to San Francisco longitude
        });
      });
  }, [getlocation]);

  return (
    <Map
      mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
      initialViewState={{
        longitude: location.long ?? -122.4194, // Default longitude if null
        latitude: location.lat ?? 37.7749,     // Default latitude if null
        zoom: 10,
      }}
      style={{ width: "100%", height: "100%", borderRadius: 10 }}
      mapStyle="mapbox://styles/mapbox/streets-v9"
    >
   
        <Marker longitude={-122.4194} latitude={37.7749} anchor="bottom">
          <Image src={"/mappin.svg"} width={40} height={40} alt="Map Pin" />
        </Marker>

        <Marker longitude={-125.4194} latitude={40.7749} anchor="bottom">
          <Image src={"/mappin.svg"} width={40} height={40} alt="Map Pin" />
        </Marker>
      
    </Map>
  );
};

export default MapBox;
