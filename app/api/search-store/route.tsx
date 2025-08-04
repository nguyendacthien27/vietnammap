import {NextResponse} from 'next/server';
import {searchStores} from '@/lib/searchStores';

export async function GET(request: Request) {
    const {searchParams} = new URL(request.url);
    const query = searchParams.get('q');

    if (!query) {
        return NextResponse.json({error: 'Missing query'}, {status: 400});
    }

    const results = searchStores(query);
    return NextResponse.json(results);
}