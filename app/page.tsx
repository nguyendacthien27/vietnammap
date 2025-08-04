import {cookies} from 'next/headers';
import {redirect} from 'next/navigation';
import MapWrapper from '@/component/MapWrapper';

export default async function Home() {
    const cookieStore = await cookies();
    const authToken = cookieStore.get('auth')?.value;

    if (!authToken) {
        redirect('/login');
    }

    return (
        <MapWrapper/>
    );
}
