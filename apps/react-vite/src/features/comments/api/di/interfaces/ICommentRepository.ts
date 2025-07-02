import { IComment } from "@/features/comments/model/IComment";
import { IMeta } from "@/features/comments/model/IMeta";

export default interface ICommentRepository {
    getComments({
        discussionId,
        page,
    }: {
        discussionId: string;
        page?: number;
    }): Promise<{ data: IComment[]; meta: IMeta }>

    createComment({
        data,
    }: {
        data: {
            discussionId: string,
            body: string,
        }
    }): Promise<IComment>

    deleteComment({ commentId }: { commentId: string }): any
}