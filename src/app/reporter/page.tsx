import Logo from '@/components/custom/logo';
import { Button } from '@/components/ui/button';
import { History, House } from 'lucide-react';
import Link from 'next/link';

export default function ReporterPage() {
  return (
    <main className="relative h-lvh bg-[radial-gradient(circle_at_center,color-mix(in_oklab,_var(--primary)_60%,_transparent)_0%,color-mix(in_oklab,_var(--primary)_5%,_transparent)_40%)]">
      <section className="mb-4 flex flex-col gap-64 p-4">
        <div className="absolute inset-x-8 top-18">
          <h1 className="mb-2 text-center text-3xl font-semibold">
            Ada Bahaya?
          </h1>
          <p className="text-center text-muted-foreground">
            Tekan tombol darurat kebakaran dibawah untuk melaporkan kebakaran
          </p>
        </div>
        <p className="absolute inset-x-8 bottom-40 text-center text-sm text-muted-foreground">
          Pastikan laporan yang kamu kirim benar adanya!
        </p>
      </section>
      <div className="absolute top-0 right-0 bottom-0 left-0 flex items-center justify-center">
        <Link href={'/reporter/create'}>
          <div className="relative mx-auto flex size-65 items-center justify-center">
            <div className="absolute mx-auto size-70 rounded-full bg-primary/5"></div>
            <div className="absolute mx-auto size-57 rounded-full bg-primary/25"></div>
            <div className="absolute mx-auto size-43 rounded-full bg-primary/90"></div>
            <Logo className="absolute mx-auto size-18 text-white" />
          </div>
        </Link>
      </div>
      <nav className="fixed inset-x-4 bottom-4 z-50 rounded-lg bg-background/10 shadow backdrop-blur-md">
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
            <Button className="size-14 w-full flex-col gap-1" variant={'ghost'}>
              <History className="size-7" />
              <span className="text-xs">Riwayat</span>
            </Button>
          </Link>
        </div>
      </nav>
    </main>
  );
}
