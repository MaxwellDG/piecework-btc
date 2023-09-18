import { IMessage } from '../../../../db/modeling/message';

type MessageProps = {
    message: IMessage;
};

export default function Message({ message }: MessageProps) {
    const { isUser, text, isRead, createdAt, company }: IMessage = message;

    return (
            <div className={`chat ${isUser ? 'chat-start' : 'chat-end'}`}>
                <div className="chat-header">
                    {`${isUser ? 'company' : 'Piecework-BTC'} `}
                    <time className="text-xs opacity-50">{createdAt?.toLocaleDateString()}</time>
                </div>
                <div className="chat-bubble">{text}</div>
                <div className="chat-footer opacity-50">{isRead ? 'Read' : 'Delivered'}</div>
            </div>
    );
}
