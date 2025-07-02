import { IUser } from "@/features/users/model/IUser";

export default interface ICommentRepository {
    getUsers(): Promise<{ data: IUser[] }>

    deleteUser({ userId }: { userId: string }): any

    updateProfile({ data }: {
        data: {
            email: string,
            firstName: string,
            lastName: string,
            bio: string,
        }
    }): any
}