import Message from '../../(components)/messages/message';
import SendMsg from '../../(components)/messages/sendMsg';
import MessagesHandler, { IMessage } from '../../../db/modeling/message';
import { revalidatePath } from 'next/cache';

/*
    This component is done with Next.js' currently experimetal feature: Server Actions
    I don't actually like this practice though, since it's so different then the standard node/express format for API usage
    This means it's not reusable between projects. I will try it out only once here.

    I should add that there are apparently some benefits though. One being that the code below only took 1 API call,
    while normally it would take two. There's also Progressive Enhancement, which increases the speed at which a user
    can interact with the form since it no longer requires Javascript
*/

export default async function Page() {
    // const messages = await MessagesHandler.getMessages(1);
    const messages = [
        {
            text: 'test data',
            isUser: true,
            createdAt: new Date(Date.now()),
            isRead: true,
        },
        {
            text: 'test data me',
            isUser: false,
            createdAt: new Date(Date.now()),
            isRead: true,
        },
        {
            text: 'test data 2',
            isUser: true,
            createdAt: new Date(Date.now()),
            isRead: false,
        },
    ];

    async function handleSend(formData: FormData): Promise<void> {
        'use server';

        const text = formData.get('input');
        const message = await MessagesHandler.create(true, text as string);
        console.log('New message? ', message);
        revalidatePath('/dashboard/messages');
    }

    return (
        <div className="hero min-h-screen bg-base-200 flex flex-col justify-center">
            <div className="m-auto w-full max-w-3xl">
                <h2 className="text-xl font-bold mb-2">Messages</h2>
                <div className="custom-border-color flex flex-col bg-white mb-2 p-2 h-96 overflow-y-auto rounded border">
                    {messages?.map((msg: IMessage, i: number) => {
                        return <Message key={i} message={msg} />;
                    })}
                </div>
                <SendMsg handleSend={handleSend} />
            </div>
        </div>
    );
}
