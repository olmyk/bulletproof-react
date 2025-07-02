import { IUser } from "./IUser";

export interface IComment {
    id: string;
    createdAt: number;
    body: string;
    discussionId: string;
    author: IUser;
};