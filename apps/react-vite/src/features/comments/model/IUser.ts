export interface IUser {
    firstName: string;
    lastName: string;
    email: string;
    role: 'ADMIN' | 'USER';
    teamId: string;
    bio: string;
};