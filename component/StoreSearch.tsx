'use client';

import {useState} from 'react';
import {Store} from '@/data/stores';

type Props = {
    onResults: (results: Store[]) => void;
    onSelect: (store: Store | null) => void;
    allStores: Store[];
};

export default function StoreSearch({onResults, onSelect, allStores}: Props) {
    const [search, setSearch] = useState('');

    const handleSearch = async () => {
        const trimmed = search.trim();

        if (!trimmed) {
            onResults(allStores);
            onSelect(null);
            return;
        }

        try {
            const res = await fetch(`/api/search-store?q=${encodeURIComponent(trimmed)}`);
            const results: Store[] = await res.json();

            if (results.length === 0) {
                alert('Search store not found');
            }

            onResults(results);
            onSelect(results[0] || null);
        } catch (error) {
            console.error('Search failed:', error);
            alert('Failed to search store.');
        }
    };

    return (
        <div className="absolute top-4 left-4 z-50 bg-white p-2 rounded shadow-md flex gap-2">
            <input
                type="text"
                className="border p-2 rounded w-60"
                placeholder="Search stores..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />
            <button onClick={handleSearch} className="bg-blue-500 text-white px-4 rounded">
                Search
            </button>
        </div>
    );
}
