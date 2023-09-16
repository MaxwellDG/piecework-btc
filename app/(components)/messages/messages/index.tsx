'use client';

import React from 'react';
import { IMessage } from '../../../../db/modeling/message';
import Message from '../message';
import { fetchWrapper } from '../../../api/_helpers/fetch-wrapper';

export default function Messages() {
    const [messages, setMessages] = React.useState([]);

    React.useEffect(() => {
        (async () => {
            const msgs = await fetchWrapper.get(
                `${process.env.BASE_URL}/api/messages`,
                {}
            );
            console.log('we get back msgs? ', msgs);
            setMessages(msgs);
        })();
    }, []);

    return (
        <div className="w-1/2 h-1/2 border rounded">
            <div className="flex">
                {messages?.map((msg: IMessage, i: number) => {
                    return <Message message={msg} />;
                })}
            </div>
        </div>
    );
}
