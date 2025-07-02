import { IUser } from "./IUser";

export interface IDiscussion {
    id: string;
    createdAt: number;
    title: string;
    body: string;
    teamId: string;
    author: IUser;
};