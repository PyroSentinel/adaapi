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
          Siap Membantu Penanganan Kebakaran Lebih Cepat dan Tepat?
        </h1>
        <p className="z-10 mb-6 max-w-4xl text-center text-sm text-secondary-foreground/80 md:text-lg">
          Bergabunglah bersama warga, relawan, dan instansi yang sudah
          menggunakan adaapi untuk pelaporan kebakaran secara digital. Laporkan
          kejadian hanya dalam 10 detik, lengkap dengan foto/video dan lokasi
          otomatis, lalu biarkan sistem kami menghubungkan langsung ke petugas
          pemadam dan pemerintah terkait. Cepat. Cerdas. Tanggap.
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
