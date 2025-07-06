"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navLinks = [
  { href: '/home', label: 'Accueil' },
  { href: '/movies', label: 'Films' },
  { href: '/movies?view=favorites', label: 'Favoris' },
];

export function Header() {
  const pathname = usePathname();
  return (
    <header className="w-full bg-white shadow-sm sticky top-0 z-30">
      <nav className="max-w-5xl mx-auto flex items-center justify-between px-4 py-3">
        <Link href="/home" className="text-2xl font-bold text-blue-700 tracking-tight">Vizion</Link>
        <ul className="flex gap-6">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={
                  'font-medium px-2 py-1 rounded transition ' +
                  (pathname === link.href
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-700 hover:bg-gray-100')
                }
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
