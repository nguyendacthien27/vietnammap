'use client';

export default function ChatBubble({onClick}: { onClick: () => void }) {
    return (
        <button
            onClick={onClick}
            className="absolute bottom-24 right-4 z-[1000] bg-blue-600 text-white px-4 py-2 rounded-full shadow-lg hover:bg-blue-700">
            AI Chat
        </button>
    );
}