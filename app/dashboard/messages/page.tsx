import Messages from '../../(components)/messages/messages';
import SendMsg from '../../(components)/messages/sendMsg';

export default async function Page() {
    return (
        <div className="hero min-h-screen w-full bg-base-200">
            <div>
                <h2>Messages</h2>
                <Messages />
                <SendMsg />
            </div>
        </div>
    );
}
