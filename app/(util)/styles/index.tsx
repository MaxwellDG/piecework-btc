import { TASK_STATUS } from '../../../db/models/task/types';

export const getStatusColor = (status: TASK_STATUS) => {
    switch (status) {
        case TASK_STATUS.ASSIGNED:
            return 'text-yellow-500';
        case TASK_STATUS.UNASSIGNED:
            return 'text-yellow-500';
        case TASK_STATUS.ARCHIVED:
            return 'text-gray-500';
        case TASK_STATUS.PENDING_REVIEW:
            return 'text-yellow-500';
        case TASK_STATUS.PENDING_PAYMENT:
            return 'text-btcOrange';
    }
};
