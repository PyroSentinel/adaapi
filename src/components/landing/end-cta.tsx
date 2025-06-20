'use client';

import { Boxes } from '@/components/ui/background-boxes';
import { ArrowUpRight } from 'lucide-react';
import Link from 'next/link';

import { Button } from '../ui/button';

export default function EndCTA() {
  return (
    <section className="flex h-full flex-col items-center justify-center px-2">
      <div className="relative container mx-auto flex flex-col items-center justify-center overflow-hidden rounded-3xl border-2 border-border bg-secondary/50 px-4 py-20">
        <h1 className="z-10 mb-4 text-center text-xl font-medium text-secondary-foreground lg:text-2xl xl:text-4xl">
          Siap Meningkatkan Pengelolaan Praktikum Informatika?
        </h1>
        <p className="z-10 mb-6 max-w-4xl text-center text-sm text-secondary-foreground/80 md:text-lg">
          Bergabunglah bersama ratusan admin, asisten, dan praktikan yang sudah
          merasakan kemudahan manajemen praktikum secara digital. Mulai dari
          pengelolaan jadwal, kehadiran, hingga penilaian, semua terintegrasi
          dalam satu platform.
        </p>
        <Link href="#" className="z-10">
          <Button size={'lg'}>
            Coba Sekarang
            <ArrowUpRight />
          </Button>
        </Link>
        <Boxes />
      </div>
    </section>
  );
}
