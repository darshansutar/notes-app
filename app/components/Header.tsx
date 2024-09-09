'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';

export default function Header() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const navItems = [
    { href: '/', label: 'Home' },
    { href: '/notes', label: 'New Note' },
    { href: '/recent-notes', label: 'Recent Notes' },
    { href: '/folders', label: 'Folders' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-transparent backdrop-filter backdrop-blur-lg p-4 shadow-md">
      <nav className="flex justify-between items-center max-w-6xl mx-auto text-white">
        <Link href="/" className="text-xl font-bold">
          Note App
        </Link>
        <div className="md:hidden">
          <button onClick={toggleMenu} className="text-white focus:outline-none">
            {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>
        <ul className={`md:flex md:space-x-6 ${isMenuOpen ? 'block' : 'hidden'} absolute md:relative top-full left-0 right-0 bg-gray-800 md:bg-transparent p-4 md:p-0 mt-2 md:mt-0`}>
          {navItems.map(({ href, label }) => (
            <li key={href} className="mb-2 md:mb-0">
              <Link
                href={href}
                className={`block hover:text-gray-300 transition duration-300 py-2 px-3 rounded-md ${
                  pathname === href
                    ? 'bg-white bg-opacity-20 text-white'
                    : 'hover:bg-white hover:bg-opacity-10'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}