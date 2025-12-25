"use client";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import { useEffect } from "react";

interface props {
  branches: Array<{
    id: number;
    Name: string;
    City: string;
    Contact: string;
    Category: string;
    Latitude: number;
    Longitude: number;
  }>;
  center: [number, number];
}

function RecenterMap({ center }: { center: [number, number] }) {
  const map = useMap();
  useEffect(() => {
    map.flyTo(center, 10, {
      duration: 1.5,
    });
  }, [center, map]);
  return null;
}

const Map = ({ branches, center }: props) => {
  return (
    <div>
      <MapContainer
        center={center}
        zoom={15}
        scrollWheelZoom={false}
        className="w-full h-80 rounded-xl"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <RecenterMap center={center} />
        {branches.map((item: any) => (
          <Marker key={item.id} position={[item.Latitude, item.Longitude]}>
            <Popup>
              <div className="text-sm">
                <span className="font-bold text-[#1a2b4b]">{item.Name}</span>{" "}
                <br />
                <span>{item.City}</span>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default Map;
