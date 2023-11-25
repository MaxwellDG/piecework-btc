import { ICompany } from "../company/types";
import { ITask } from "../task/types";

export interface IMessage {
    _id: string;
    isUser: boolean; // is from User or Piecework-BTC
    text: string;
    isRead: boolean;
    company: ICompany;
    task: ITask;
    createdAt?: Date;
}