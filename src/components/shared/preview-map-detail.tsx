'use client';

import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import Control from 'react-leaflet-custom-control';

import { Button } from '../ui/button';

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
  const router = useRouter();
  return (
    <MapContainer
      center={{
        lat: position[0],
        lng: position[1],
      }}
      zoom={20}
      zoomControl={false}
      className="fixed inset-0 z-0 size-full rounded-xl"
    >
      <Control prepend position="topleft">
        <Button
          variant={'outline'}
          size={'icon'}
          onClick={() => {
            router.back();
          }}
        >
          <ArrowLeft className="size-5" />
        </Button>
      </Control>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <LocationMarker position={position} />
    </MapContainer>
  );
}
