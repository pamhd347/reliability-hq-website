'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navigation = [
    { name: 'Products', href: '/products' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <nav className="container-max px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-deep-teal rounded-lg flex items-center justify-center">
              <span className="text-white font-heading font-bold text-lg">R</span>
            </div>
            <div className="hidden sm:block">
              <span className="font-heading font-semibold text-xl text-slate-navy">Reliability</span>
              <span className="font-heading font-semibold text-xl text-deep-teal"> HQ</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-charcoal hover:text-deep-teal font-medium transition-colors duration-200"
              >
                {item.name}
              </Link>
            ))}
            <Link
              href="/products"
              className="bg-deep-teal text-white px-5 py-2.5 rounded-lg font-semibold hover:bg-slate-navy transition-colors duration-200"
            >
              Browse Products
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            type="button"
            className="md:hidden p-2 text-charcoal hover:text-deep-teal"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-light-grey">
            <div className="flex flex-col space-y-4">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-charcoal hover:text-deep-teal font-medium py-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <Link
                href="/products"
                className="bg-deep-teal text-white px-5 py-2.5 rounded-lg font-semibold text-center hover:bg-slate-navy transition-colors duration-200"
                onClick={() => setMobileMenuOpen(false)}
              >
                Browse Products
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
