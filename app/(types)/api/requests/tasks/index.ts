import { TASK_STATUS } from '../../../../../db/models/task/types';

export type UpdateTaskReq = {
    desc?: string;
    name?: string;
    price?: number;
    status?: TASK_STATUS;
    imageUrls?: string[];
};
