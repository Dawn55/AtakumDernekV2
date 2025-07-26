'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function SearchComponent({ currentQuery = '' }) {
  const [searchQuery, setSearchQuery] = useState(currentQuery);
  const router = useRouter();

  useEffect(() => {
    setSearchQuery(currentQuery);
  }, [currentQuery]);

  useEffect(() => {
    const params = new URLSearchParams();
    if (searchQuery.trim()) {
      params.set('q', searchQuery.trim());
    }

    const url = params.toString() ? `/documents?${params.toString()}` : '/documents';
    router.push(url);
  }, [searchQuery]);

  return (
    <div className="relative w-full mb-6">
      <input
        type="text"
        placeholder="Belge başlığı veya açıklamasında ara..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
      />
      <svg
        className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        />
      </svg>
    </div>
  );
}
