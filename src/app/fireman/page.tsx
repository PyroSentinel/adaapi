'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { History, House, MapPin, User } from 'lucide-react';
import Link from 'next/link';
import { useCallback, useEffect, useState } from 'react';
import { toast } from 'sonner';

import { Datum, Profile } from './response';

export default function FiremanPage() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [me, setMe] = useState<Profile | null>();
  const [reportsData, setReportsData] = useState<Datum[]>([]);
  const [reportsGrouped, setReportsGrouped] = useState<Datum[]>([]);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const getMe = useCallback(async () => {
    const res = await fetch('/api/fireman/profile');
    const json = await res.json();
    if (!res.ok) {
      toast.warning('Gagal mengambil data profile');
    } else {
      setMe(json.data);
    }
  }, []);

  const getReports = useCallback(async () => {
    const res = await fetch('/api/reports');
    const json = await res.json();
    if (!res.ok) {
      toast.warning('Gagal mengambil data laporan');
    } else {
      setReportsData(json.data);
      setReportsGrouped(
        json.data.filter((d: Datum) => d.group.report_id === d.report.id),
      );
    }
  }, []);

  useEffect(() => {
    getReports();
  }, [getReports]);
  return (
    <main className="min-h-lvh bg-gradient-to-b from-primary/5 to-primary/10">
      <header className="p-4">
        <div className="flex items-center gap-5">
          <Avatar className="size-14 border-2 border-primary">
            <AvatarImage
              src={
                'https://images.unsplash.com/photo-1592235905030-74b3fd573cca'
              }
              className="object-cover object-center"
            />
            <AvatarFallback>AP</AvatarFallback>
          </Avatar>
          <div>
            <p className="text-sm leading-4 text-muted-foreground">
              Selamat datang
            </p>
            <h1 className="text-xl font-medium">Pemadam</h1>
          </div>
        </div>
      </header>
      <section className="px-4">
        <Tabs defaultValue="laporan-masuk">
          <TabsList className="w-full">
            <TabsTrigger value="laporan-masuk">Laporan masuk</TabsTrigger>
            <TabsTrigger value="sedang-diproses">Sedang diproses</TabsTrigger>
          </TabsList>
          <TabsContent value="laporan-masuk">
            <section className="space-y-4 pb-32">
              {reportsGrouped
                .filter((rg) => rg.group.status === 'pending')
                .map((rg) => (
                  <CardWithDialog
                    key={rg.id}
                    mainReport={rg}
                    allReport={reportsData}
                  />
                ))}
              {reportsGrouped.filter((rg) => rg.group.status === 'pending')
                .length === 0 && (
                <p className="text-center text-sm text-muted-foreground">
                  Tidak ada laporan dengan status pending
                </p>
              )}
            </section>
          </TabsContent>
          <TabsContent value="sedang-diproses">
            <section className="space-y-4 pb-32">
              {reportsGrouped
                .filter((rg) => rg.group.status === 'process')
                .map((rg) => (
                  <CardWithDialog
                    key={rg.id}
                    mainReport={rg}
                    allReport={reportsData}
                  />
                ))}
              {reportsGrouped.filter((rg) => rg.group.status === 'process')
                .length === 0 && (
                <p className="text-center text-sm text-muted-foreground">
                  Tidak ada laporan dengan status process
                </p>
              )}
            </section>
          </TabsContent>
        </Tabs>
      </section>

      <nav className="fixed inset-x-4 bottom-4 z-50 rounded-lg bg-background/10 shadow backdrop-blur-md">
        <div className="flex items-stretch justify-between gap-2 p-2">
          <Link href={'/fireman/history'} className="flex-1">
            <Button className="size-14 w-full flex-col gap-1" variant={'ghost'}>
              <History className="size-7" />
              <span className="text-xs">Riwayat</span>
            </Button>
          </Link>
          <Link href={'/fireman'} className="flex-1">
            <Button
              className="size-14 w-full flex-col gap-1"
              variant={'default'}
            >
              <House className="size-7" />
              <span className="text-xs">Beranda</span>
            </Button>
          </Link>
          <Link href={'/fireman/profile'} className="flex-1">
            <Button className="size-14 w-full flex-col gap-1" variant={'ghost'}>
              <User className="size-7" />
              <span className="text-xs">Profil</span>
            </Button>
          </Link>
        </div>
      </nav>
    </main>
  );
}

function CardWithDialog({
  mainReport,
  allReport,
}: {
  mainReport: Datum;
  allReport: Datum[];
}) {
  return (
    <Card className="relative gap-3 py-4">
      <CardHeader className="flex items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <User className="size-6 rounded-full border-2 border-primary" />
          <p className="leading-4 font-medium">
            {mainReport.report.email || 'Anonim'}
          </p>
        </div>
        <p className="text-sm text-muted-foreground">
          {new Date(mainReport.report.created_at).toLocaleDateString('id-ID', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
          })}
        </p>
      </CardHeader>
      <CardContent className="px-4">
        <p className="line-clamp-2 text-sm text-muted-foreground">
          {mainReport.report.description}
        </p>
        <div className="mt-2 flex items-center gap-1.5">
          <MapPin className="size-4" />
          <p className="line-clamp-1 text-sm text-muted-foreground">
            {mainReport.report.location_name || 'Lokasi tidak diketahui'}
          </p>
        </div>
      </CardContent>
      <CardFooter className="mt-1 justify-between px-4">
        <Badge>{mainReport.group.status}</Badge>
        <Drawer>
          <DrawerTrigger asChild>
            <Button
              variant="secondary"
              size={'sm'}
              className="z-10"
              onClick={(e) => e.stopPropagation()}
              tabIndex={0}
            >
              <Badge className="ml-1">
                {
                  allReport.filter(
                    (ar) =>
                      mainReport.group.id === ar.group.id &&
                      ar.id !== mainReport.id,
                  ).length
                }
              </Badge>{' '}
              Laporan serupa
            </Button>
          </DrawerTrigger>
          <DrawerContent className="h-full max-h-screen">
            <DrawerHeader>
              <DrawerTitle>Laporan serupa </DrawerTitle>
              <DrawerDescription>
                Berikut adalah laporan serupa yang telah diterima
              </DrawerDescription>
            </DrawerHeader>
            <ScrollArea className="overflow-hidden">
              <div className="space-y-4 px-4 py-4">
                {allReport
                  .filter(
                    (ar) =>
                      mainReport.group.id === ar.group.id &&
                      ar.id !== mainReport.id,
                  )
                  .map((child) => (
                    <ChildCard key={child.id} data={child} />
                  ))}
              </div>
            </ScrollArea>
          </DrawerContent>
        </Drawer>
      </CardFooter>
      <Link
        href={`/fireman/process-report/${mainReport.id}`}
        className="absolute inset-0 z-0"
        tabIndex={-1}
        aria-label="Lihat detail laporan"
      />
    </Card>
  );
}

function ChildCard({ data }: { data: Datum }) {
  return (
    <Card className="relative gap-3 py-4">
      <CardHeader className="flex items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <User className="size-6 rounded-full border-2 border-primary" />
          <p className="leading-4 font-medium">
            {data.report.email || 'Anonim'}
          </p>
        </div>
        <p className="text-sm text-muted-foreground">
          {new Date(data.report.created_at).toLocaleDateString('id-ID', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
          })}
        </p>
      </CardHeader>
      <CardContent className="px-4">
        <p className="line-clamp-2 text-sm text-muted-foreground">
          {data.report.description || 'Tidak ada deskripsi'}
        </p>
        <div className="mt-2 flex items-center gap-1.5">
          <MapPin className="size-4" />
          <p className="line-clamp-1 text-sm text-muted-foreground">
            {data.report.location_name || 'Lokasi tidak diketahui'}
          </p>
        </div>
      </CardContent>
      <Link
        href={`/fireman/process-report/${data.id}`}
        className="absolute inset-0 z-0"
        tabIndex={-1}
        aria-label="Lihat detail laporan"
      />
    </Card>
  );
}
