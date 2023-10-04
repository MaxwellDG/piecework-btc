import Message from '../../(components)/messages/message';
import SendMsg from '../../(components)/messages/sendMsg';
import MessagesHandler, { IMessage } from '../../../db/modeling/message';
import { revalidatePath } from 'next/cache';

export default async function Page() {
    const messages = await MessagesHandler.getMessages(
        '6515cfa37b8c4ebb9679801d'
    ); // todo get from jwt

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
                <h2 className="text-3xl font-bold mb-2">Messages</h2>
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
