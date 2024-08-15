"use client";
import React, { useEffect, useRef, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet/dist/leaflet.css";
import { LatLngBounds } from "leaflet";

const markers = [
  { position: [28.6139, 77.209], label: "New Delhi" },
  { position: [19.076, 72.8777], label: "Mumbai" },
  { position: [13.0827, 80.2707], label: "Chennai" },
  { position: [22.5726, 88.3639], label: "Kolkata" },
  { position: [12.9716, 77.5946], label: "Bangalore" },
];

function MarkerComponent({ position, label }) {
  const map = useMap();

  const handleMarkerClick = () => {
    setTimeout(() => {
      map.setView(position, map.getZoom());
    }, 0);
  };

  return (
    <Marker position={position} eventHandlers={{ click: handleMarkerClick }}>
      <Popup>{label}</Popup>
    </Marker>
  );
}

function Map() {
  const center = [23.23, 82.42];
  const zoom = 5;
  const bounds = new LatLngBounds([-90, -180], [90, 180]);

  return (
    <div>
      <MapContainer
        center={center}
        zoom={zoom}
        scrollWheelZoom={true}
        minZoom={3}
        style={{ height: "100vh", width: "100%" }}
        worldCopyJump={false}
        maxBounds={bounds}
        maxBoundsViscosity={1}
      >
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {markers.map((marks) => (
          <MarkerComponent
            key={marks.position}
            position={marks.position}
            label={marks.label}
          />
        ))}
      </MapContainer>
    </div>
  );
}

export default Map;
