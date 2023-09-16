import { IMessage } from '../../../../db/modeling/message';

type MessageProps = {
    message: IMessage;
};

export default function Message({ message }: MessageProps) {
    const { isUser, text, isRead, createdAt, company }: IMessage = message;

    return (
        <div className="flex flex-col">
            <p className="chat-header">{`${
                isUser ? company?.name : 'Piecework-BTC'
            } ${createdAt}`}</p>
            <p className={`chat-bubble ${isUser ? 'chat-end' : 'chat-start'}`}>
                {text}
            </p>
            <p className="chat-footer">{`${isRead ? 'Read' : 'Delivered'}`}</p>
        </div>
    );
}
