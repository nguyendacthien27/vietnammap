import {Store, stores} from '@/data/stores';
import {normalizeVietnamese} from '@/lib/utils';

export function searchStores(query: string): Store[] {
    const normQuery = normalizeVietnamese(query);
    return stores.filter((store) => {
        const normName = normalizeVietnamese(store.name);
        const normAddr = normalizeVietnamese(store.address);
        return normName.includes(normQuery) || normAddr.includes(normQuery);
    });
}