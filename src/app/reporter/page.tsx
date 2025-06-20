import Logo from '@/components/custom/logo';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { History, House } from 'lucide-react';
import Link from 'next/link';

export default function ReporterPage() {
  return (
    <main className="h-lvh">
      <header className="p-4">
        <div className="flex items-center gap-5">
          <Avatar className="size-14 border-2 border-primary">
            <AvatarImage
              src={
                'https://images.unsplash.com/photo-1494790108377-be9c29b29330'
              }
              className="object-cover object-center"
            />
            <AvatarFallback>AP</AvatarFallback>
          </Avatar>
          <div>
            <p className="text-sm leading-4 text-muted-foreground">
              Welcome to the reporter page!
            </p>
            <h1 className="text-xl font-medium">Reporter</h1>
          </div>
        </div>
      </header>
      <section className="mt-22 mb-4 p-4">
        <h1 className="mb-2 text-center text-3xl font-semibold">Ada Bahaya?</h1>
        <p className="text-center text-muted-foreground">
          Tekan tombol darurat kebakaran dibawah untuk melaporkan kebakaran
        </p>
        <Link href={'/reporter/create'}>
          <div className="relative mx-auto mt-14 flex size-65 items-center justify-center">
            <div className="absolute mx-auto size-70 rounded-full bg-primary/30"></div>
            <div className="absolute mx-auto size-57 rounded-full bg-primary/50"></div>
            <div className="absolute mx-auto size-43 rounded-full bg-primary/70"></div>
            <Logo className="absolute mx-auto size-18" />
          </div>
        </Link>
        <p className="mt-20 text-center text-sm text-muted-foreground">
          Pastikan laporan yang kamu kirim benar adanya!
        </p>
      </section>
      <nav className="fixed inset-x-4 bottom-4 z-50 rounded-lg bg-background shadow">
        <div className="flex items-stretch justify-between gap-2 p-2">
          <Link href={'/reporter'} className="flex-1">
            <Button
              className="size-14 w-full flex-col gap-1"
              variant={'default'}
            >
              <House className="size-7" />
              <span className="text-xs">Beranda</span>
            </Button>
          </Link>
          <Link href={'/reporter/history'} className="flex-1">
            <Button
              className="size-14 w-full flex-col gap-1"
              variant={'secondary'}
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
