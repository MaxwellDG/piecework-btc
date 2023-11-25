'use client';

import { useCallback, useState } from 'react';
import StandardTab from '../../ui/tabs/standard';
import { ITask } from '../../../../db/models/task/types';
import TaskInformation from '../../taskInformation';
import SendMsg from '../../messages/sendMsg';
import Message from '../../messages/message';
import { IMessage } from '../../../../db/models/message/types';
import TaskImages from '../../taskImages';

type Props = {
    task: ITask;
    projectId: string;
    companyId: string;
    messages: IMessage[];
    imageUrls: string[];
};

type DetailsProps = {
    task: ITask;
    projectId: string;
    imageUrls: string[];
};

type PropsMessages = {
    messages: IMessage[];
    taskId: string;
    projectId: string;
};

function Details({ task, projectId, imageUrls }: DetailsProps) {
    const { _id, name, desc, price } = task;

    return (
        <div className="flex flex-col flex-1">
            <TaskInformation
                taskId={_id.toString()}
                _name={name}
                _desc={desc}
                price={price}
                projectId={projectId}
            />
            <TaskImages
                projectId={projectId}
                imageUrls={imageUrls}
                taskId={_id.toString()}
            />
        </div>
    );
}

// todo open a websocket and get messages from there (instead of passed as props from SSR parent component)
function Messages({ messages, taskId, projectId }: PropsMessages) {
    async function handleSend(formData: FormData): Promise<void> {
        const text = formData.get('input');
        try {
            await fetch('/api/messages', {
                method: 'POST',
                body: JSON.stringify({
                    text,
                    isUser: true,
                    projectId,
                    taskId,
                }),
            });
        } catch (e) {
            // todo error handler
        }
    }

    return (
        <div className="flex flex-col flex-1 justify-between">
            <div className="custom-border-color flex flex-col bg-[rgba(100,100,100,0.1)] mb-2 p-2 rounded border gap-y-2 h-72 overflow-y-auto">
                {(messages ?? [])?.map((msg: IMessage, i: number) => {
                    return (
                        <Message
                            key={i}
                            message={msg}
                            isFromSelf={msg.isUser}
                            label={msg.isUser ? 'Company' : 'Piecework-BTC'}
                            isLast={i === messages.length - 1}
                        />
                    );
                })}
            </div>
            <SendMsg handleSend={handleSend} />
        </div>
    );
}

export default function TaskTabs({
    task,
    projectId,
    messages,
    imageUrls,
}: Props) {
    const [tabIndex, setTabIndex] = useState(0);

    const renderContent = useCallback(() => {
        switch (tabIndex) {
            case 1:
                return (
                    <Messages
                        messages={messages}
                        projectId={projectId}
                        taskId={task._id.toString()}
                    />
                );
            default:
                return (
                    <Details
                        task={task}
                        projectId={projectId}
                        imageUrls={imageUrls}
                    />
                );
        }
    }, [tabIndex]);

    return (
        <div className="flex flex-col">
            <StandardTab
                tabs={[
                    { text: 'Details', onClick: () => setTabIndex(0) },
                    { text: 'Messages', onClick: () => setTabIndex(1) },
                ]}
                currentTabIndex={tabIndex}
            />
            <div className="h-96 overflow-y-auto pr-2">{renderContent()}</div>
        </div>
    );
}
