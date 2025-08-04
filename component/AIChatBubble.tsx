'use client';

import {useState} from 'react';

export default function AIChatBubble({onClose}: { onClose: () => void }) {
    const [input, setInput] = useState('');
    const [messages, setMessages] = useState<string[]>([]);
    const [loading, setLoading] = useState(false);

    const handleSend = async () => {
        const trimmed = input.trim();
        if (!trimmed) return;

        setMessages((prev) => [...prev, `Me: ${trimmed}`]);
        setInput('');
        setLoading(true);

        try {
            const res = await fetch('/api/chat-ai', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({prompt: trimmed}),
            });

            if (!res.ok) throw new Error('Failed to fetch');

            const data = await res.json();
            setMessages((prev) => [...prev, `Boot: ${data.text}`]);
        } catch (error: unknown) {
            if (error instanceof Error) {
                setMessages((prev) => [...prev, error.message]);
            } else {
                setMessages((prev) => [...prev, 'An unknown error occurred.']);
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="absolute bottom-4 right-4 z-[1000] w-[300px] bg-white shadow-lg rounded-lg p-4">
            <div className="flex justify-between items-center mb-2">
                <span className="font-bold">AI Chat</span>
                <button onClick={onClose} className="text-red-500 font-bold">x</button>
            </div>
            <div className="h-[150px] overflow-y-auto text-sm space-y-1 mb-2">
                {messages.map((msg, i) => (
                    <div key={i}>{msg}</div>
                ))}
                {loading && <div><i>Boot: Thinking...</i></div>}
            </div>
            <input
                className="border p-1 rounded w-full mb-1"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            />
            <button
                onClick={handleSend}
                className="bg-blue-500 text-white px-2 py-1 rounded w-full"
                disabled={loading}
            >
                Send
            </button>
        </div>
    );
}