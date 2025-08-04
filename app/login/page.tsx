'use client';
import {useEffect, useState} from 'react';
import {useRouter} from 'next/navigation';

export default function Login() {
    const [email, setEmail] = useState('');
    const router = useRouter();
    useEffect(() => {
        async function checkAuth() {
            const res = await fetch('/api/check-verify');
            if (res.ok) {
                const data = await res.json();
                if (data.authenticated) {
                    router.replace('/');
                }
            }
        }

        checkAuth();
    }, [router]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const response = await fetch('/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({email}),
        });
        if (response.ok) {
            router.push(`/login/verify?email=${encodeURIComponent(email)}`);
        }
    }
    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
            <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Login</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                        <input
                            type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                            required autoComplete="email"
                        />
                    </div>
                    <button
                        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2.5 rounded-lg transition-colors">
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
}