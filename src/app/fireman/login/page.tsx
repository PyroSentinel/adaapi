'use client';

import LogoAdmin from '@/components/custom/logo-admin';
import { PasswordInput } from '@/components/shared/password-input';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSetCookie } from 'cookies-next/client';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

const formSchema = z.object({
  email: z.string().email('Email tidak valid'),
  password: z.string().min(8, 'Password minimal 8 karakter'),
});

export default function FiremanLoginPage() {
  const setCookie = useSetCookie();
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values),
    });

    const data = await res.json();
    if (res.ok) {
      setCookie('token', data.data.token);
      toast.success('Login berhasil!');
      router.push('/fireman');
    } else {
      toast.error('Login gagal. Silahkan coba lagi.');
    }
  }

  return (
    <div>
      <Image
        src={'/fireman/auth-bg-admin.png'}
        alt="Fireman Login Background"
        width={1080}
        height={1920}
        className="h-lvh w-full object-cover"
      />
      <LogoAdmin className="fixed top-1/5 left-1/2 size-25 -translate-x-1/2" />
      <div className="fixed inset-x-0 bottom-0 h-110 rounded-t-4xl bg-background px-4 pt-8">
        <h1 className="mb-2 text-center text-2xl font-medium">
          Selamat Datang
        </h1>
        <p className="mb-12 text-center">
          Silahkan masukan email dan password untuk login
        </p>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="mt-6 space-y-4"
          >
            <FormField
              name="email"
              control={form.control}
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
            <Button size={'lg'} className="mt-4 w-full" type="submit">
              Login
            </Button>
          </form>
        </Form>
        <p className="mt-2 text-center text-sm text-muted-foreground">
          Belum punya akun?{' '}
          <Link
            href={'/fireman/register'}
            className="text-amber-400 hover:underline"
          >
            Buat sekarang
          </Link>
        </p>
      </div>
    </div>
  );
}
