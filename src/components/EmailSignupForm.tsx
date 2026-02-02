'use client';

import { useState } from 'react';

export default function EmailSignupForm() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In production, this would submit to an email service
    console.log('Email signup:', email);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="text-center">
        <p className="text-white text-lg">Thanks for subscribing! 🎉</p>
        <p className="text-gray-300 text-sm mt-2">Check your inbox for a confirmation email.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your email"
        className="flex-1 px-4 py-3 rounded-lg text-charcoal focus:outline-none focus:ring-2 focus:ring-industrial-amber"
        required
      />
      <button
        type="submit"
        className="bg-industrial-amber text-white px-6 py-3 rounded-lg font-semibold hover:bg-orange-600 transition-colors"
      >
        Join Free
      </button>
    </form>
  );
}
