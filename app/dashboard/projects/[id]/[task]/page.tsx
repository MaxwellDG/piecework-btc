import { ITask } from '../../../../../db/modeling/task/types';

type Props = {
    task: ITask;
};

export default function Page({ task }: Props) {
    const { desc, imageUrls }: ITask = task;

    return (
        <div className="flex flex-col">
            <p>{desc}</p>
            <div></div>
        </div>
    );
}
