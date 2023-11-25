import Message from '../../../../(components)/messages/message';
import SendMsg from '../../../../(components)/messages/sendMsg';
import MessagesHandler from '../../../../../db/models/message';
import { IMessage } from '../../../../../db/models/message/types';
import { revalidatePath } from 'next/cache';
import BackButton from '../../../../(components)/ui/buttons/back';
import { usePathnameServer } from '../../../../(hooks)/useServerHeaders';
import HeroScreenContainer from '../../../../(components)/containers/hero-screen-container';
import dbConnect from '../../../../../db';

export default async function Page() {
    await dbConnect();
    const { id: companyId } = usePathnameServer();

    const messages = await MessagesHandler.getMessages(companyId);

    async function handleSend(formData: FormData): Promise<void> {
        'use server';

        const text = formData.get('input');
        const msg = await MessagesHandler.create(
            false,
            text as string,
            companyId
        );
        revalidatePath(`/admin/dashboard/messages/${companyId}`);
    }

    return (
        <HeroScreenContainer>
            <div className="m-auto w-full max-w-4xl">
                <BackButton route="/admin/dashboard" />
                <h2 className="text-4xl font-bold mb-2">Messages</h2>
                <div className="custom-border-color flex flex-col bg-[rgba(100,100,100,0.1)] mb-2 p-2 h-96 overflow-y-auto rounded border gap-y-2">
                    {messages?.map((msg: IMessage, i: number) => {
                        return (
                            <Message
                                key={i}
                                message={msg}
                                isFromSelf={!msg.isUser}
                                label={msg.isUser ? 'Company' : 'Piecework-BTC'}
                                isLast={i === messages.length - 1}
                            />
                        );
                    })}
                </div>
                <SendMsg handleSend={handleSend} />
            </div>
        </HeroScreenContainer>
    );
}
