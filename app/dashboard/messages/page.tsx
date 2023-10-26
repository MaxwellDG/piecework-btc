import Message from '../../(components)/messages/message';
import SendMsg from '../../(components)/messages/sendMsg';
import { headers } from 'next/headers';
import MessagesHandler, { IMessage } from '../../../db/models/message';
import { revalidatePath } from 'next/cache';
import HeroScreenContainer from '../../(components)/containers/hero-screen-container';
import Question from '../../../public/svgs/question';
import ConfirmModalServer from '../../(components)/modals/confirm/server';
import Link from 'next/link';

type Props = {
    searchParams: Record<string, string> | null | undefined;
};

export default async function Page({ searchParams }: Props) {
    const _headers = headers();
    const companyId = _headers.get('jwt-company') as string;
    const showModal = searchParams?.modal;

    const messages = await MessagesHandler.getMessages(companyId);

    async function handleSend(formData: FormData): Promise<void> {
        'use server';

        const text = formData.get('input');
        await MessagesHandler.create(true, text as string, companyId);
        revalidatePath('/dashboard/messages');
    }

    return (
        <HeroScreenContainer>
            <div className="flex justify-between">
                <h2 className="text-4xl font-bold mb-2">Messages</h2>
                <Link href="/dashboard/messages?modal=true">
                    {Question('grey', 25)}
                </Link>
            </div>
            <div className="custom-border-color flex flex-col bg-white mb-2 p-2 h-96 overflow-y-auto rounded border">
                {messages?.map((msg: IMessage, i: number) => {
                    return (
                        <Message
                            key={i}
                            message={msg}
                            isFromSelf={msg.isUser}
                            label={msg.isUser ? 'Company' : 'Piecework-BTC '}
                        />
                    );
                })}
            </div>
            <SendMsg handleSend={handleSend} />

            {/* Modals */}
            {showModal && (
                <ConfirmModalServer
                    header="Info"
                    content="Communicate directly with the Piecework-BTC team here. Expect a response within 24 hours."
                    path={'/dashboard/messages'}
                />
            )}
        </HeroScreenContainer>
    );
}
