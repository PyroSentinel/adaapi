'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
import { Input } from '@/components/ui/input';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import { CheckIcon, Filter, History, House, MapPin, User } from 'lucide-react';
import Link from 'next/link';
import { useCallback, useEffect, useState } from 'react';
import { toast } from 'sonner';

import { Datum } from './response';

const STATUS = [
  { value: 'pending', label: 'Pending' },
  { value: 'process', label: 'Proses' },
  { value: 'completed', label: 'Selesai' },
  { value: 'all', label: 'Semua' },
];

export default function ReporterHistoryPage() {
  const [statusOpen, setStatusOpen] = useState(false);
  const [status, setStatus] = useState<string>('all');
  const [reportsData, setReportsData] = useState<Datum[]>([]);
  const [reportsGrouped, setReportsGrouped] = useState<Datum[]>([]);
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
      <header className="mt-4 px-4">
        <h1 className="text-center text-xl font-semibold">Riwayat Laporan</h1>
      </header>
      <section className="my-4 flex items-center justify-between gap-2 px-4">
        <Input placeholder="Cari laporan" />
        <Popover open={statusOpen} onOpenChange={setStatusOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={statusOpen}
              className="w-40 justify-between"
            >
              {status
                ? STATUS.find((s) => s.value === status)?.label
                : 'Select status...'}
              <Filter className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-40 p-0">
            <Command>
              <CommandInput placeholder="Search Status..." />
              <CommandList>
                <CommandEmpty>No status found.</CommandEmpty>
                <CommandGroup>
                  {STATUS.map((s) => (
                    <CommandItem
                      key={s.value}
                      value={s.value}
                      onSelect={(currentValue) => {
                        setStatus(currentValue === status ? '' : currentValue);
                        setStatusOpen(false);
                      }}
                    >
                      <CheckIcon
                        className={cn(
                          'mr-2 h-4 w-4',
                          status === s.value ? 'opacity-100' : 'opacity-0',
                        )}
                      />
                      {s.label}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      </section>
      <section className="my-4 space-y-4 px-4 pb-32">
        {reportsGrouped.map((rg) =>
          status === 'all' ? (
            <CardWithDialog
              key={rg.id}
              mainReport={rg}
              allReport={reportsData}
            />
          ) : (
            rg.group.status === status && (
              <CardWithDialog
                key={rg.id}
                mainReport={rg}
                allReport={reportsData}
              />
            )
          ),
        )}
        {reportsGrouped.length === 0 && (
          <p className="text-center text-sm text-muted-foreground">
            Tidak ada laporan dengan status {status || 'terpilih'}
          </p>
        )}
      </section>
      <nav className="fixed inset-x-4 bottom-4 z-50 rounded-lg bg-background/10 shadow backdrop-blur-md">
        <div className="flex items-stretch justify-between gap-2 p-2">
          <Link href={'/reporter'} className="flex-1">
            <Button className="size-14 w-full flex-col gap-1" variant={'ghost'}>
              <House className="size-7" />
              <span className="text-xs">Beranda</span>
            </Button>
          </Link>
          <Link href={'/reporter/history'} className="flex-1">
            <Button
              className="size-14 w-full flex-col gap-1"
              variant={'default'}
            >
              <History className="size-7" />
              <span className="text-xs">Riwayat</span>
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
        href={`/reporter/history/${mainReport.id}`}
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
        href={`/reporter/history/${data.id}`}
        className="absolute inset-0 z-0"
        tabIndex={-1}
        aria-label="Lihat detail laporan"
      />
    </Card>
  );
}
