import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import Button from '@/components/Button';
import { products, getProductBySlug } from '@/data/products';

interface ProductPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return products.map((product) => ({
    slug: product.slug,
  }));
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  
  if (!product) {
    return {
      title: 'Product Not Found - Reliability HQ',
    };
  }

  return {
    title: `${product.name} - Reliability HQ`,
    description: product.description,
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const categoryLabels = {
    templates: 'Template',
    courses: 'Course',
    tools: 'Tool',
    bundles: 'Bundle',
  };

  const categoryColors = {
    templates: 'bg-deep-teal',
    courses: 'bg-industrial-amber',
    tools: 'bg-slate-navy',
    bundles: 'bg-purple-600',
  };

  return (
    <div>
      {/* Breadcrumb */}
      <div className="bg-white border-b border-light-grey">
        <div className="container-max px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex items-center gap-2 text-sm">
            <Link href="/" className="text-mid-grey hover:text-deep-teal">
              Home
            </Link>
            <span className="text-mid-grey">/</span>
            <Link href="/products" className="text-mid-grey hover:text-deep-teal">
              Products
            </Link>
            <span className="text-mid-grey">/</span>
            <span className="text-charcoal font-medium">{product.name}</span>
          </nav>
        </div>
      </div>

      {/* Product Header */}
      <section className="bg-white section-padding">
        <div className="container-max">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Product Image */}
            <div className="aspect-[4/3] bg-off-white rounded-2xl overflow-hidden relative shadow-lg">
              {product.image ? (
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover"
                  priority
                />
              ) : (
                <div className="absolute inset-0 bg-gradient-to-br from-deep-teal/10 to-slate-navy/10 flex items-center justify-center">
                  <div className="w-24 h-24 bg-deep-teal/20 rounded-xl flex items-center justify-center">
                    <svg className="w-12 h-12 text-deep-teal" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                    </svg>
                  </div>
                </div>
              )}
            </div>

            {/* Product Info */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className={`${categoryColors[product.category]} text-white text-sm font-semibold px-3 py-1 rounded-full`}>
                  {categoryLabels[product.category]}
                </span>
                {product.featured && (
                  <span className="bg-industrial-amber/10 text-industrial-amber text-sm font-semibold px-3 py-1 rounded-full">
                    Featured
                  </span>
                )}
              </div>

              <h1 className="font-heading text-3xl md:text-4xl font-bold text-slate-navy mb-4">
                {product.name}
              </h1>

              <p className="text-lg text-mid-grey mb-6">
                {product.longDescription || product.description}
              </p>

              <div className="flex items-baseline gap-2 mb-8">
                <span className="font-heading text-4xl font-bold text-deep-teal">
                  £{product.price}
                </span>
                <span className="text-mid-grey">GBP</span>
              </div>

              <div className="space-y-4">
                {product.buyUrl ? (
                  <Button href={product.buyUrl} variant="secondary" size="lg" className="w-full sm:w-auto">
                    Buy Now — £{product.price}
                  </Button>
                ) : (
                  <Button variant="secondary" size="lg" className="w-full sm:w-auto opacity-75 cursor-not-allowed">
                    Coming Soon
                  </Button>
                )}
                <p className="text-sm text-mid-grey">
                  Instant digital download after purchase
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Product Details */}
      <section className="bg-off-white section-padding">
        <div className="container-max">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Features */}
            {product.features && (
              <div className="bg-white rounded-xl p-6 shadow-sm border border-light-grey">
                <h3 className="font-heading font-semibold text-xl text-slate-navy mb-4">
                  Features
                </h3>
                <ul className="space-y-3">
                  {product.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-deep-teal mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                      </svg>
                      <span className="text-mid-grey">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Who Is It For */}
            {product.whoIsItFor && (
              <div className="bg-white rounded-xl p-6 shadow-sm border border-light-grey">
                <h3 className="font-heading font-semibold text-xl text-slate-navy mb-4">
                  Who Is It For
                </h3>
                <ul className="space-y-3">
                  {product.whoIsItFor.map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-industrial-amber mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                      </svg>
                      <span className="text-mid-grey">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* What's Included */}
            {product.whatsIncluded && (
              <div className="bg-white rounded-xl p-6 shadow-sm border border-light-grey">
                <h3 className="font-heading font-semibold text-xl text-slate-navy mb-4">
                  What&apos;s Included
                </h3>
                <ul className="space-y-3">
                  {product.whatsIncluded.map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-slate-navy mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                      </svg>
                      <span className="text-mid-grey">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-deep-teal section-padding">
        <div className="container-max">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="font-heading text-2xl md:text-3xl font-bold text-white mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-gray-200 mb-6">
              Download instantly and start your RCM analysis today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {product.buyUrl ? (
                <Button href={product.buyUrl} variant="secondary" size="lg">
                  Buy Now — £{product.price}
                </Button>
              ) : (
                <Button variant="secondary" size="lg" className="opacity-75 cursor-not-allowed">
                  Coming Soon — £{product.price}
                </Button>
              )}
              <Button href="/products" variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-deep-teal">
                Browse More Products
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
