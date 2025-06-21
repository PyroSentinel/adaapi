'use client';

import ConfirmLogoutLogo from '@/components/custom/confirm-logout-logo';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Skeleton } from '@/components/ui/skeleton';
import { useGetCookie } from 'cookies-next/client';

import 'leaflet/dist/leaflet.css';

import { History, House, MapPin, User } from 'lucide-react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { toast } from 'sonner';

import { Profile } from '../response';

export default function Page() {
  const router = useRouter();
  const _cookies = useGetCookie();
  const [me, setMe] = useState<Profile | null>();
  const MyMap = useMemo(
    () =>
      dynamic(() => import('@/components/shared/preview-map-profile'), {
        ssr: false,
        loading: () => <Skeleton className="size-full h-55 rounded-xl" />,
      }),
    [],
  );

  const getMe = useCallback(async () => {
    const res = await fetch('/api/fireman/profile', {
      headers: {
        authorization: `Bearer ${_cookies('token')}`,
      },
    });
    const json = await res.json();
    if (!res.ok) {
      toast.warning('Gagal mengambil data profile');
    } else {
      setMe(json.data);
    }
  }, [_cookies]);

  useEffect(() => {
    getMe();
  }, [getMe]);

  return (
    <>
      {me && (
        <main className="min-h-lvh bg-gradient-to-b from-primary/5 to-primary/10">
          <header className="relative p-4">
            <div className="relative flex h-55 flex-col items-center justify-center gap-2 overflow-hidden rounded-4xl border-4 shadow">
              <Image
                src={'/fireman/bg-profile.png'}
                alt="Banner Pemadam"
                className="absolute inset-0 h-full rounded-4xl object-cover"
                width={1920}
                height={1080}
              />
              <div className="absolute right-0 bottom-0 left-0 z-10 h-1/2 rounded-t-4xl bg-background"></div>
              <Avatar className="z-10 size-24">
                <AvatarImage
                  src={
                    'https://images.unsplash.com/photo-1592235905030-74b3fd573cca'
                  }
                  className="object-cover object-center"
                />
                <AvatarFallback>PM</AvatarFallback>
              </Avatar>
              <h1 className="z-10 text-2xl font-medium">{me.name}</h1>
            </div>
          </header>
          <section className="px-4">
            <div className="relative h-55 w-full overflow-hidden rounded-4xl border-4 shadow">
              <MyMap position={[me.latitude, me.longitude]} />
              <Card className="absolute inset-x-2 bottom-2 z-10 rounded-4xl shadow">
                <CardHeader>
                  <CardTitle>Lokasi Anda</CardTitle>
                  <CardDescription className="flex items-center gap-1.5">
                    <MapPin className="size-4" />
                    <p className="line-clamp-1 text-sm text-muted-foreground">
                      {me?.location_name || 'Lokasi tidak diketahui'}
                    </p>
                  </CardDescription>
                </CardHeader>
              </Card>
            </div>

            <Dialog>
              <DialogTrigger asChild>
                <Button
                  className="mt-4 w-full"
                  size={'lg'}
                  variant={'destructive'}
                >
                  Logout
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Konfirmasi</DialogTitle>
                </DialogHeader>
                <div>
                  <ConfirmLogoutLogo className="mx-auto mb-4 size-20" />
                  <p className="text-center text-sm text-muted-foreground">
                    Apakah kamu yakin ingin Logout?
                  </p>
                </div>
                <DialogFooter>
                  <DialogClose asChild>
                    <Button variant={'outline'}>Tidak</Button>
                  </DialogClose>
                  <Button
                    type="submit"
                    onClick={() => {
                      router.push('/fireman/login');
                      toast.success('Berhasil Logout');
                    }}
                  >
                    Iya
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </section>
          <nav className="fixed inset-x-4 bottom-4 z-50 rounded-lg bg-background/10 shadow backdrop-blur-md">
            <div className="flex items-stretch justify-between gap-2 p-2">
              <Link href={'/fireman/history'} className="flex-1">
                <Button
                  className="size-14 w-full flex-col gap-1"
                  variant={'ghost'}
                >
                  <History className="size-7" />
                  <span className="text-xs">Riwayat</span>
                </Button>
              </Link>
              <Link href={'/fireman'} className="flex-1">
                <Button
                  className="size-14 w-full flex-col gap-1"
                  variant={'ghost'}
                >
                  <House className="size-7" />
                  <span className="text-xs">Beranda</span>
                </Button>
              </Link>
              <Link href={'/fireman/profile'} className="flex-1">
                <Button
                  className="size-14 w-full flex-col gap-1"
                  variant={'default'}
                >
                  <User className="size-7" />
                  <span className="text-xs">Profile</span>
                </Button>
              </Link>
            </div>
          </nav>
        </main>
      )}
    </>
  );
}
