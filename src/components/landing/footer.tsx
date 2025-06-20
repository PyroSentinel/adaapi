import { Button } from '@/components/ui/button';
import Link from 'next/link';

interface LinkItem {
  name: string;
  href: string;
  target?: string;
}

function LinkGroup(links: LinkItem[]) {
  return links.map((link) => (
    <Link href={link.href} key={link.name} target={link.target}>
      <Button variant={'link'} className="px-0 text-muted-foreground">
        {link.name}
      </Button>
    </Link>
  ));
}

export default function Footer() {
  const footerLinks: LinkItem[] = [
    { name: 'Privacy Policy', href: '/#' },
    { name: 'Terms of Service', href: '/#' },
  ];

  return (
    <footer className="pt-10 md:px-2 md:py-16">
      <div className="container mx-auto rounded-t-3xl bg-secondary/50 p-4 md:rounded-3xl md:p-8">
        <div className="flex flex-col-reverse flex-wrap items-center justify-center gap-2 md:flex-row md:justify-between">
          <p className="leading-7 [&:not(:first-child)]:mt-6">
            © 2025 Labora. All rights reserved.
          </p>
          <div className="flex gap-2">{LinkGroup(footerLinks)}</div>
        </div>
      </div>
    </footer>
  );
}
