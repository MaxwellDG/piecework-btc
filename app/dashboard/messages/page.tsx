import Message from '../../(components)/messages/message';
import SendMsg from '../../(components)/messages/sendMsg';
import { IMessage } from '../../../db/modeling/message';

async function getData() {
    const res = await fetch('/api/messages', {
        method: 'GET',
    });

    console.log('RESSSS', res);

    if (!res.ok) {
        throw new Error('Failed to fetch data');
    }

    return res.json();
}

export default async function Page() {
    const { messages } = await getData();

    console.log('MEssages? ', messages);

    return (
        <div className="hero min-h-screen w-full bg-base-200">
            <div>
                <h2>Messages</h2>
                <div className="w-1/2 h-1/2 border rounded">
                    {/* <div className="flex">
                        {messages?.map((msg: IMessage, i: number) => {
                            return <Message message={msg} />;
                        })}
                    </div> */}
                </div>
                <SendMsg />
            </div>
        </div>
    );
}
