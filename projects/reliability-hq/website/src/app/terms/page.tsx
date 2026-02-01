import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Terms of Service - Reliability HQ',
  description: 'Terms of Service for Reliability HQ - usage rights, refund policy, and legal terms for our digital products.',
};

export default function TermsPage() {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-slate-navy text-white">
        <div className="container-max px-4 sm:px-6 lg:px-8 py-12 md:py-16">
          <div className="max-w-3xl">
            <h1 className="font-heading text-3xl md:text-4xl font-bold">
              Terms of Service
            </h1>
            <p className="mt-2 text-gray-300">
              Last updated: February 2026
            </p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="bg-white section-padding">
        <div className="container-max">
          <div className="max-w-3xl mx-auto prose prose-lg">
            <p className="lead text-mid-grey">
              Please read these Terms of Service (&quot;Terms&quot;) carefully before using the Reliability HQ website (reliabilityhq.com) and purchasing our products. By accessing our website or purchasing products, you agree to be bound by these Terms.
            </p>

            <h2 className="font-heading text-2xl font-bold text-slate-navy mt-10">
              1. Definitions
            </h2>
            <ul className="text-mid-grey">
              <li><strong>&quot;We&quot;, &quot;us&quot;, &quot;our&quot;</strong> refers to Reliability HQ.</li>
              <li><strong>&quot;You&quot;, &quot;your&quot;</strong> refers to the user or purchaser of our products.</li>
              <li><strong>&quot;Products&quot;</strong> refers to all digital products sold through our website, including templates, tools, courses, and bundles.</li>
              <li><strong>&quot;Website&quot;</strong> refers to reliabilityhq.com and all associated pages.</li>
            </ul>

            <h2 className="font-heading text-2xl font-bold text-slate-navy mt-10">
              2. Product Licence and Usage Rights
            </h2>
            
            <h3 className="font-heading text-xl font-semibold text-slate-navy">
              Single User Licence (Standard)
            </h3>
            <p className="text-mid-grey">
              Unless otherwise specified, each product purchase grants you a single-user licence. This means:
            </p>
            <ul className="text-mid-grey">
              <li>You may use the product for your own personal or professional work</li>
              <li>You may install the product on multiple devices that you personally use</li>
              <li>You may modify and customise the templates for your own use</li>
              <li>You may use outputs from the products (e.g., completed analyses) in your work deliverables</li>
            </ul>

            <h3 className="font-heading text-xl font-semibold text-slate-navy">
              You May NOT:
            </h3>
            <ul className="text-mid-grey">
              <li>Redistribute, resell, or share the products with others</li>
              <li>Share login credentials or downloads with colleagues (each user requires their own licence)</li>
              <li>Use our products to create competing products for sale</li>
              <li>Remove any branding, copyright notices, or attribution from the products</li>
              <li>Claim the products as your own creation</li>
            </ul>

            <h3 className="font-heading text-xl font-semibold text-slate-navy">
              Team/Enterprise Licences
            </h3>
            <p className="text-mid-grey">
              For team or organisation-wide usage, please contact us at{' '}
              <a href="mailto:hello@reliabilityhq.com" className="text-deep-teal hover:underline">
                hello@reliabilityhq.com
              </a>{' '}
              for multi-user licensing options.
            </p>

            <h2 className="font-heading text-2xl font-bold text-slate-navy mt-10">
              3. Payment and Delivery
            </h2>
            <ul className="text-mid-grey">
              <li>All prices are displayed in GBP (British Pounds) unless otherwise stated</li>
              <li>Payment is processed securely through our payment provider</li>
              <li>All digital products are delivered immediately via download link after successful payment</li>
              <li>You will also receive an email confirmation with your download links</li>
              <li>Download links typically remain active for a reasonable period; contact us if you need to re-download</li>
            </ul>

            <h2 className="font-heading text-2xl font-bold text-slate-navy mt-10">
              4. Refund Policy
            </h2>
            <p className="text-mid-grey">
              Due to the digital nature of our products, we offer refunds under the following conditions:
            </p>
            <ul className="text-mid-grey">
              <li><strong>Within 14 days of purchase:</strong> If you are unsatisfied with your purchase, you may request a full refund within 14 days, provided you have not substantially used or benefited from the product.</li>
              <li><strong>Technical issues:</strong> If you experience technical problems that prevent you from using the product and we cannot resolve them, you are entitled to a full refund.</li>
              <li><strong>Duplicate purchases:</strong> If you accidentally purchase the same product twice, we will refund the duplicate.</li>
            </ul>
            <p className="text-mid-grey">
              To request a refund, please contact us at{' '}
              <a href="mailto:hello@reliabilityhq.com" className="text-deep-teal hover:underline">
                hello@reliabilityhq.com
              </a>{' '}
              with your order details.
            </p>

            <h2 className="font-heading text-2xl font-bold text-slate-navy mt-10">
              5. Intellectual Property
            </h2>
            <p className="text-mid-grey">
              All content on this website and within our products, including but not limited to text, graphics, logos, templates, worksheets, and course materials, is the property of Reliability HQ and is protected by copyright and other intellectual property laws.
            </p>
            <p className="text-mid-grey">
              Your purchase grants you a licence to use the products as described above. It does not transfer ownership of the intellectual property to you.
            </p>

            <h2 className="font-heading text-2xl font-bold text-slate-navy mt-10">
              6. Disclaimer and Limitation of Liability
            </h2>
            
            <h3 className="font-heading text-xl font-semibold text-slate-navy">
              Professional Advice Disclaimer
            </h3>
            <p className="text-mid-grey">
              Our products are educational and practical tools designed to support reliability engineering work. They are not a substitute for professional engineering judgement, and you remain responsible for:
            </p>
            <ul className="text-mid-grey">
              <li>Ensuring the appropriateness of any methodology for your specific application</li>
              <li>Verifying all outputs and analyses before implementation</li>
              <li>Complying with all applicable laws, regulations, and industry standards</li>
              <li>Making final decisions about maintenance strategies and equipment management</li>
            </ul>

            <h3 className="font-heading text-xl font-semibold text-slate-navy">
              Limitation of Liability
            </h3>
            <p className="text-mid-grey">
              To the maximum extent permitted by law, Reliability HQ shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including but not limited to:
            </p>
            <ul className="text-mid-grey">
              <li>Loss of profits or revenue</li>
              <li>Equipment damage or failure</li>
              <li>Business interruption</li>
              <li>Data loss</li>
            </ul>
            <p className="text-mid-grey">
              Our total liability for any claim arising from your use of our products shall not exceed the amount you paid for the relevant product.
            </p>

            <h2 className="font-heading text-2xl font-bold text-slate-navy mt-10">
              7. Product Updates
            </h2>
            <p className="text-mid-grey">
              Unless otherwise stated, your purchase includes access to minor updates and bug fixes for the product. Major new versions or significantly expanded products may be offered as separate purchases, though we typically offer upgrade discounts to existing customers.
            </p>

            <h2 className="font-heading text-2xl font-bold text-slate-navy mt-10">
              8. Governing Law
            </h2>
            <p className="text-mid-grey">
              These Terms shall be governed by and construed in accordance with the laws of England and Wales. Any disputes arising under these Terms shall be subject to the exclusive jurisdiction of the courts of England and Wales.
            </p>

            <h2 className="font-heading text-2xl font-bold text-slate-navy mt-10">
              9. Changes to These Terms
            </h2>
            <p className="text-mid-grey">
              We reserve the right to modify these Terms at any time. Changes will be effective immediately upon posting to our website. Your continued use of our website or products after any changes indicates your acceptance of the modified Terms.
            </p>

            <h2 className="font-heading text-2xl font-bold text-slate-navy mt-10">
              10. Contact Information
            </h2>
            <p className="text-mid-grey">
              If you have any questions about these Terms, please contact us:
            </p>
            <ul className="text-mid-grey">
              <li>
                Email:{' '}
                <a href="mailto:hello@reliabilityhq.com" className="text-deep-teal hover:underline">
                  hello@reliabilityhq.com
                </a>
              </li>
              <li>
                Contact form:{' '}
                <Link href="/contact" className="text-deep-teal hover:underline">
                  reliabilityhq.com/contact
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
