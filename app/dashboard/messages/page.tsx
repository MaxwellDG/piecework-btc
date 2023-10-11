import Message from '../../(components)/messages/message';
import SendMsg from '../../(components)/messages/sendMsg';
import { headers } from 'next/headers';
import company from '../../../db/modeling/company';
import MessagesHandler, { IMessage } from '../../../db/modeling/message';
import { revalidatePath } from 'next/cache';

export default async function Page() {
    const _headers = headers();
    const companyId = _headers.get('jwt-company') as string;

    const messages = await MessagesHandler.getMessages(companyId);

    async function handleSend(formData: FormData): Promise<void> {
        'use server';

        const text = formData.get('input');
        await MessagesHandler.create(true, text as string, companyId);
        revalidatePath('/dashboard/messages');
    }

    return (
        <div className="hero min-h-screen bg-base-200 flex flex-col justify-center">
            <div className="m-auto w-full max-w-3xl">
                <h2 className="text-3xl font-bold mb-2">Messages</h2>
                <div className="custom-border-color flex flex-col bg-white mb-2 p-2 h-96 overflow-y-auto rounded border">
                    {messages?.map((msg: IMessage, i: number) => {
                        return (
                            <Message
                                key={i}
                                message={msg}
                                isFromSelf={msg.isUser}
                                label={
                                    msg.isUser ? 'Company' : 'Piecework-BTC '
                                }
                            />
                        );
                    })}
                </div>
                <SendMsg handleSend={handleSend} />
            </div>
        </div>
    );
}
