import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Privacy Policy - Reliability HQ',
  description: 'Privacy Policy for Reliability HQ - how we collect, use, and protect your personal information.',
};

export default function PrivacyPage() {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-slate-navy text-white">
        <div className="container-max px-4 sm:px-6 lg:px-8 py-12 md:py-16">
          <div className="max-w-3xl">
            <h1 className="font-heading text-3xl md:text-4xl font-bold">
              Privacy Policy
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
              Reliability HQ (&quot;we&quot;, &quot;our&quot;, or &quot;us&quot;) is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website reliabilityhq.com and purchase our products.
            </p>

            <h2 className="font-heading text-2xl font-bold text-slate-navy mt-10">
              Information We Collect
            </h2>
            
            <h3 className="font-heading text-xl font-semibold text-slate-navy">
              Personal Information
            </h3>
            <p className="text-mid-grey">
              We may collect personal information that you voluntarily provide to us when you:
            </p>
            <ul className="text-mid-grey">
              <li>Make a purchase on our website</li>
              <li>Subscribe to our email newsletter</li>
              <li>Contact us via email or contact form</li>
              <li>Create an account (if applicable)</li>
            </ul>
            <p className="text-mid-grey">
              This information may include your name, email address, billing address, and payment information.
            </p>

            <h3 className="font-heading text-xl font-semibold text-slate-navy">
              Automatically Collected Information
            </h3>
            <p className="text-mid-grey">
              When you visit our website, we may automatically collect certain information about your device, including:
            </p>
            <ul className="text-mid-grey">
              <li>IP address</li>
              <li>Browser type and version</li>
              <li>Pages you visit and time spent</li>
              <li>Referring website address</li>
              <li>Device type and operating system</li>
            </ul>

            <h2 className="font-heading text-2xl font-bold text-slate-navy mt-10">
              How We Use Your Information
            </h2>
            <p className="text-mid-grey">
              We use the information we collect to:
            </p>
            <ul className="text-mid-grey">
              <li>Process and fulfil your orders</li>
              <li>Send you order confirmations and product downloads</li>
              <li>Send marketing communications (with your consent)</li>
              <li>Respond to your enquiries and provide customer support</li>
              <li>Improve our website and products</li>
              <li>Comply with legal obligations</li>
            </ul>

            <h2 className="font-heading text-2xl font-bold text-slate-navy mt-10">
              Cookies
            </h2>
            <p className="text-mid-grey">
              We use cookies and similar tracking technologies to track activity on our website and store certain information. Cookies are files with a small amount of data that may include an anonymous unique identifier.
            </p>
            <p className="text-mid-grey">
              You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, you may not be able to use some portions of our website.
            </p>

            <h2 className="font-heading text-2xl font-bold text-slate-navy mt-10">
              Third-Party Services
            </h2>
            <p className="text-mid-grey">
              We may use third-party services that collect, monitor, and analyse data to improve our service. These may include:
            </p>
            <ul className="text-mid-grey">
              <li><strong>Payment Processors:</strong> We use secure payment processors to handle transactions. We do not store your full payment card details.</li>
              <li><strong>Email Service Providers:</strong> We use email marketing services to send newsletters and promotional content.</li>
              <li><strong>Analytics:</strong> We use analytics tools to understand how visitors use our website.</li>
            </ul>

            <h2 className="font-heading text-2xl font-bold text-slate-navy mt-10">
              Data Security
            </h2>
            <p className="text-mid-grey">
              We implement appropriate technical and organisational measures to protect your personal information against unauthorised access, alteration, disclosure, or destruction. However, no method of transmission over the Internet or electronic storage is 100% secure.
            </p>

            <h2 className="font-heading text-2xl font-bold text-slate-navy mt-10">
              Your Rights (GDPR)
            </h2>
            <p className="text-mid-grey">
              If you are a resident of the European Economic Area (EEA) or United Kingdom, you have certain data protection rights:
            </p>
            <ul className="text-mid-grey">
              <li><strong>Right of Access:</strong> You can request copies of your personal data.</li>
              <li><strong>Right to Rectification:</strong> You can request that we correct inaccurate data.</li>
              <li><strong>Right to Erasure:</strong> You can request that we delete your personal data.</li>
              <li><strong>Right to Restrict Processing:</strong> You can request that we restrict processing of your data.</li>
              <li><strong>Right to Data Portability:</strong> You can request a copy of your data in a machine-readable format.</li>
              <li><strong>Right to Object:</strong> You can object to our processing of your personal data.</li>
            </ul>
            <p className="text-mid-grey">
              To exercise any of these rights, please contact us at{' '}
              <a href="mailto:hello@reliabilityhq.com" className="text-deep-teal hover:underline">
                hello@reliabilityhq.com
              </a>.
            </p>

            <h2 className="font-heading text-2xl font-bold text-slate-navy mt-10">
              Data Retention
            </h2>
            <p className="text-mid-grey">
              We will retain your personal information only for as long as is necessary for the purposes set out in this Privacy Policy. We will retain and use your information to the extent necessary to comply with our legal obligations, resolve disputes, and enforce our policies.
            </p>

            <h2 className="font-heading text-2xl font-bold text-slate-navy mt-10">
              Children&apos;s Privacy
            </h2>
            <p className="text-mid-grey">
              Our website is not intended for children under 16 years of age. We do not knowingly collect personal information from children under 16.
            </p>

            <h2 className="font-heading text-2xl font-bold text-slate-navy mt-10">
              Changes to This Policy
            </h2>
            <p className="text-mid-grey">
              We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the &quot;Last updated&quot; date.
            </p>

            <h2 className="font-heading text-2xl font-bold text-slate-navy mt-10">
              Contact Us
            </h2>
            <p className="text-mid-grey">
              If you have any questions about this Privacy Policy, please contact us:
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
