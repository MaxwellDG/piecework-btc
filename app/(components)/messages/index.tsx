'use client';

import { useState } from 'react';
import Message, { MessageProps } from './message';

export default function MessagingContainer() {
    const [input, setInput] = useState('');
    const [messages, setMessages] = useState<MessageProps[]>([]);

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
        <div>
            <div className="flex items-center">
                {messages.map((msg: MessageProps, i: number) => {
                    return <Message />;
                })}
                <input
                    maxLength={2500}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                />
                <button type="button" onClick={handleSend} className="p-2">
                    Send
                </button>
            </div>
        </div>
    );
}
