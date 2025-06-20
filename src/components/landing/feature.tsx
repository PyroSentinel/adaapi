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
              alt="Aplikasi Digital Akselerasi Antisipasi Kebakaran Indonesia"
              width={1024}
              height={1024}
              className="h-60 rounded-lg object-cover object-center"
            />
            <CardTitle className="text-xl sm:text-2xl">
              Kenapa Aplikasi Ini Dibuat?
            </CardTitle>
            <CardDescription className="text-base xl:text-lg">
              Kebakaran adalah ancaman serius yang dapat terjadi kapan saja dan
              di mana saja baik di kawasan permukiman, hutan, maupun lahan
              terbuka. Sayangnya, proses pelaporan secara manual sering kali
              lambat, tidak akurat, dan menyulitkan koordinasi antarinstansi.
              Untuk itulah adaapi hadir sebagai solusi cerdas dan cepat dalam
              menghadapi kondisi darurat kebakaran.
            </CardDescription>
            <CardDescription className="text-base xl:text-lg">
              adaapi adalah sistem pelaporan kebakaran berbasis kecerdasan
              buatan (AI) yang dirancang untuk memangkas waktu pelaporan dari
              yang biasanya memakan waktu 5 menit menjadi hanya sekitar 10 detik
              saja. Pengguna cukup mengambil foto atau video kejadian, dan
              sistem secara otomatis akan mendeteksi lokasi kejadian melalui GPS
              serta mengirimkannya ke pusat komando, pemadam kebakaran, dan
              instansi terkait.
            </CardDescription>
          </CardContent>
        </Card>
        <Card className="py-3 sm:py-6 lg:col-span-1 lg:py-4 xl:py-6">
          <CardContent className="flex flex-col gap-4 px-3 sm:px-6 lg:px-4 xl:px-6">
            <Image
              src={
                'https://ik.imagekit.io/aipproject/face-recognition-personal-identification-collage.jpg'
              }
              alt="Pendeteksi Kebakaran Berbasis AI"
              width={1024}
              height={1024}
              className="rounded-lg object-cover object-center lg:h-45 xl:h-40"
            />
            <CardTitle className="text-xl sm:text-2xl">
              Pendeteksi Kebakaran Berbasis AI
            </CardTitle>
            <CardDescription className="text-base xl:text-lg">
              Dengan dukungan AI, adaapi mampu memverifikasi laporan secara
              otomatis, menyaring laporan palsu, dan mempercepat distribusi
              informasi ke pihak-pihak yang tepat. Sistem ini dilengkapi dengan
              peta interaktif yang menampilkan lokasi kebakaran secara
              real-time, membantu tim darurat bergerak lebih cepat dan akurat
              menuju lokasi.
            </CardDescription>
          </CardContent>
        </Card>
        <Card className="py-3 sm:py-6 lg:col-span-1 lg:py-4 xl:py-6">
          <CardContent className="flex flex-col gap-4 px-3 sm:px-6 lg:px-4 xl:px-6">
            <Image
              src={
                'https://ik.imagekit.io/aipproject/3d-view-map.jpg?updatedAt=1750415841314'
              }
              alt="Lokasi Otomatis Dengan Peta Interaktif"
              width={1024}
              height={1024}
              className="h-40 rounded-lg object-cover object-center"
            />
            <CardTitle className="text-xl sm:text-2xl">
              Lokasi Otomatis Dengan Peta Interaktif
            </CardTitle>
            <CardDescription className="text-base xl:text-lg">
              Semua laporan, status penanganan, dan riwayat kejadian tersimpan
              dalam satu platform yang aman dan terintegrasi. Masyarakat dapat
              melaporkan dan memantau kondisi, petugas pemadam dapat langsung
              bertindak berdasarkan data visual dan lokasi yang akurat,
              sementara instansi pemerintah dapat memantau dan mengambil
              keputusan dengan lebih transparan dan efisien.
            </CardDescription>
          </CardContent>
        </Card>
        <Card className="py-3 sm:py-6 lg:col-span-2 lg:py-4 xl:py-6">
          <CardContent className="flex flex-col gap-4 px-3 sm:px-6 lg:px-4 xl:px-6">
            <Image
              src={
                'https://ik.imagekit.io/aipproject/firefighters-rescued-survivors.jpg'
              }
              alt="Cepat Tanggap & Mudah Digunakan"
              width={1024}
              height={1024}
              className="w-full rounded-lg object-cover object-center lg:h-45 xl:h-50"
            />
            <CardTitle className="text-xl sm:text-2xl">
              Cepat Tanggap & Mudah Digunakan
            </CardTitle>
            <CardDescription className="text-base xl:text-lg">
              Dengan adaapi, penanganan kebakaran menjadi lebih cepat,
              terstruktur, dan menyelamatkan lebih banyak nyawa. Kini, siapa pun
              bisa menjadi bagian dari solusi tanggap bencana hanya dalam
              hitungan detik.
            </CardDescription>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
