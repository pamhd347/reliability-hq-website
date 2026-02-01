import Link from 'next/link';
import Image from 'next/image';
import { Product } from '@/data/products';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const categoryColors = {
    templates: 'bg-deep-teal',
    courses: 'bg-industrial-amber',
    tools: 'bg-slate-navy',
    bundles: 'bg-purple-600',
  };

  const categoryLabels = {
    templates: 'Template',
    courses: 'Course',
    tools: 'Tool',
    bundles: 'Bundle',
  };

  return (
    <Link
      href={`/products/${product.slug}`}
      className="group bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden border border-light-grey"
    >
      {/* Product Image */}
      <div className="aspect-[4/3] bg-off-white relative overflow-hidden">
        {product.image ? (
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-deep-teal/10 to-slate-navy/10">
            <div className="w-16 h-16 bg-deep-teal/20 rounded-lg flex items-center justify-center">
              <svg className="w-8 h-8 text-deep-teal" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
              </svg>
            </div>
          </div>
        )}
        
        {/* Category Badge */}
        <div className="absolute top-3 left-3 z-10">
          <span className={`${categoryColors[product.category]} text-white text-xs font-semibold px-2.5 py-1 rounded-full shadow-sm`}>
            {categoryLabels[product.category]}
          </span>
        </div>
        
        {/* Featured Badge */}
        {product.featured && (
          <div className="absolute top-3 right-3 z-10">
            <span className="bg-industrial-amber text-white text-xs font-semibold px-2.5 py-1 rounded-full shadow-sm">
              Featured
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="font-heading font-semibold text-lg text-slate-navy group-hover:text-deep-teal transition-colors">
          {product.name}
        </h3>
        <p className="text-mid-grey text-sm mt-2 line-clamp-2">
          {product.description}
        </p>
        <div className="mt-4 flex items-center justify-between">
          <span className="font-heading font-bold text-xl text-deep-teal">
            £{product.price}
          </span>
          <span className="text-sm font-medium text-deep-teal group-hover:translate-x-1 transition-transform">
            View Product →
          </span>
        </div>
      </div>
    </Link>
  );
}
