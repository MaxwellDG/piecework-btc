import { TASK_STATUS } from '../../../../../db/modeling/task';

export type UpdateTaskReq = {
    desc?: string;
    name?: string;
    price?: number;
    status?: TASK_STATUS;
};
