'use client';

import React from 'react';

export default function SendMsg() {
    const [input, setInput] = React.useState('');

    async function handleSend() {
        const res = await fetch('/api/messages', {
            method: 'POST',
            body: JSON.stringify({ text: input }),
        });

        if (res.ok) {
            // todo stub
            const data = res.json();
        } else {
            // todo msg did not send toast
        }
    }

    return (
        <div className="w-full flex gap-x-1">
            <input
                type="text"
                placeholder="Message"
                className="input input-bordered flex flex-1"
                value={input}
                onChange={(e) => setInput(e.target.value)}
            />
            <button
                type="button"
                className="btn btn-primary"
                onClick={handleSend}
            >
                Send
            </button>
        </div>
    );
}
