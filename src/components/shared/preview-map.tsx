'use client';

import { reverseGeocode } from 'esri-leaflet-geocoder';
import { ArrowLeft, Crosshair } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMapEvents,
} from 'react-leaflet';
import Control from 'react-leaflet-custom-control';
import { toast } from 'sonner';

import { Button } from '../ui/button';

function getLocationName(lat: number, lng: number): Promise<string> {
  return new Promise((resolve, reject) => {
    reverseGeocode({
      apikey: process.env.NEXT_PUBLIC_ESRI_API_KEY,
    })
      .latlng([lat, lng])
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .run((error: any, result: any) => {
        if (error) {
          reject(error);
        } else {
          resolve(result.address.Match_addr);
        }
      });
  });
}

function LocationMarker({
  position,
  setPositionAction,
  setLocationNameAction,
}: {
  position: [number, number];
  setPositionAction: (position: [number, number]) => void;
  setLocationNameAction: (name: string) => void;
}) {
  const map = useMapEvents({
    async click(e) {
      setPositionAction([e.latlng.lat, e.latlng.lng]);
      try {
        const locationName = await getLocationName(e.latlng.lat, e.latlng.lng);
        setLocationNameAction(locationName);
      } catch (_error) {
        toast.error('Gagal mendapatkan nama lokasi. Silakan coba lagi.');
      }
    },
    async locationfound(e) {
      setPositionAction([e.latlng.lat, e.latlng.lng]);
      map.flyTo(e.latlng, map.getZoom());
      try {
        const locationName = await getLocationName(e.latlng.lat, e.latlng.lng);
        setLocationNameAction(locationName);
      } catch (_error) {
        toast.error('Gagal mendapatkan nama lokasi. Silakan coba lagi.');
      }
    },
    locationerror(e) {
      toast.error(e.message);
      // Optionally, you can set a default position or handle the error
      setPositionAction([0, 0]); // Default position (e.g., [0, 0])
    },
  });
  useEffect(() => {
    map.locate({
      watch: false,
    });
  }, [map]);
  return (
    <>
      <Control prepend position="topright">
        <Button
          variant={'outline'}
          size={'icon'}
          onClick={() => {
            map.locate({
              watch: false,
            });
          }}
        >
          <Crosshair className="size-5" />
        </Button>
      </Control>
      <Marker position={position}>
        <Popup>Infonya disini</Popup>
      </Marker>
    </>
  );
}

export default function PreviewMap({
  position,
  setPositionAction,
  setLocationNameAction,
}: {
  position: [number, number];
  setPositionAction: (position: [number, number]) => void;
  setLocationNameAction: (name: string) => void;
}) {
  const router = useRouter();
  return (
    <MapContainer
      center={position}
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
      <LocationMarker
        position={position}
        setPositionAction={setPositionAction}
        setLocationNameAction={setLocationNameAction}
      />
    </MapContainer>
  );
}
