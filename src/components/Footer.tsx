import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-slate-navy text-white">
      <div className="container-max px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-deep-teal rounded-lg flex items-center justify-center">
                <span className="text-white font-heading font-bold text-lg">R</span>
              </div>
              <div>
                <span className="font-heading font-semibold text-xl">Reliability</span>
                <span className="font-heading font-semibold text-xl text-deep-teal"> HQ</span>
              </div>
            </div>
            <p className="text-gray-300 text-sm">
              Built for Reliability Engineers
            </p>
            <p className="text-mid-grey text-sm mt-2">
              Reliability Made Practical
            </p>
          </div>

          {/* Training */}
          <div>
            <h3 className="font-heading font-semibold text-lg mb-4">Training</h3>
            <ul className="space-y-2 text-gray-300">
              <li>
                <Link href="/training" className="hover:text-industrial-amber transition-colors">
                  All Courses
                </Link>
              </li>
              <li>
                <Link href="/training/rcm-fundamentals" className="hover:text-industrial-amber transition-colors">
                  RCM Fundamentals
                </Link>
              </li>
              <li>
                <Link href="/training/rcm-practitioner" className="hover:text-industrial-amber transition-colors">
                  RCM Practitioner
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-heading font-semibold text-lg mb-4">Company</h3>
            <ul className="space-y-2 text-gray-300">
              <li>
                <Link href="/about" className="hover:text-industrial-amber transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-industrial-amber transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-heading font-semibold text-lg mb-4">Support</h3>
            <ul className="space-y-2 text-gray-300">
              <li>
                <Link href="/terms" className="hover:text-industrial-amber transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-industrial-amber transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <a href="mailto:hello@reliabilityhq.com" className="hover:text-industrial-amber transition-colors">
                  hello@reliabilityhq.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-gray-700 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-mid-grey text-sm">
            © {new Date().getFullYear()} Reliability HQ. All rights reserved.
          </p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            {/* LinkedIn */}
            <a
              href="#"
              className="text-gray-400 hover:text-industrial-amber transition-colors"
              aria-label="LinkedIn"
            >
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </a>
            {/* YouTube */}
            <a
              href="#"
              className="text-gray-400 hover:text-industrial-amber transition-colors"
              aria-label="YouTube"
            >
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
            </a>
            {/* Twitter/X */}
            <a
              href="#"
              className="text-gray-400 hover:text-industrial-amber transition-colors"
              aria-label="Twitter"
            >
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
