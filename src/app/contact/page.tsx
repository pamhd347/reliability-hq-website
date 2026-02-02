import type { Metadata } from 'next';
import Button from '@/components/Button';

export const metadata: Metadata = {
  title: 'Contact Us - Reliability HQ',
  description: 'Get in touch with Reliability HQ. We\'re here to help with questions about our RCM templates, tools, and training.',
};

export default function ContactPage() {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-slate-navy to-deep-teal text-white">
        <div className="container-max px-4 sm:px-6 lg:px-8 py-16 md:py-20">
          <div className="max-w-3xl">
            <h1 className="font-heading text-4xl md:text-5xl font-bold">
              Contact Us
            </h1>
            <p className="mt-4 text-xl text-gray-200">
              Have a question? We&apos;d love to hear from you.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="bg-off-white section-padding">
        <div className="container-max">
          <div className="grid lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
            {/* Contact Form */}
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-light-grey">
              <h2 className="font-heading text-2xl font-bold text-slate-navy mb-6">
                Send Us a Message
              </h2>
              <form className="space-y-6" action="https://formspree.io/f/placeholder" method="POST">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-charcoal mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    className="w-full px-4 py-3 rounded-lg border border-light-grey focus:outline-none focus:ring-2 focus:ring-deep-teal focus:border-transparent"
                    placeholder="Your name"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-charcoal mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className="w-full px-4 py-3 rounded-lg border border-light-grey focus:outline-none focus:ring-2 focus:ring-deep-teal focus:border-transparent"
                    placeholder="you@example.com"
                  />
                </div>
                
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-charcoal mb-2">
                    Subject
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    className="w-full px-4 py-3 rounded-lg border border-light-grey focus:outline-none focus:ring-2 focus:ring-deep-teal focus:border-transparent"
                  >
                    <option value="general">General Enquiry</option>
                    <option value="product">Product Question</option>
                    <option value="support">Technical Support</option>
                    <option value="bulk">Bulk/Enterprise Licensing</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-charcoal mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-light-grey focus:outline-none focus:ring-2 focus:ring-deep-teal focus:border-transparent resize-none"
                    placeholder="How can we help?"
                  />
                </div>
                
                <Button type="submit" variant="primary" size="lg" className="w-full">
                  Send Message
                </Button>
              </form>
            </div>

            {/* Contact Info */}
            <div className="space-y-8">
              <div>
                <h2 className="font-heading text-2xl font-bold text-slate-navy mb-6">
                  Get in Touch
                </h2>
                <p className="text-mid-grey mb-8">
                  We&apos;re here to help with any questions about our products, methodology, or how RCM can work for your organisation.
                </p>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm border border-light-grey">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-deep-teal/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-deep-teal" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-heading font-semibold text-lg text-slate-navy mb-1">Email</h3>
                    <a href="mailto:hello@reliabilityhq.com" className="text-deep-teal hover:underline">
                      hello@reliabilityhq.com
                    </a>
                    <p className="text-sm text-mid-grey mt-1">We typically respond within 24-48 hours</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm border border-light-grey">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-industrial-amber/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-industrial-amber" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-heading font-semibold text-lg text-slate-navy mb-1">Response Time</h3>
                    <p className="text-mid-grey">
                      We aim to respond to all enquiries within 1-2 business days. For urgent product support, please include &quot;URGENT&quot; in your subject line.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-deep-teal/5 rounded-xl p-6 border border-deep-teal/20">
                <h3 className="font-heading font-semibold text-lg text-slate-navy mb-2">
                  Looking for Bulk Licensing?
                </h3>
                <p className="text-mid-grey text-sm">
                  If you&apos;re interested in licensing our products for your entire team or organisation, please select &quot;Bulk/Enterprise Licensing&quot; in the subject dropdown. We offer volume discounts and can customise products for your specific needs.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
