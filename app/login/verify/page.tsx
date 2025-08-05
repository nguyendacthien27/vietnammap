'use client';
import {useRouter, useSearchParams} from 'next/navigation';
import {Suspense, useEffect} from "react";

function VerifyContent() {
    const searchParams = useSearchParams();
    const email = searchParams.get('email');
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
    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
            <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Verify your email</h2>
                <p>
                    An activation link has been sent to your email address: <strong>{email}</strong>.</p>
                <p>
                    Please check your inbox and click on the link to complete the activation process.
                </p>
                <form action="/login" className="space-y-4">
                    <div>
                        <button
                            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2.5 rounded-lg transition-colors">
                            Back
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default function Verify() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <VerifyContent/>
        </Suspense>
    );
}