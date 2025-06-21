'use client';

import { ArrowRight, ArrowUpRight, BellDot, Mail } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import { Button } from '../ui/button';

export default function Hero() {
  return (
    <section className="container mx-auto flex flex-col justify-center border-x-1 px-2 py-16 lg:flex-row lg:justify-between lg:pr-2 lg:pl-12">
      <div className="text-center lg:text-start">
        <div className="mx-auto flex w-max items-center gap-2 rounded-full bg-muted px-2 py-1 text-muted-foreground lg:mx-0 xl:gap-4 xl:px-4 xl:py-2">
          <span>
            <BellDot className="size-5 text-primary xl:size-6" />
          </span>
          <p className="text-sm xl:text-base">
            Aplikasi Digital Akselerasi Antisipasi Kebakaran Indonesia
          </p>
          <span className="rounded-full bg-primary p-1">
            <ArrowRight className="size-4 text-primary-foreground md:size-5 xl:size-6" />
          </span>
        </div>
        <h1 className="mt-4 mb-4 max-w-3xl bg-gradient-to-br from-primary to-neutral-400 bg-clip-text text-4xl leading-tight font-bold text-transparent md:text-5xl lg:mb-6 lg:text-4xl xl:mb-8 xl:text-6xl xl:tracking-wide 2xl:text-6xl">
          Karena Setiap Detik Berharga Dalam Menyelamatkan Nyawa
        </h1>
        <p className="mx-auto max-w-2xl leading-relaxed lg:mx-0 xl:text-lg xl:tracking-wide">
          Platform Pelaporan Kebakaran yang memadukan AI, geolokasi, dan
          integrasi antarinstansi untuk transformasi layanan darurat.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-4 lg:flex-row lg:justify-start 2xl:mt-12">
          <Link href="/reporter" target="_blank" rel="noopener noreferrer">
            <Button className="flex items-center gap-2 lg:px-6 lg:py-5 xl:px-8 xl:py-6">
              <span>Mulai Berkontribusi</span>
              <ArrowUpRight className="size-4" />
            </Button>
          </Link>
          <Link
            href="mailto:developer@example.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button
              className="flex items-center gap-2 lg:px-6 lg:py-5 xl:px-4 xl:py-6"
              variant={'outline'}
            >
              <Mail className="size-5" />
            </Button>
          </Link>
        </div>
        {/* <div className="mt-8">
          <Alert>
            <AlertTriangle />
            <AlertTitle>Sistem ini masih dalam tahap pengembangan.</AlertTitle>
            <AlertDescription>
              Beberapa fitur mungkin belum tersedia atau mengalami perubahan.
              Kami menghargai masukan Anda untuk perbaikan sistem ini.
            </AlertDescription>
          </Alert>
        </div> */}
      </div>
      <div className="w-full pt-20 sm:mx-auto sm:max-w-lg lg:mx-0 xl:max-w-xl xl:pt-0 2xl:max-w-3xl">
        <div className="relative mx-auto flex items-center justify-center lg:h-65 lg:w-120 xl:h-140 2xl:h-170 2xl:w-180">
          <Image
            src={
              'https://ik.imagekit.io/aipproject/hot-summer-day-dry-grass-is-burning-field-burning-field-with-dry-grass.jpg'
            }
            alt="hero"
            width={800}
            height={800}
            className="absolute -top-10 right-0 h-20 w-40 rounded-lg object-cover object-center shadow-lg lg:-top-10 lg:right-5 xl:top-5 xl:h-30 xl:w-50 2xl:top-10 2xl:right-5 2xl:h-40 2xl:w-60"
          />
          <Image
            src={
              'https://ik.imagekit.io/aipproject/two-firefighters-trying-stop-fire-forest-surrounded-by-smoke.jpg'
            }
            alt="hero"
            width={800}
            height={800}
            className="absolute bottom-25 left-0 h-20 w-40 rounded-lg object-cover object-top shadow-lg lg:bottom-25 lg:left-10 xl:bottom-60 xl:left-5 xl:h-25 xl:w-50"
          />
          <Image
            src={
              'https://ik.imagekit.io/aipproject/burning-shopping-center-mall-with-smoke.jpg'
            }
            alt="hero"
            width={800}
            height={800}
            className="absolute right-0 -bottom-5 h-10 w-60 rounded-lg object-cover object-center shadow-lg lg:right-auto lg:-bottom-7 xl:bottom-15 xl:h-35 xl:w-85"
          />
          <Image
            src={
              'https://ik.imagekit.io/aipproject/fireman-fire-fighting-evacuation-fire-drill-simulation-training-safety-condominium-factory.jpg'
            }
            alt="hero"
            width={800}
            height={800}
            className="h-70 w-70 rounded-lg object-cover object-center xl:h-100 xl:w-100 2xl:h-125 2xl:w-125"
          />
        </div>
      </div>
    </section>
  );
}
