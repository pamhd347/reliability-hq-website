'use client';

import { useState } from 'react';
import ProductCard from '@/components/ProductCard';
import { products, Product } from '@/data/products';

type Category = 'all' | Product['category'];

export default function ProductsPage() {
  const [selectedCategory, setSelectedCategory] = useState<Category>('all');

  const categories: { value: Category; label: string }[] = [
    { value: 'all', label: 'All Products' },
    { value: 'templates', label: 'Templates' },
    { value: 'tools', label: 'Tools' },
    { value: 'bundles', label: 'Bundles' },
    { value: 'courses', label: 'Courses' },
  ];

  const filteredProducts = selectedCategory === 'all'
    ? products
    : products.filter((p) => p.category === selectedCategory);

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-slate-navy to-deep-teal text-white">
        <div className="container-max px-4 sm:px-6 lg:px-8 py-16 md:py-20">
          <div className="max-w-3xl">
            <h1 className="font-heading text-4xl md:text-5xl font-bold">
              Products
            </h1>
            <p className="mt-4 text-xl text-gray-200">
              Professional RCM templates, tools, and training. SAE JA1011 compliant. Ready to use today.
            </p>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="bg-off-white section-padding">
        <div className="container-max">
          {/* Category Filters */}
          <div className="flex flex-wrap gap-3 mb-10">
            {categories.map((category) => (
              <button
                key={category.value}
                onClick={() => setSelectedCategory(category.value)}
                className={`px-5 py-2.5 rounded-full font-medium transition-all duration-200 ${
                  selectedCategory === category.value
                    ? 'bg-deep-teal text-white'
                    : 'bg-white text-charcoal hover:bg-light-grey border border-light-grey'
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>

          {/* Product Count */}
          <p className="text-mid-grey mb-6">
            Showing {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''}
          </p>

          {/* Products Grid */}
          {filteredProducts.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.slug} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-mid-grey text-lg">No products found in this category.</p>
              <button
                onClick={() => setSelectedCategory('all')}
                className="mt-4 text-deep-teal font-medium hover:underline"
              >
                View all products
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Coming Soon Notice */}
      <section className="bg-white section-padding">
        <div className="container-max">
          <div className="max-w-2xl mx-auto text-center bg-industrial-amber/10 rounded-2xl p-8 border border-industrial-amber/20">
            <h3 className="font-heading text-xl font-semibold text-slate-navy mb-2">
              More Products Coming Soon
            </h3>
            <p className="text-mid-grey">
              We&apos;re actively developing new templates, courses, and tools. Sign up for our newsletter to be notified when new products launch.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
