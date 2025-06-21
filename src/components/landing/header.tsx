'use client';

import { Button } from '@/components/ui/button';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { cn } from '@/lib/utils';
import { Menu } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import Logo from '../custom/logo';

export default function Header() {
  const menus = [
    {
      title: 'Pelapor',
      href: '/reporter',
    },
    {
      title: 'Pemadam',
      href: '/fireman',
    },
  ];

  const pathname = usePathname();

  return (
    <header className="w-full border-b border-border">
      <div className="container mx-auto flex h-16 items-center justify-between rounded-none px-2">
        <Link
          href="/"
          scroll={false}
          className="flex items-center gap-2"
          prefetch={false}
        >
          <Button className="rounded-full">
            <Logo />
            <span className="">adaapi</span>
          </Button>
        </Link>
        <div className="flex items-center gap-4">
          <NavigationMenu>
            <NavigationMenuList className="hidden items-center gap-2 text-sm font-medium lg:flex lg:gap-2 xl:gap-6">
              {menus.map((menu) => (
                <NavigationMenuItem key={menu.title}>
                  <NavigationMenuLink
                    className={navigationMenuTriggerStyle({
                      className: cn(
                        'bg-transparent',
                        pathname === menu.href
                          ? 'underline underline-offset-2'
                          : '',
                      ),
                    })}
                    active={pathname === menu.href}
                    asChild
                  >
                    <Link href={menu.href}>{menu.title}</Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full lg:hidden"
              >
                <Menu className="size-5 text-foreground/70" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="p-4 lg:hidden">
              <SheetTitle>Menu</SheetTitle>
              <NavigationMenu className="items-start">
                <NavigationMenuList className="grid gap-4">
                  {menus.map((menu) => (
                    <NavigationMenuItem key={menu.title}>
                      <NavigationMenuLink
                        className={navigationMenuTriggerStyle()}
                        active={pathname === menu.href}
                        asChild
                      >
                        <Link href={menu.href}>{menu.title}</Link>
                      </NavigationMenuLink>
                    </NavigationMenuItem>
                  ))}
                </NavigationMenuList>
              </NavigationMenu>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
