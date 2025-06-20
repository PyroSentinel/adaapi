'use client';

import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';

function LocationMarker({ position }: { position: [number, number] }) {
  return (
    <>
      <Marker position={position}>
        <Popup>Infonya disini</Popup>
      </Marker>
    </>
  );
}

export default function PreviewMap({
  position,
}: {
  position: [number, number];
}) {
  return (
    <MapContainer
      center={{
        lat: position[0],
        lng: position[1],
      }}
      zoom={20}
      zoomControl={false}
      className="absolute inset-0 z-0 size-full"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <LocationMarker position={position} />
    </MapContainer>
  );
}
