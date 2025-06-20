import EndCTA from '@/components/landing/end-cta';
import Feature from '@/components/landing/feature';
import Footer from '@/components/landing/footer';
import Header from '@/components/landing/header';
import Hero from '@/components/landing/hero';
import { Separator } from '@/components/ui/separator';

export default function Home() {
  return (
    <>
      <Header />
      <Hero />
      <Separator />
      <Feature />
      <EndCTA />
      <Footer />
    </>
  );
}
