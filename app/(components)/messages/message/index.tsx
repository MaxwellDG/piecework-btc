import { IMessage } from '../../../../db/modeling/message';

type MessageProps = {
    message: IMessage;
    isFromSelf: boolean;
    label: string;
};

export default function Message({ message, isFromSelf, label }: MessageProps) {
    const { text, isRead, createdAt, company }: IMessage = message;

    return (
        <div className={`chat ${isFromSelf ? 'chat-start' : 'chat-end'}`}>
            <div className="chat-header">
                {label}&nbsp;
                <time className="text-xs opacity-50">
                    {createdAt?.toLocaleString()}
                </time>
            </div>
            <div className="chat-bubble">{text}</div>
            <div className="chat-footer opacity-50">
                {isRead ? 'Read' : 'Delivered'}
            </div>
        </div>
    );
}
