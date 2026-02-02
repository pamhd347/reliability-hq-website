'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const { user, loading, signOut, isConfigured } = useAuth();

  const navigation = [
    { name: 'Training', href: '/training' },
    { name: 'AI Tools', href: '/ai-tools' },
    { name: 'Products', href: '/products' },
    { name: 'Blog', href: '/blog' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ];

  const handleSignOut = async () => {
    await signOut();
    setUserMenuOpen(false);
  };

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
            
            {/* Auth button - only show if auth is configured */}
            {isConfigured && !loading && (
              user ? (
                <div className="relative">
                  <button
                    onClick={() => setUserMenuOpen(!userMenuOpen)}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-off-white hover:bg-light-grey transition-colors"
                  >
                    <div className="w-8 h-8 bg-deep-teal rounded-full flex items-center justify-center text-white font-semibold text-sm">
                      {user.email?.charAt(0).toUpperCase()}
                    </div>
                    <svg className="w-4 h-4 text-mid-grey" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                    </svg>
                  </button>
                  
                  {userMenuOpen && (
                    <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-light-grey py-2">
                      <div className="px-4 py-2 border-b border-light-grey">
                        <p className="text-sm font-medium text-slate-navy truncate">{user.email}</p>
                      </div>
                      <Link
                        href="/training"
                        className="block px-4 py-2 text-sm text-charcoal hover:bg-off-white"
                        onClick={() => setUserMenuOpen(false)}
                      >
                        My Training
                      </Link>
                      <button
                        onClick={handleSignOut}
                        className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                      >
                        Sign Out
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  href="/login"
                  className="bg-deep-teal text-white px-5 py-2.5 rounded-lg font-semibold hover:bg-slate-navy transition-colors duration-200"
                >
                  Log In
                </Link>
              )
            )}
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
              
              {isConfigured && !loading && (
                user ? (
                  <>
                    <div className="pt-4 border-t border-light-grey">
                      <p className="text-sm text-mid-grey mb-2">Signed in as</p>
                      <p className="text-sm font-medium text-slate-navy truncate">{user.email}</p>
                    </div>
                    <Link
                      href="/training"
                      className="text-charcoal hover:text-deep-teal font-medium py-2"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      My Training
                    </Link>
                    <button
                      onClick={() => {
                        handleSignOut();
                        setMobileMenuOpen(false);
                      }}
                      className="text-left text-red-600 hover:text-red-700 font-medium py-2"
                    >
                      Sign Out
                    </button>
                  </>
                ) : (
                  <Link
                    href="/login"
                    className="bg-deep-teal text-white px-5 py-2.5 rounded-lg font-semibold text-center hover:bg-slate-navy transition-colors duration-200"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Log In
                  </Link>
                )
              )}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
