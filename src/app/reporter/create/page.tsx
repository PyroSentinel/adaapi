'use client';

import ConfirmLogo from '@/components/custom/confirm-logo';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
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
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Skeleton } from '@/components/ui/skeleton';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';

import 'leaflet/dist/leaflet.css';

import { Camera, Check, ChevronsUpDown, MapPin, X } from 'lucide-react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import Zoom from 'react-medium-image-zoom';
import { toast } from 'sonner';
import { z } from 'zod';

import { ResponseData } from './response';

import 'react-medium-image-zoom/dist/styles.css';

const formSchema = z.object({
  media_url: z.string().url(),
  type: z.enum(['image', 'video']),
  description: z.string().min(1, 'Deskripsi tidak boleh kosong'),
  longitude: z.number().min(-180).max(180, 'Longitude tidak valid'),
  latitude: z.number().min(-90).max(90, 'Latitude tidak valid'),
  location_name: z.string(),
  is_anonymous: z.boolean().default(false).optional(),
  is_secret: z.boolean().default(false).optional(),
  email: z.string().optional(),
  verified: z.boolean().default(false).optional(),
  accuracy: z.number().min(0).max(100).default(100).optional(),
});

export default function CreateReporterPage() {
  const router = useRouter();
  const [position, setPositionAction] = useState<number[]>([
    // default position for palangka raya
    -2.2088, // Latitude
    113.9213, // Longitude
  ]); // Default position (Jakarta)
  const [locationName, setLocationName] = useState<string | null>(null);
  const MyMap = useMemo(
    () =>
      dynamic(() => import('@/components/shared/preview-map'), {
        ssr: false,
        loading: () => <Skeleton className="size-full h-100 rounded-xl" />,
      }),
    [],
  );

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      media_url: '',
      type: 'image',
      description: '',
      longitude: position[1],
      latitude: position[0],
      location_name: locationName || 'Lokasi tidak tersedia',
      email: '',
    },
  });

  useEffect(() => {
    // Set default value for location_name when locationName changes
    form.setValue('longitude', position[1]);
    form.setValue('latitude', position[0]);
    form.setValue('location_name', locationName || 'Lokasi tidak tersedia');
  }, [locationName, form, position]);

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    const res = await fetch('/api/reports', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values),
    });

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const data = await res.json();
    if (res.ok) {
      toast.success('Berhasil melaporkan.');
      router.push('/reporter/history');
    } else {
      toast.error('Gagal melapor. Silahkan coba lagi.');
    }
  }

  const [mediaUrl, setMediaUrl] = useState<{
    type: 'image' | 'video';
    url: string;
  } | null>(null);

  async function onUpload(file: File) {
    // Handle file upload logic here
    // For example, you can upload the file to a server or cloud storage
    const formData = new FormData();
    formData.set('type', file.type.startsWith('image/') ? 'image' : 'video');
    formData.set('media', file);
    const res = await fetch(
      process.env.NEXT_PUBLIC_MODEL_API! + '/api/reports/validation',
      {
        method: 'POST',
        body: formData,
      },
    );
    const json: ResponseData = await res.json();
    setMediaUrl({
      type: file.type.startsWith('image/') ? 'image' : 'video',
      url: json.data.media_url, // Create a local URL for the file
    });
    form.setValue('type', file.type.startsWith('image/') ? 'image' : 'video');
    form.setValue('media_url', json.data.media_url);
    form.setValue('accuracy', json.data.accuracy); // Set default accuracy to 100%
    form.setValue('verified', json.data.verified); // Set default verified to false
    form.setValue('description', json.data.description);
  }

  const [expanded, setExpanded] = useState(false);

  return (
    <div className="h-lvh lg:col-span-2">
      {position === null ? (
        <Skeleton className="size-full h-full rounded-xl" />
      ) : (
        <MyMap
          setLocationNameAction={setLocationName}
          setPositionAction={setPositionAction}
          position={position ? [position[0], position[1]] : [0, 0]}
        />
      )}
      <div className="space-5 fixed inset-x-0 bottom-4 h-auto px-2">
        <Card className="relative bottom-5 bg-background/90">
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
            <CardTitle>Lokasiku sekarang</CardTitle>
            <CardDescription className="flex items-center gap-1.5">
              <MapPin className="size-4" />
              <p className="line-clamp-1 text-sm text-muted-foreground">
                {locationName || 'Lokasi tidak tersedia. Pastikan GPS aktif.'}
              </p>
            </CardDescription>
          </CardHeader>
        </Card>
        <Card
          className={cn('bg-background/90', expanded ? 'relative' : 'hidden')}
        >
          <CardHeader>
            <CardTitle>Detail tambahan</CardTitle>
            <CardDescription>
              Isi detail tambahan untuk laporanmu, seperti media, deskripsi, dan
              lainnya.
            </CardDescription>
            <CardContent className="px-0 pt-4">
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-4"
                >
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Email{' '}
                          <span className="text-xs text-muted-foreground">
                            (opsional)
                          </span>
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="email"
                            placeholder="Masukkan emailmu"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Deskripsi
                          <span className="text-xs text-muted-foreground">
                            (autogenerated)
                          </span>
                        </FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Misal: Api berasal dari dapur rumah, asap cukup tebal, ada warga masih di dalam. "
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="media_url"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          {mediaUrl ? (
                            <div>
                              <Zoom>
                                <div className="relative mt-2 flex items-center gap-2">
                                  <Button
                                    className="absolute top-2 right-2 z-10 rounded-full"
                                    size={'icon'}
                                    variant={'destructive'}
                                    onClick={() => setMediaUrl(null)}
                                    type="button"
                                  >
                                    <X />
                                  </Button>
                                  {mediaUrl.type === 'image' ? (
                                    <Image
                                      src={field.value || mediaUrl.url}
                                      alt="Uploaded media"
                                      className="aspect-video h-50 w-full rounded-md object-cover"
                                      width={1920}
                                      height={1080}
                                    />
                                  ) : (
                                    <video
                                      src={field.value || mediaUrl.url}
                                      controls
                                      className="aspect-video h-50 w-full rounded-md object-cover"
                                    />
                                  )}
                                </div>
                              </Zoom>
                            </div>
                          ) : (
                            <label
                              htmlFor="media_upload"
                              className="flex h-30 w-full flex-col items-center justify-center gap-1 rounded-md px-4 outline-2 outline-dashed"
                            >
                              <Camera className="size-12 text-muted-foreground" />
                              <span className="text-xs text-muted-foreground">
                                Pilih berkas media (gambar/video)
                              </span>
                              <Input
                                type="file"
                                onChange={(e) => {
                                  const file = e.target.files?.[0];
                                  if (file) {
                                    onUpload(file);
                                    e.target.value = ''; // Reset input value
                                  }
                                }}
                                accept="image/*,video/*"
                                id="media_upload"
                                hidden
                              />
                            </label>
                          )}
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="flex items-stretch justify-center gap-2">
                    <FormField
                      control={form.control}
                      name="is_anonymous"
                      render={({ field }) => (
                        <FormItem className="flex-1">
                          <FormControl>
                            <Button
                              type="button"
                              size={'sm'}
                              className="flex flex-1 items-center justify-center"
                              variant={field.value ? 'secondary' : 'outline'}
                              onClick={() => {
                                field.onChange(!field.value);
                              }}
                            >
                              {field.value && <Check />}
                              Anonim
                            </Button>
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="is_secret"
                      render={({ field }) => (
                        <FormItem className="flex-1">
                          <FormControl>
                            <Button
                              type="button"
                              size={'sm'}
                              className="flex-1"
                              variant={field.value ? 'secondary' : 'outline'}
                              onClick={() => {
                                field.onChange(!field.value);
                              }}
                            >
                              {field.value && <Check />}
                              Rahasia
                            </Button>
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button className="w-full" type="button" size={'lg'}>
                        Kirim Laporan
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Konfirmasi Pengiriman Laporan</DialogTitle>
                      </DialogHeader>
                      <div>
                        <ConfirmLogo className="mx-auto mb-4 size-20" />
                        <p className="text-center text-sm text-muted-foreground">
                          Apakah kamu yakin ingin mengirim laporan ini sekarang?
                        </p>
                      </div>
                      <DialogFooter>
                        <DialogClose asChild>
                          <Button variant={'outline'} type="button">
                            Tidak
                          </Button>
                        </DialogClose>
                        <Button
                          type="submit"
                          onClick={form.handleSubmit(onSubmit)}
                        >
                          Iya
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </form>
              </Form>
            </CardContent>
          </CardHeader>
        </Card>
      </div>
    </div>
  );
}
