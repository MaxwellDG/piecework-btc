import { IMessage } from '../../../../db/models/message/types';

type MessageProps = {
    message: IMessage;
    isFromSelf: boolean;
    label: string;
    isLast: boolean;
};

export default function Message({
    message,
    isFromSelf,
    label,
    isLast,
}: MessageProps) {
    const { text, isRead, createdAt, company }: IMessage = message;

    return (
        <div className={`chat ${isFromSelf ? 'chat-start' : 'chat-end'}`}>
            <div className="text-lg chat-header">
                {label}&nbsp;
                <time className="text-xs opacity-50">
                    {createdAt?.toLocaleString()}
                </time>
            </div>
            <div className="p-2 rounded-sm bg-gray-200 border w-fit relative">
                <p className="text-black">{text}</p>
                <div
                    className={`absolute -bottom-1.5 ${
                        isFromSelf ? 'left-0.5' : 'right-0.5'
                    }`}
                    style={{
                        borderLeft: '7px solid transparent',
                        borderTop: '7px solid rgb(229 231 235)',
                    }}
                ></div>
            </div>
            {isLast && (
                <div className="text-xs opacity-50 mt-2">
                    {isRead ? 'Read' : 'Delivered'}
                </div>
            )}
        </div>
    );
}
