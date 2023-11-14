import { ICompany } from '../company/types';

export enum PendingActionType {
    PAYMENT = 'payment',
}

export interface IPendingAction {
    id: string;
    company: ICompany;
    isFailed: boolean;
    type: PendingActionType;
    targetId: string;
    text: string;
    createdAt: Date;
    updatedAt: Date;
}
