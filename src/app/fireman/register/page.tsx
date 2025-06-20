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

import ConfirmLogo from '@/components/custom/confirm-logo';
import { PasswordInput } from '@/components/shared/password-input';
import { Button } from '@/components/ui/button';
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
import { cn } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { ChevronsUpDown, MapPin } from 'lucide-react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import { useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

const formSchema = z.object({
  name: z.string().min(1, 'Nama wajib diisi'),
  email: z.string().email('Email tidak valid'),
  password: z.string().min(8, 'Password minimal 8 karakter'),
  confirmPassword: z.string().min(8, 'Konfirmasi password minimal 8 karakter'),
  latitude: z.number().optional(),
  longitude: z.number().optional(),
  location_name: z.string().optional(),
});

export default function RegisterFiremanPage() {
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
      longitude: position[1],
      latitude: position[0],
      location_name: locationName || '',
      email: '',
      name: '',
      password: '',
      confirmPassword: '',
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    form.setValue('longitude', position[1]);
    form.setValue('latitude', position[0]);
    form.setValue('location_name', locationName || 'Lokasi tidak tersedia');
    if (values.password !== values.confirmPassword) {
      form.setError('confirmPassword', {
        type: 'manual',
        message: 'Konfirmasi password harus sama dengan password',
      });
      return;
    }

    const res = await fetch('/api/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values),
    });

    const data = await res.json();
    if (res.ok) {
      toast.success('Pendaftaran berhasil! Silahkan masuk.');
      router.push('/fireman/login');
    } else {
      toast.error('Pendaftaran gagal. Silahkan coba lagi.');
    }
  }

  const [expanded, setExpanded] = useState(true);

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
            <CardTitle>Lokasiku sekarang</CardTitle>
            <CardDescription className="flex items-center gap-1.5">
              <MapPin className="size-4" />
              <p className="line-clamp-1 text-sm text-muted-foreground">
                {locationName || 'Lokasi tidak tersedia. Pastikan GPS aktif.'}
              </p>
            </CardDescription>
          </CardHeader>
        </Card>
        <Card className={cn('pt-2', expanded ? 'relative' : 'hidden')}>
          <CardContent className="pt-4">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nama</FormLabel>
                      <FormControl>
                        <Input placeholder="Masukkan namamu" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
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
                  name="password"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <PasswordInput
                          placeholder="Masukkan passwordmu"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  name="confirmPassword"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Konfirmasi Password</FormLabel>
                      <FormControl>
                        <PasswordInput
                          placeholder="Masukkan passwordmu"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="w-full" type="button" size={'lg'}>
                      Register
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Konfirmasi Registrasi Fireman</DialogTitle>
                    </DialogHeader>
                    <div>
                      <ConfirmLogo className="mx-auto mb-4 size-20" />
                      <p className="text-center text-sm text-muted-foreground">
                        Apakah kamu yakin untuk melakukan registrasi akun fireman?
                      </p>
                    </div>
                    <DialogFooter>
                      <DialogClose asChild>
                        <Button variant={'outline'}>Tidak</Button>
                      </DialogClose>
                      <Button
                        type="submit"
                        onClick={() => {
                          form.handleSubmit(onSubmit)();
                        }}
                      >
                        Iya
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </form>
            </Form>
            <p className="mt-2 text-center text-sm text-muted-foreground">
              Sudah punya akun? <span className="hover:underline">Masuk</span>
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
