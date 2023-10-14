'use client';

import { HydratedDocument } from 'mongoose';
import { ITask } from '../../../../db/modeling/task';
import React from 'react';
import Task from '../task';
import TaskComponentList from './componentList';

type Props = {
    projectId: string;
};

export default function TasksList({ projectId }: Props) {
    const [tasks, setTasks] = React.useState<ITask[]>([] as ITask[]);
    React.useEffect(() => {
        getTasks();
    }, []);

    async function getTasks() {
        const tasks: { tasks: ITask[] } | null = await fetch(
            `/api/tasks/${projectId}`,
            { next: { tags: ['tasks'] } }
        ).then((res) => res.json());
        setTasks(tasks?.tasks || []);
    }

    return (
        <div className="flex flex-1 flex-col overflow-y-auto">
            <TaskComponentList tasks={tasks} />
        </div>
    );
}

/////////// swr style if I want to use it ///////////

// 'use client';

// import React from 'react';
// import TaskComponentList from './componentList';
// import useSWR from 'swr';
// import Loading from '../../loading';

// type Props = {
//     projectId: string;
// };

// export default function TasksList({ projectId }: Props) {

//     const { data, isLoading, error} = useSWR('/api/tasks/' + projectId, async function(url) {
//         const res = await fetch(url);
//         const data = await res.json();
//         return data?.tasks ?? [];
//     })

//     return (
//         <div className="flex flex-1 flex-col overflow-y-auto">
//             {isLoading ? Loading() : <TaskComponentList tasks={data} />}
//         </div>
//     );
// }
