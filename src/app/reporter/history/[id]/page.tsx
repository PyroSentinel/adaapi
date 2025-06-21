'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

import 'leaflet/dist/leaflet.css';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import { Check, ChevronsUpDown, MapPin } from 'lucide-react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { useCallback, useEffect, useMemo, useState } from 'react';
import Zoom from 'react-medium-image-zoom';
import { toast } from 'sonner';

import 'react-medium-image-zoom/dist/styles.css';

import { Data, Response } from './response';

export default function CreateReporterPage() {
  const { id } = useParams<{ id: string }>();
  const [report, setReport] = useState<Data | null>(null);

  const MyMap = useMemo(
    () =>
      dynamic(() => import('@/components/shared/preview-map-detail'), {
        ssr: false,
        loading: () => <Skeleton className="size-full h-100 rounded-xl" />,
      }),
    [],
  );

  const [expanded, setExpanded] = useState(false);

  const getReportById = useCallback(async (id: string) => {
    try {
      const response = await fetch(`/api/reports/${id}`);
      if (!response.ok) {
        toast.warning('Laporan tidak ditemukan atau terjadi kesalahan.');
      }
      const json: Response = await response.json();
      setReport(json.data);
    } catch (_error) {
      toast.error('Terjadi kesalahan saat mengambil laporan.');
    }
  }, []);

  useEffect(() => {
    if (id) {
      getReportById(id);
    }
  }, [id, getReportById]);

  return (
    <>
      {report && (
        <div className="h-lvh lg:col-span-2">
          <MyMap position={[report.report.latitude, report.report.longitude]} />
          <div className="space-5 fixed inset-x-0 bottom-4 h-auto px-2">
            <Card className="relative bottom-5">
              <Button
                onClick={() => {
                  setExpanded(!expanded);
                }}
                className="absolute -bottom-4 left-1/2 -translate-x-1/2 rounded-full border-3"
                size={'icon'}
              >
                <ChevronsUpDown />
              </Button>
              <CardHeader>
                <CardTitle>Lokasi Laporan</CardTitle>
                <CardDescription className="flex items-center gap-1.5">
                  <MapPin className="size-4" />
                  <p className="line-clamp-1 text-sm text-muted-foreground">
                    {report.report.location_name || 'Lokasi tidak diketahui'}
                  </p>
                </CardDescription>
              </CardHeader>
            </Card>
            <Card className={cn('gap-0', expanded ? 'relative' : 'hidden')}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Detail tambahan</CardTitle>
                  <CardDescription>
                    {new Date(report.report.created_at).toLocaleDateString(
                      'id-ID',
                      {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      },
                    )}
                  </CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <Badge>{report.group.status}</Badge>
                  <Badge variant={'outline'}>
                    di proses oleh {report.group.fireman_report_group.length}{' '}
                    petugas
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="pt-4">
                <div className="space-y-4">
                  <Input
                    type="email"
                    placeholder="Masukkan emailmu"
                    defaultValue={report.report.email}
                    disabled
                  />
                  <Textarea
                    placeholder="Misal: Api berasal dari dapur rumah, asap cukup tebal, ada warga masih di dalam. "
                    defaultValue={report.report.description}
                    disabled
                  />

                  <div>
                    <Zoom>
                      <div className="relative mt-2 flex items-center gap-2">
                        {report.report.type === 'image' ? (
                          <Image
                            src={report.report.media_url}
                            alt="Uploaded media"
                            className="aspect-video h-50 w-full rounded-md object-cover"
                            width={1920}
                            height={1080}
                          />
                        ) : (
                          <video
                            src={report.report.media_url}
                            controls
                            className="aspect-video h-50 w-full rounded-md object-cover"
                          />
                        )}
                      </div>
                    </Zoom>
                  </div>

                  <div className="flex items-stretch justify-center gap-2">
                    <Button
                      type="button"
                      size={'sm'}
                      className="flex flex-1 items-center justify-center"
                      variant={
                        report.report.is_anonymous ? 'secondary' : 'outline'
                      }
                    >
                      {report.report.is_anonymous && <Check />}
                      Anonim
                    </Button>

                    <Button
                      type="button"
                      size={'sm'}
                      className="flex-1"
                      variant={
                        report.report.is_secret ? 'secondary' : 'outline'
                      }
                    >
                      {report.report.is_secret && <Check />}
                      Rahasia
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </>
  );
}
