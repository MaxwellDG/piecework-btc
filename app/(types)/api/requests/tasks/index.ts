import { TASK_STATUS } from '../../../../../db/modeling/task';

export type UpdateTaskReq = {
    id: string;
    desc?: string;
    status?: TASK_STATUS;
};
