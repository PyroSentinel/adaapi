import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from '@/components/ui/card';
import Image from 'next/image';

export default function Feature() {
  return (
    <section className="container mx-auto px-2 py-16">
      <div className="grid grid-flow-row grid-cols-1 gap-4 lg:grid-cols-3 lg:grid-rows-2">
        <Card className="py-3 sm:py-6 lg:row-span-2 lg:py-4 xl:py-6">
          <CardContent className="flex flex-col gap-4 px-3 sm:px-6 lg:px-4 xl:px-6">
            <Image
              src={
                'https://images.unsplash.com/photo-1519389950473-47ba0277781c'
              }
              alt="Sistem Manajemen Praktikum"
              width={1024}
              height={1024}
              className="h-60 rounded-lg object-cover object-center"
            />
            <CardTitle className="text-xl sm:text-2xl">
              Kenapa Sistem Ini Dibuat?
            </CardTitle>
            <CardDescription className="text-base xl:text-lg">
              Praktikum melibatkan banyak pihak: admin, asisten, dan praktikan.
              Sistem ini hadir untuk memudahkan pengelolaan data, jadwal,
              kehadiran, dan penilaian secara terintegrasi.
            </CardDescription>
            <CardDescription className="text-base xl:text-lg">
              Semua proses administrasi dan monitoring praktikum kini bisa
              dilakukan secara digital, transparan, dan efisien. Sistem ini juga
              membantu mengurangi human error, mempercepat akses informasi, dan
              meningkatkan kolaborasi antar pihak.
            </CardDescription>
            <CardDescription className="text-base xl:text-lg">
              Dengan adanya sistem ini, kolaborasi antara admin, asisten, dan
              praktikan menjadi lebih terstruktur.
            </CardDescription>
          </CardContent>
        </Card>
        <Card className="py-3 sm:py-6 lg:col-span-1 lg:py-4 xl:py-6">
          <CardContent className="flex flex-col gap-4 px-3 sm:px-6 lg:px-4 xl:px-6">
            <Image
              src={
                'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158'
              }
              alt="Manajemen Data Praktikan"
              width={1024}
              height={1024}
              className="rounded-lg object-cover object-center lg:h-45 xl:h-40"
            />
            <CardTitle className="text-xl sm:text-2xl">
              Manajemen Data Praktikan
            </CardTitle>
            <CardDescription className="text-base xl:text-lg">
              Admin dapat mengelola data praktikan, kelas, dan jadwal dengan
              mudah. Praktikan dapat melihat jadwal, nilai, dan kehadiran mereka
              secara real-time.
            </CardDescription>
          </CardContent>
        </Card>
        <Card className="py-3 sm:py-6 lg:col-span-1 lg:py-4 xl:py-6">
          <CardContent className="flex flex-col gap-4 px-3 sm:px-6 lg:px-4 xl:px-6">
            <Image
              src={
                'https://images.unsplash.com/photo-1528901166007-3784c7dd3653'
              }
              alt="Peran Asisten Praktikum"
              width={1024}
              height={1024}
              className="h-35 rounded-lg object-cover object-center"
            />
            <CardTitle className="text-xl sm:text-2xl">
              Peran Asisten Praktikum
            </CardTitle>
            <CardDescription className="text-base xl:text-lg">
              Asisten dapat mengelola kehadiran, penilaian, dan laporan
              praktikum secara online. Kolaborasi antara admin, asisten, dan
              praktikan menjadi lebih mudah.
            </CardDescription>
          </CardContent>
        </Card>
        <Card className="py-3 sm:py-6 lg:col-span-2 lg:py-4 xl:py-6">
          <CardContent className="flex flex-col gap-4 px-3 sm:px-6 lg:px-4 xl:px-6">
            <Image
              src={
                'https://images.unsplash.com/photo-1587691592099-24045742c181'
              }
              alt="Integrasi & Transparansi"
              width={1024}
              height={1024}
              className="w-full rounded-lg object-cover object-center lg:h-45 xl:h-50"
            />
            <CardTitle className="text-xl sm:text-2xl">
              Integrasi & Transparansi
            </CardTitle>
            <CardDescription className="text-base xl:text-lg">
              Semua data dan proses praktikum terintegrasi dalam satu platform.
              Setiap user (admin, asisten, praktikan) memiliki akses sesuai
              peran dan kebutuhan.
            </CardDescription>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
